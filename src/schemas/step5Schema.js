import { z } from "zod";

export const step5Schema = z.object({
  employmentType: z
    .string()
    .min(1, "Please select employment type"),

  companyName: z
    .string()
    .min(2, "Company/Business name is required"),

  monthlyIncome: z
    .number({
      required_error: "Monthly income is required",
      invalid_type_error: "Enter a valid income",
    })
    .min(1000, "Income should be greater than ₹1000"),

  workExperience: z
    .string()
    .min(1, "Please enter work experience"),
});