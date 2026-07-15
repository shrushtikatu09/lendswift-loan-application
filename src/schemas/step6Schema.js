import { z } from "zod";

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;

export const step6Schema = z.object({
  coApplicantName: z
    .string()
    .min(3, "Co-Applicant Name is required"),

  relationship: z
    .string()
    .min(1, "Relationship is required"),

  coApplicantPAN: z
    .string()
    .regex(PAN_REGEX, "Enter a valid PAN Number"),

  coApplicantMobile: z
    .string()
    .regex(MOBILE_REGEX, "Enter a valid Mobile Number"),

  coApplicantIncome: z
    .coerce
    .number()
    .min(15000, "Monthly Income must be at least ₹15,000"),

  coApplicantConsent: z.literal(true, {
    errorMap: () => ({
      message: "Please accept the consent",
    }),
  }),
});