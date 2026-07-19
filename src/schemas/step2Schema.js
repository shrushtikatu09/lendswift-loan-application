import { z } from "zod";

const nameRegex = /^[A-Za-z.\s]+$/;

export const step2Schema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full Name must be at least 2 characters")
      .max(100, "Full Name cannot exceed 100 characters")
      .regex(
        nameRegex,
        "Only letters, spaces and periods are allowed"
      ),

    fatherName: z
      .string()
      .min(2, "Father's Name must be at least 2 characters")
      .max(100, "Father's Name cannot exceed 100 characters")
      .regex(
        nameRegex,
        "Only letters, spaces and periods are allowed"
      ),

    motherName: z
      .string()
      .min(2, "Mother's Name must be at least 2 characters")
      .max(100, "Mother's Name cannot exceed 100 characters")
      .regex(
        nameRegex,
        "Only letters, spaces and periods are allowed"
      ),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    mobile: z
      .string()
      .min(1, "Mobile Number is required")
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

    alternateMobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
      .optional()
      .or(z.literal("")),

    dateOfBirth: z
      .string()
      .min(1, "Date of Birth is required"),

    gender: z
      .string()
      .min(1, "Please select your gender"),

    maritalStatus: z
      .string()
      .min(1, "Please select your marital status"),
  })
  .superRefine((data, ctx) => {
    const dob = new Date(data.dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const monthDiff = today.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    if (age < 21 || age > 65) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateOfBirth"],
        message: "Applicant age must be between 21 and 65 years",
      });
    }

    if (
      data.alternateMobile &&
      data.mobile === data.alternateMobile
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["alternateMobile"],
        message:
          "Alternate mobile number must be different from primary mobile number",
      });
    }
  });