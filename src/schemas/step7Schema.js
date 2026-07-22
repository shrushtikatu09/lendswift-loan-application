import { z } from "zod";

const OPTIONAL_FILE = z.any().optional();

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
  // Mandatory Documents
  panCard: REQUIRED_FILE,

  aadhaarCard: REQUIRED_FILE,

  bankStatement: REQUIRED_FILE,

  // Conditional Documents
  salarySlip: OPTIONAL_FILE,

  itrDocument: OPTIONAL_FILE,

  propertyDocuments: OPTIONAL_FILE,

  businessCertificate: OPTIONAL_FILE,

  gstReturns: OPTIONAL_FILE,

  photograph: OPTIONAL_FILE,

  // Signature
  signature: z.string().min(1, "Signature is required"),

  // Final Consents
  declarationConsent: REQUIRED_CHECKBOX,

  creditCheckConsent: REQUIRED_CHECKBOX,

  termsConsent: REQUIRED_CHECKBOX,

  communicationConsent: REQUIRED_CHECKBOX,
});