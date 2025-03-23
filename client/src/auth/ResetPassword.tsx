import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useUserStore } from "@/Zustand Store/useUserStore";

const ResetPassword = () => {
  const { loading, resetPassword } = useUserStore();
  const { token } = useParams(); // Extract token from URL

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const navigateTo = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // api implementation
    if (!token) {
      console.error("Reset token is missing!");
      return;
    }

    try {
      await resetPassword(token, newPassword);
      navigateTo("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your new password to reset your old one
          </p>
        </div>
        <div className="relative w-full">
          <Input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="pl-10"
            required
          />
          {showPassword ? (
            <FaEye
              className="absolute inset-y-2 right-2 text-gray-500 cursor-pointer h-5 w-5"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute inset-y-2 right-2 text-gray-500 cursor-pointer h-5 w-5"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
          <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        {loading ? (
          <Button disabled className="bg-orange-500 hover:bg-orange-600 text-white">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
          </Button>
        ) : (
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Reset Password
          </Button>
        )}
        <span className="text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
