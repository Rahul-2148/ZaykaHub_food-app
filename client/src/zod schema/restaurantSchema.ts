import {z} from "zod";

export const restaurantFormSchema = z.object({
    restaurantName: z.string().nonempty({ message: "Restaurant name is required" }),
    city: z.string().nonempty({ message: "City is required" }),
    address: z.string().nonempty({ message: "Address is required" }),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    phone: z.string().optional(),
    openingHours: z.string().nonempty({ message: "Opening hours is required" }),
    closingHours: z.string().nonempty({ message: "Closing hours is required" }),
    country: z.string().nonempty({ message: "Country is required" }),
    deliveryTime: z.union([z.string(), z.number()]).refine((val) => val !== '', { message: "Delivery time is required" }),
    cuisines: z.array(z.string()),
    image: z.instanceof(File).optional().refine((file) => file?.size !== 0, { message: "Image file is required" }),
    // image: z.union([z.instanceof(File), z.string()]).refine((file) => typeof file === 'string' || file.size !== 0, { message: "Image file is required" }),
    lastUpdated: z.date().optional(),
});

export type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>;