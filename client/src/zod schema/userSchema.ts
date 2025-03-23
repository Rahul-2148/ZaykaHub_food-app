import {z} from 'zod';

export const userSignupSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  email: z.string().email({message:"Invalid email address"}).nonempty({message:"Email is required"}),
  // password: z.string().min(6, "Password must be at least 6 characters"),

  password: z.string().min(8, "Password must be at least 8 characters long")
  .max(32, "Password must not exceed 32 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),

  //contact: z.string().min(10, "Contact number must be 10 digits"),
  // contact: z.string().regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
  contact: z.string()
  .transform((val) => val.replace(/^0+/, "")) // Remove leading zeros
  .refine((val) => /^\d{10}$/.test(val), {
    message: "Contact number must be exactly 10 digits",
  }),

  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to terms",
  }),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
  email: z.string().email({message:"Invalid email address"}).nonempty({message:"Email is required"}),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;