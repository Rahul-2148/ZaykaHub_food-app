import { Button } from "@/components/ui/button";
import { useUserStore } from "@/Zustand Store/useUserStore";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigateTo = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);

  const { loading, verifyEmail } = useUserStore();

  const submitVerification = useCallback(
    async (verificationCode: string) => {
      if (loading || isAutoSubmitting) return;

      try {
        setIsAutoSubmitting(true);
        await verifyEmail(verificationCode);
        navigateTo("/");
      } catch (error) {
        console.log(error);
      } finally {
        setIsAutoSubmitting(false);
      }
    },
    [isAutoSubmitting, loading, navigateTo, verifyEmail]
  );

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Next input field pe move jab ek character enter kare
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`)?.focus();
      }
    }
  };

  // ** 🛠 Auto Fill OTP when User Pastes **
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pasteData)) {
      setOtp(pasteData.split("")); // Set all OTP fields
      document.getElementById(`otp-input-5`)?.focus(); // Last field pe focus
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // verify-email api implementation starts here
    const verificationCode = otp.join("");
    await submitVerification(verificationCode);
  };

  useEffect(() => {
    const verificationCode = otp.join("");
    if (/^\d{6}$/.test(verificationCode)) {
      submitVerification(verificationCode);
    }
  }, [otp, submitVerification]);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-300">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Verify your email</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter the 6-digit code sent to your email address
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            {otp.map((letter: string, index) => (
              <input
                type="text"
                key={index}
                id={`otp-input-${index}`}
                value={letter}
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={(e) => handleChange(index, e.target.value)}
                onPaste={handlePaste} // ✅ Auto-fill paste event
                onKeyUp={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (e.key === "Backspace" && !target.value && target.previousElementSibling) {
                    (target.previousElementSibling as HTMLInputElement).focus();
                  }
                }}
                maxLength={1}
                className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          {loading ? (
            <Button disabled className="bg-indigo-600 hover:bg-indigo-700 mt-6 w-full">
              <Loader2 className="text-white mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button className="bg-indigo-600 hover:bg-indigo-700 mt-6 w-full">Verify Email</Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
