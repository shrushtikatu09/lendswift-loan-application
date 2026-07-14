import { z } from "zod";

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;

export const step6Schema = z
  .object({
    hasCoApplicant: z
      .string()
      .min(1, "Please select an option"),

    coApplicantName: z.string().optional(),

    relationship: z.string().optional(),

    coApplicantPAN: z.string().optional(),

    coApplicantMobile: z.string().optional(),

    coApplicantIncome: z.coerce.number().optional(),

    coApplicantConsent: z.boolean().optional(),
  })

  .superRefine((data, ctx) => {
    if (data.hasCoApplicant !== "yes") {
      return;
    }

    if (!data.coApplicantName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coApplicantName"],
        message: "Co-Applicant Name is required",
      });
    }

    if (!data.relationship?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["relationship"],
        message: "Relationship is required",
      });
    }

    if (!data.coApplicantPAN?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coApplicantPAN"],
        message: "PAN Number is required",
      });
    } else if (!PAN_REGEX.test(data.coApplicantPAN)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coApplicantPAN"],
        message: "Enter a valid PAN Number",
      });
    }

    if (!data.coApplicantMobile) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coApplicantMobile"],
        message: "Mobile Number is required",
      });
    } else if (!MOBILE_REGEX.test(data.coApplicantMobile)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coApplicantMobile"],
        message: "Enter a valid 10-digit Mobile Number",
      });
    }

    if (
      data.coApplicantIncome === undefined ||
      data.coApplicantIncome === null ||
      Number.isNaN(data.coApplicantIncome)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coApplicantIncome"],
        message: "Monthly Income is required",
      });
    } else if (data.coApplicantIncome < 15000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coApplicantIncome"],
        message: "Monthly Income must be at least ₹15,000",
      });
    }

    if (!data.coApplicantConsent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coApplicantConsent"],
        message: "Please accept the consent",
      });
    }
  });