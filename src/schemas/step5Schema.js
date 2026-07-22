import { z } from "zod";

const GST_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

const optionalNumber = z.preprocess(
  (value) => {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      Number.isNaN(value)
    ) {
      return undefined;
    }

    return Number(value);
  },
  z.number().optional()
);

export const step5Schema = z
  .object({
    employmentType: z
      .string()
      .min(1, "Please select employment type"),

    // =========================
    // Salaried
    // =========================

    companyName: z.string().optional(),

    designation: z.string().optional(),

    monthlyIncome: optionalNumber,

    workExperience: optionalNumber,

    // =========================
    // Self Employed / Business
    // =========================

    businessName: z.string().optional(),

    businessType: z.string().optional(),

    annualTurnover: optionalNumber,

    yearsInBusiness: optionalNumber,

    selfMonthlyIncome: optionalNumber,

    officeAddress: z.string().optional(),

    // =========================
    // Business
    // =========================

    gstNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // ====================================
    // Salaried Employee
    // ====================================

    if (data.employmentType === "salaried") {
      if (!data.companyName?.trim()) {
        ctx.addIssue({
          path: ["companyName"],
          code: z.ZodIssueCode.custom,
          message: "Company Name is required",
        });
      } else if (data.companyName.trim().length < 3) {
        ctx.addIssue({
          path: ["companyName"],
          code: z.ZodIssueCode.custom,
          message:
            "Company Name must contain at least 3 characters",
        });
      }

      if (!data.designation?.trim()) {
        ctx.addIssue({
          path: ["designation"],
          code: z.ZodIssueCode.custom,
          message: "Designation is required",
        });
      } else if (data.designation.trim().length < 2) {
        ctx.addIssue({
          path: ["designation"],
          code: z.ZodIssueCode.custom,
          message:
            "Designation must contain at least 2 characters",
        });
      }

      if (data.monthlyIncome === undefined) {
        ctx.addIssue({
          path: ["monthlyIncome"],
          code: z.ZodIssueCode.custom,
          message: "Monthly Salary is required",
        });
      } else if (data.monthlyIncome < 15000) {
        ctx.addIssue({
          path: ["monthlyIncome"],
          code: z.ZodIssueCode.custom,
          message:
            "Monthly Salary should be at least ₹15,000",
        });
      }

      if (data.workExperience === undefined) {
        ctx.addIssue({
          path: ["workExperience"],
          code: z.ZodIssueCode.custom,
          message: "Work Experience is required",
        });
      } else if (data.workExperience < 0) {
        ctx.addIssue({
          path: ["workExperience"],
          code: z.ZodIssueCode.custom,
          message:
            "Work Experience cannot be negative",
        });
      } else if (data.workExperience > 50) {
        ctx.addIssue({
          path: ["workExperience"],
          code: z.ZodIssueCode.custom,
          message:
            "Please enter a valid Work Experience",
        });
      }
    }

    // ====================================
    // Self Employed
    // ====================================

    if (data.employmentType === "self-employed") {
      if (!data.businessName?.trim()) {
        ctx.addIssue({
          path: ["businessName"],
          code: z.ZodIssueCode.custom,
          message: "Business Name is required",
        });
      } else if (data.businessName.trim().length < 3) {
        ctx.addIssue({
          path: ["businessName"],
          code: z.ZodIssueCode.custom,
          message:
            "Business Name must contain at least 3 characters",
        });
      }

      if (!data.businessType?.trim()) {
        ctx.addIssue({
          path: ["businessType"],
          code: z.ZodIssueCode.custom,
          message: "Business Type is required",
        });
      }
            if (data.annualTurnover === undefined) {
        ctx.addIssue({
          path: ["annualTurnover"],
          code: z.ZodIssueCode.custom,
          message: "Annual Turnover is required",
        });
      } else if (data.annualTurnover < 300000) {
        ctx.addIssue({
          path: ["annualTurnover"],
          code: z.ZodIssueCode.custom,
          message:
            "Annual Turnover should be at least ₹3,00,000",
        });
      }

      if (data.selfMonthlyIncome === undefined) {
        ctx.addIssue({
          path: ["selfMonthlyIncome"],
          code: z.ZodIssueCode.custom,
          message: "Monthly Income is required",
        });
      } else if (data.selfMonthlyIncome < 15000) {
        ctx.addIssue({
          path: ["selfMonthlyIncome"],
          code: z.ZodIssueCode.custom,
          message:
            "Monthly Income should be at least ₹15,000",
        });
      }

      if (data.yearsInBusiness === undefined) {
        ctx.addIssue({
          path: ["yearsInBusiness"],
          code: z.ZodIssueCode.custom,
          message: "Years in Business is required",
        });
      } else if (data.yearsInBusiness < 2) {
        ctx.addIssue({
          path: ["yearsInBusiness"],
          code: z.ZodIssueCode.custom,
          message:
            "Minimum 2 years of business experience required",
        });
      } else if (data.yearsInBusiness > 50) {
        ctx.addIssue({
          path: ["yearsInBusiness"],
          code: z.ZodIssueCode.custom,
          message:
            "Please enter a valid number of years",
        });
      }

      if (!data.officeAddress?.trim()) {
        ctx.addIssue({
          path: ["officeAddress"],
          code: z.ZodIssueCode.custom,
          message: "Office Address is required",
        });
      } else if (data.officeAddress.trim().length < 10) {
        ctx.addIssue({
          path: ["officeAddress"],
          code: z.ZodIssueCode.custom,
          message:
            "Office Address should contain at least 10 characters",
        });
      }
    }

    // ====================================
    // Business Owner
    // ====================================

    if (data.employmentType === "business") {
      if (!data.businessName?.trim()) {
        ctx.addIssue({
          path: ["businessName"],
          code: z.ZodIssueCode.custom,
          message: "Business Name is required",
        });
      } else if (data.businessName.trim().length < 3) {
        ctx.addIssue({
          path: ["businessName"],
          code: z.ZodIssueCode.custom,
          message:
            "Business Name must contain at least 3 characters",
        });
      }

      if (!data.businessType?.trim()) {
        ctx.addIssue({
          path: ["businessType"],
          code: z.ZodIssueCode.custom,
          message: "Business Type is required",
        });
      }

      if (data.annualTurnover === undefined) {
        ctx.addIssue({
          path: ["annualTurnover"],
          code: z.ZodIssueCode.custom,
          message: "Annual Turnover is required",
        });
      } else if (data.annualTurnover < 300000) {
        ctx.addIssue({
          path: ["annualTurnover"],
          code: z.ZodIssueCode.custom,
          message:
            "Annual Turnover should be at least ₹3,00,000",
        });
      }

      if (data.yearsInBusiness === undefined) {
        ctx.addIssue({
          path: ["yearsInBusiness"],
          code: z.ZodIssueCode.custom,
          message: "Years in Business is required",
        });
      } else if (data.yearsInBusiness < 2) {
        ctx.addIssue({
          path: ["yearsInBusiness"],
          code: z.ZodIssueCode.custom,
          message:
            "Minimum 2 years of business experience required",
        });
      } else if (data.yearsInBusiness > 50) {
        ctx.addIssue({
          path: ["yearsInBusiness"],
          code: z.ZodIssueCode.custom,
          message:
            "Please enter a valid number of years",
        });
      }

      if (!data.officeAddress?.trim()) {
        ctx.addIssue({
          path: ["officeAddress"],
          code: z.ZodIssueCode.custom,
          message: "Office Address is required",
        });
      } else if (data.officeAddress.trim().length < 10) {
        ctx.addIssue({
          path: ["officeAddress"],
          code: z.ZodIssueCode.custom,
          message:
            "Office Address should contain at least 10 characters",
        });
      }

      if (!data.gstNumber?.trim()) {
        ctx.addIssue({
          path: ["gstNumber"],
          code: z.ZodIssueCode.custom,
          message: "GST Number is required",
        });
      } else if (
        !GST_REGEX.test(
          data.gstNumber.trim().toUpperCase()
        )
      ) {
        ctx.addIssue({
          path: ["gstNumber"],
          code: z.ZodIssueCode.custom,
          message: "Enter a valid GST Number",
        });
      }
    }
  });