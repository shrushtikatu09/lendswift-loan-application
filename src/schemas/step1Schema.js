import { z } from "zod";

export const step1Schema = z.object({
  loanType: z.string({
  required_error: "Please select a loan type",
}),
  loanAmount: z
    .number({ message: "Loan amount is required" })
    .min(50000, "Minimum loan amount is ₹50,000"),
});