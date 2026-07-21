import { z } from "zod";

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;

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

export const step6Schema = z
  .object({
    coApplicantName: z
      .string()
      .trim()
      .min(3, "Co-Applicant Name is required"),

    relationship: z
      .string()
      .trim()
      .min(1, "Relationship is required"),

    coApplicantPAN: z
      .string()
      .trim()
      .toUpperCase()
      .regex(PAN_REGEX, "Enter a valid PAN Number"),

    coApplicantPanVerified: z.boolean(),

    coApplicantMobile: z
      .string()
      .trim()
      .regex(MOBILE_REGEX, "Enter a valid Mobile Number"),

    coApplicantIncome: optionalNumber,

    coApplicantConsent: z.literal(true, {
      errorMap: () => ({
        message: "Please accept the consent",
      }),
    }),

    // ✅ Signature file
    coApplicantSignature: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    // Income validation
    if (
      data.coApplicantIncome === undefined ||
      data.coApplicantIncome < 15000
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coApplicantIncome"],
        message: "Monthly Income must be at least ₹15,000",
      });
    }

    // PAN verification validation
    if (!data.coApplicantPanVerified) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coApplicantPanVerified"],
        message: "Please verify Co-Applicant PAN",
      });
    }

    // Signature validation
    if (!data.coApplicantSignature) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coApplicantSignature"],
        message: "Co-Applicant Signature is required",
      });
    }
  });