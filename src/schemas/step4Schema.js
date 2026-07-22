import { z } from "zod";

export const step4Schema = z
  .object({
    // =========================
    // Current Address
    // =========================

    addressLine1: z
      .string()
      .min(5, "Address Line 1 must be at least 5 characters"),

    addressLine2: z.string().optional(),

    city: z
      .string()
      .min(2, "City is required"),

    state: z
      .string()
      .min(2, "State is required"),

    pinCode: z
      .string()
      .regex(
        /^[1-9][0-9]{5}$/,
        "Enter a valid 6-digit PIN Code"
      ),

    addressType: z
      .string()
      .min(1, "Please select address type"),

    // =========================
    // Permanent Address
    // =========================

    sameAsCurrentAddress: z.boolean(),

    permanentAddressLine1: z.string().optional(),

    permanentAddressLine2: z.string().optional(),

    permanentCity: z.string().optional(),

    permanentState: z.string().optional(),

    permanentPinCode: z.string().optional(),
  })

  .superRefine((data, ctx) => {
    if (data.sameAsCurrentAddress) {
      return;
    }

    if (
      !data.permanentAddressLine1 ||
      data.permanentAddressLine1.length < 5
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["permanentAddressLine1"],
        message:
          "Permanent Address Line 1 is required",
      });
    }

    if (!data.permanentCity) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["permanentCity"],
        message: "Permanent City is required",
      });
    }

    if (!data.permanentState) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["permanentState"],
        message: "Permanent State is required",
      });
    }

    if (
      !data.permanentPinCode ||
      !/^[1-9][0-9]{5}$/.test(
        data.permanentPinCode
      )
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["permanentPinCode"],
        message:
          "Enter a valid Permanent PIN Code",
      });
    }
  });