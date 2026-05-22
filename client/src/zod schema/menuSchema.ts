import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  // price: z.number().min(0, { message: "Price can not be negative" }),
  price: z
    .number()
    .int("Price must be an integer")
    .min(0, { message: "Price can not be negative" })
    .superRefine((value, context) => {
      if (value === null || value === undefined) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Price is required",
        });
      }
    }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image file is required" }),
});
export type MenuFormSchema = z.infer<typeof menuSchema>;
