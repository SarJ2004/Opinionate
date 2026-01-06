import { z } from "zod";
export const forgetPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email must be a correct email" }),
});

export const resetPasswordSchema = z.object({
  email: z
    .string({ message: "Emali is required" })
    .email({ message: "Email must be a correct mail" }),
  password: z.string({ message: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirm_password: z.string({ message: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters long",
  }),
});
