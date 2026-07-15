import { z } from "zod";

const REQUIRED_FILE = z
  .any()
  .refine((file) => file !== null && file !== undefined, {
    message: "This document is required",
  });

const REQUIRED_CHECKBOX = z.literal(true, {
  errorMap: () => ({
    message: "This consent is required",
  }),
});

export const step7Schema = z.object({
  // =========================
  // Documents
  // =========================
  panCard: REQUIRED_FILE,

  aadhaarCard: REQUIRED_FILE,

  salarySlip: REQUIRED_FILE,

  bankStatement: REQUIRED_FILE,

  // =========================
  // Signature
  // =========================
  signature: z
    .string()
    .min(1, "Signature is required"),

  // =========================
  // Final Consents
  // =========================
  declarationConsent: REQUIRED_CHECKBOX,

  creditCheckConsent: REQUIRED_CHECKBOX,

  termsConsent: REQUIRED_CHECKBOX,

  communicationConsent: REQUIRED_CHECKBOX,
});