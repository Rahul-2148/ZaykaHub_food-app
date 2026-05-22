import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/Zustand Store/useUserStore";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const { loading, forgotPassword } = useUserStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="auth-page app-shell">
      <form onSubmit={handleSubmit} className="auth-card flex flex-col gap-5">
        <div className="text-center">
          <h1 className="auth-title mb-2">Forgot Password</h1>
          <p className="auth-help">Enter your email address to reset your password</p>
        </div>
        <div className="relative w-full">
            <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="pl-10"
            />
            <Mail className="absolute inset-y-2 left-2 auth-icon"/>
        </div>
        {
            loading ? (
              <Button disabled className="px-4 py-2 rounded-md" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait...</Button>
            ) : (
              <Button className="px-4 py-2 rounded-md" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>Send Reset Link</Button>
            )
        }
        <span className="text-center">
                <span className="auth-muted">Back to </span>
                <Link to="/login" className="auth-link">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;