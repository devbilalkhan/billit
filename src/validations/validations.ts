import { z } from "zod";

export const UserSchema = z.object({
  id: z.string()
    .min(1, { message: "ID cannot be empty" })
    .max(255, { message: "ID cannot exceed 255 characters" }),
  name: z.string()
    .max(255, { message: "Name cannot exceed 255 characters" })
    .optional(),
  email: z.string()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email cannot exceed 255 characters" }),
  stripCustomerId: z.string()
    .max(255, { message: "Stripe Customer ID cannot exceed 255 characters" })
    .optional(),
  colorScheme: z.string()
    .default("theme-green")
   
});

export type TUser = z.infer<typeof UserSchema>
