import { z } from "zod";

export const step6Schema = z.object({
  hasCoApplicant: z
    .string()
    .min(1, "Please select an option"),

  coApplicantName: z.string().optional(),

  relationship: z.string().optional(),

  coApplicantMobile: z.string().optional(),

  coApplicantIncome: z.number().optional(),
});