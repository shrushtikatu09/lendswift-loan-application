import { z } from "zod";

export const step3Schema = z.object({
  panNumber: z
    .string()
    .min(1, "PAN Number is required")
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]$/,
      "PAN must be in AAAAA9999A format."
    ),

  aadhaarNumber: z
    .string()
    .min(1, "Aadhaar Number is required")
    .regex(
      /^\d{12}$/,
      "Aadhaar must contain exactly 12 digits."
    ),

  consent: z.literal(true, {
    errorMap: () => ({
      message: "You must provide consent to continue.",
    }),
  }),

  // Verification Status
  panVerified: z.literal(true, {
    errorMap: () => ({
      message: "Please verify your PAN before continuing.",
    }),
  }),

  aadhaarVerified: z.literal(true, {
    errorMap: () => ({
      message: "Please verify your Aadhaar before continuing.",
    }),
  }),
});