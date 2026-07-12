import { z } from "zod";

export const step1Schema = z.object({
  loanType: z
    .string({
      required_error: "Please select a loan type",
    })
    .min(1, "Please select a loan type"),

  loanAmount: z
    .number({
      required_error: "Loan amount is required",
      invalid_type_error: "Please enter a valid loan amount",
    })
    .min(50000, "Minimum loan amount is ₹50,000"),

  loanTenure: z
    .string({
      required_error: "Please select loan tenure",
    })
    .min(1, "Please select loan tenure"),

  loanPurpose: z
    .string({
      required_error: "Please select loan purpose",
    })
    .min(1, "Please select loan purpose"),

  referralCode: z
    .string()
    .max(10, "Referral code cannot exceed 10 characters")
    .regex(
      /^[A-Za-z0-9]*$/,
      "Referral code can contain only letters and numbers"
    )
    .optional()
    .or(z.literal("")),
});