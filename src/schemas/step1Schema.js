import { z } from "zod";

const LOAN_LIMITS = {
  personal: {
    minAmount: 50000,
    maxAmount: 1000000,
    tenures: [12, 24, 36, 48, 60],
  },
  home: {
    minAmount: 50000,
    maxAmount: 10000000, // 1 Crore
    tenures: [60, 120, 180, 240, 300, 360],
  },
  business: {
    minAmount: 50000,
    maxAmount: 5000000, // 50 Lakh
    tenures: [12, 24, 36, 48, 60, 72, 84, 96, 108, 120],
  },
};

export const step1Schema = z
  .object({
    loanType: z
      .string({
        required_error: "Please select a loan type",
      })
      .min(1, "Please select a loan type"),

    loanAmount: z.number({
      required_error: "Loan amount is required",
      invalid_type_error: "Please enter a valid loan amount",
    }),

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
      .regex(
        /^[A-Za-z0-9]*$/,
        "Referral code can contain only letters and numbers"
      )
      .refine(
        (value) => value === "" || (value.length >= 6 && value.length <= 10),
        {
          message:
            "Referral code must be between 6 and 10 characters",
        }
      )
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const rules = LOAN_LIMITS[data.loanType];

    if (!rules) return;

    if (data.loanAmount < rules.minAmount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["loanAmount"],
        message: `Minimum loan amount is ₹${rules.minAmount.toLocaleString(
          "en-IN"
        )}`,
      });
    }

    if (data.loanAmount > rules.maxAmount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["loanAmount"],
        message: `Maximum loan amount is ₹${rules.maxAmount.toLocaleString(
          "en-IN"
        )}`,
      });
    }

    const tenure = Number(data.loanTenure);

    if (!rules.tenures.includes(tenure)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["loanTenure"],
        message: "Selected tenure is not allowed for this loan type",
      });
    }
  });