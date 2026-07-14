import { z } from "zod";

export const step5Schema = z
  .object({
    employmentType: z
      .string()
      .min(1, "Please select employment type"),

    companyName: z.string().optional(),
    designation: z.string().optional(),
    monthlyIncome: z.coerce.number().optional(),
    workExperience: z.coerce.number().optional(),

    businessName: z.string().optional(),
    businessType: z.string().optional(),
    annualTurnover: z.coerce.number().optional(),
    yearsInBusiness: z.coerce.number().optional(),
    selfMonthlyIncome: z.coerce.number().optional(),
    officeAddress: z.string().optional(),

    gstNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {

    if (data.employmentType === "salaried") {

      if (!data.companyName?.trim()) {
        ctx.addIssue({
          path: ["companyName"],
          message: "Company name is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.designation?.trim()) {
        ctx.addIssue({
          path: ["designation"],
          message: "Designation is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.monthlyIncome || data.monthlyIncome < 15000) {
        ctx.addIssue({
          path: ["monthlyIncome"],
          message: "Minimum salary should be ₹15,000",
          code: z.ZodIssueCode.custom,
        });
      }

      if (
        data.workExperience === undefined ||
        data.workExperience === null ||
        Number.isNaN(data.workExperience)
      ) {
        ctx.addIssue({
          path: ["workExperience"],
          message: "Work experience is required",
          code: z.ZodIssueCode.custom,
        });
      }

    }


    if (
      data.employmentType === "self-employed" ||
      data.employmentType === "business"
    ) {

      if (!data.businessName?.trim()) {
        ctx.addIssue({
          path: ["businessName"],
          message: "Business name is required",
          code: z.ZodIssueCode.custom,
        });
      }


      if (!data.businessType?.trim()) {
        ctx.addIssue({
          path: ["businessType"],
          message: "Business type is required",
          code: z.ZodIssueCode.custom,
        });
      }


      if (!data.annualTurnover || data.annualTurnover < 300000) {
        ctx.addIssue({
          path: ["annualTurnover"],
          message: "Minimum turnover should be ₹3,00,000",
          code: z.ZodIssueCode.custom,
        });
      }


      if (!data.yearsInBusiness || data.yearsInBusiness < 2) {
        ctx.addIssue({
          path: ["yearsInBusiness"],
          message: "Minimum 2 years required",
          code: z.ZodIssueCode.custom,
        });
      }


      if (!data.officeAddress?.trim()) {
        ctx.addIssue({
          path: ["officeAddress"],
          message: "Office address is required",
          code: z.ZodIssueCode.custom,
        });
      }

    }


    if (data.employmentType === "business") {

      if (!data.gstNumber?.trim()) {
        ctx.addIssue({
          path: ["gstNumber"],
          message: "GST Number is required",
          code: z.ZodIssueCode.custom,
        });
      }

    }

  });