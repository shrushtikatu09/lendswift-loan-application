import { z } from "zod";

export const step4Schema = z.object({
  addressLine1: z
    .string()
    .min(5, "Address Line 1 must be at least 5 characters"),

  addressLine2: z.string().optional(),

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(2, "State is required"),

  pinCode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN Code"),

  addressType: z
    .string()
    .min(1, "Please select address type"),
});