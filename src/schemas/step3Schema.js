import { z } from "zod";

export const step3Schema = z.object({
  panNumber: z
    .string()
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]$/,
      "Enter a valid PAN number"
    ),

  aadhaarNumber: z
    .string()
    .regex(
      /^\d{12}$/,
      "Aadhaar must contain exactly 12 digits"
    ),

  consent: z.literal(true, {
    errorMap: () => ({
      message: "You must provide consent to continue",
    }),
  }),
});