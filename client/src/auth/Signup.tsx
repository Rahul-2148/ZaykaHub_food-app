import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LockKeyhole, Mail, Phone, User } from "lucide-react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { SignupInputState, userSignupSchema } from "@/zod schema/userSchema";
import { useUserStore } from "@/Zustand Store/useUserStore";

// typescript me type define krne ka 2 tarika hota h pehla interface and dusra type __ = { type}

const Signup = () => {
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Partial<SignupInputState>>({});

  const { signup, loading } = useUserStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Checkbox handling
    const newValue = type === "checkbox" ? checked : value;

    setInput({ ...input, [name]: newValue });

    // Validate the field on change
    const result = userSignupSchema.safeParse({ ...input, [name]: newValue });

    if (result.success) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: (
          result.error.formErrors.fieldErrors as Record<string, string[]>
        )[name]?.[0],
      }));
    }
  };

  const signupSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form before submitting
    const result = userSignupSchema.safeParse(input);

    if (!result.success) {
      setErrors(
        result.error.formErrors.fieldErrors as Record<string, string[]>
      );
      return;
    }

    // signup api implementation start here
    await signup(input);
    navigateTo("/verify-email");
    // console.log(input);
  };

  return (
    <div className="flex items-center justify-center min-h-screen rounded-2xl shadow-2xl">
      <form
        onSubmit={signupSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
      >
        <div className="space-y-4 mb-6">
          <h1 className="font-bold text-2xl">
            Zayka<span className="text-orange-600">Hub</span>
          </h1>
        </div>
        <Label>Name</Label>
        <div className="relative space-y-4">
          <Input
            type="text"
            placeholder="Enter your Full Name..."
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
            // required
          />
          <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          {errors.fullname && (
            <span className="text-red-500 text-xs">{errors.fullname}</span>
          )}
        </div>
        <Label>Email</Label>
        <div className="relative space-y-4">
          <Input
            type="email"
            placeholder="Enter your email..."
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
            // required
          />
          <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
        </div>
        <Label>Password</Label>
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
              className="absolute inset-y-2 right-2 text-gray-500 dark:text-gray-400 cursor-pointer h-5 w-5"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute inset-y-2 right-2 text-gray-500 dark:text-gray-400 cursor-pointer h-5 w-5"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
          <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password}</span>
          )}
        </div>
        <Label>Contact Number</Label>
        <div className="relative space-y-4">
          <Input
            placeholder="Enter your contact number..."
            name="contact"
            value={input.contact}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
          <Phone className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          {errors.contact && (
            <span className="text-red-500 text-xs">{errors.contact}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            className="dark:border-gray-600"
            checked={input.agreeToTerms}
            onCheckedChange={(checked) =>
              changeEventHandler({
                target: {
                  name: "agreeToTerms",
                  type: "checkbox",
                  checked,
                } as any,
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />

          <div>
            agree to{" "}
            <Link to="/terms" className="text-blue-500 hover:text-blue-800">
              terms and conditions
            </Link>
          </div>
          {errors.agreeToTerms && (
            <span className="text-red-500 text-xs">{errors.agreeToTerms}</span>
          )}
        </div>
        <div className="mt-4">
          {loading ? (
            <Button disabled className="w-full bg-[#D19254] hover:bg-[#d18c47]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#D19254] hover:bg-[#d18c47]"
            >
              Signup
            </Button>
          )}
        </div>
        <Separator className="mt-4" />
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-800">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
