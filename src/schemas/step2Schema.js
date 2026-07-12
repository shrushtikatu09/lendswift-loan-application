import { z } from "zod";

export const step2Schema = z.object({
  fullName: z
    .string()
    .min(3, "Full Name must be at least 3 characters")
    .max(50, "Full Name cannot exceed 50 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

  dateOfBirth: z
    .string()
    .min(1, "Date of Birth is required"),

  gender: z
    .string()
    .min(1, "Please select your gender"),

  maritalStatus: z
    .string()
    .min(1, "Please select your marital status"),
});