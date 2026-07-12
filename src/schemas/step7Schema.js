import { z } from "zod";

export const step7Schema = z.object({
  panCard: z.any().optional(),

  aadhaarCard: z.any().optional(),

  salarySlip: z.any().optional(),

  bankStatement: z.any().optional(),
});