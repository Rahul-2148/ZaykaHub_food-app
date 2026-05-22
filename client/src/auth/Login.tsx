import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { LoginInputState, userLoginSchema } from "@/zod schema/userSchema";
import { useUserStore } from "@/Zustand Store/useUserStore";
import { useRestaurantStore } from "@/Zustand Store/useRestaurantStore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [errors, setErrors] = useState<Partial<LoginInputState>>({});

  const { login, loading, user } = useUserStore();

  const { getRestaurant, resetRestaurantState } = useRestaurantStore();

  const navigateTo = useNavigate();

  useEffect(() => {
    if (user) {
      resetRestaurantState();
      getRestaurant(); 
    }
  }, [user]);

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });

    // ✅ Real-time validation
    const result = userLoginSchema.safeParse({ ...input, [name]: value });

    if (result.success) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } else {
      // ✅ Type assertion (`as Record<string, string[]>`) se TypeScript error fix
      setErrors((prev) => ({
        ...prev,
        [name]: (
          result.error.formErrors.fieldErrors as Record<string, string[]>
        )[name]?.[0],
      }));
    }
  };

  const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, rememberMe: e.target.checked });
  };

  const loginSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form validation check start
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }

    // login api implementation start here
    try {
      await login(input);
      navigateTo("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-page app-shell">
      <form
        onSubmit={loginSubmitHandler}
        className="auth-card flex flex-col gap-4"
      >
        <div className="space-y-4 mb-6">
          <h1 className="auth-title">
            Zayka<span className="auth-accent">Hub</span>
          </h1>
        </div>
        <Label className="auth-label">Email</Label>
        <div className="relative space-y-4">
          <Input
            type="email"
            placeholder="Enter your email..."
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
          <Mail className="absolute inset-y-2 left-2 auth-icon" />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
        </div>
        <Label className="auth-label">Password</Label>
        <div className="relative space-y-4">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password..."
            value={input.password}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
          {showPassword ? (
            <FaEye
              className="absolute inset-y-2 right-2 cursor-pointer h-5 w-5 text-gray-500 dark:text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute inset-y-2 right-2 cursor-pointer h-5 w-5 text-gray-500 dark:text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
          <LockKeyhole className="absolute inset-y-2 left-2 auth-icon" />
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={input.rememberMe}
              onChange={checkboxChangeHandler}
              className="border-border"
            />
            <div className="auth-muted">Remember me</div>
            {errors.rememberMe && (
              <span className="text-red-500 text-xs">{errors.rememberMe}</span>
            )}
          </div>
          <Link
            to="/forgot-password"
            className="auth-link hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4">
          {loading ? (
            <Button disabled className="w-full px-4 py-3 rounded-md" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full px-4 py-3 rounded-md"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
            >
              Login
            </Button>
          )}
        </div>
        <Separator className="mt-4" />
        <p className="mt-2 auth-muted">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
