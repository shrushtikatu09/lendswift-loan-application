import { z } from "zod";

const REQUIRED_FILE = z
  .any()
  .refine((file) => file !== null && file !== undefined, {
    message: "This document is required",
  });

export const step7Schema = z.object({
  panCard: REQUIRED_FILE,

  aadhaarCard: REQUIRED_FILE,

  salarySlip: REQUIRED_FILE,

  bankStatement: REQUIRED_FILE,
});