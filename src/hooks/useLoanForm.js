import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { step1Schema } from "../schemas/step1Schema";

export function useLoanForm() {
  return useForm({
    resolver: zodResolver(step1Schema),

    mode: "onTouched",

    defaultValues: {
      // Step 1
      loanType: "",
      loanAmount: "",
      loanTenure: "",
      loanPurpose: "",
      referralCode: "",

      // Step 2
      fullName: "",
      email: "",
      mobile: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",

      // Step 3
      panNumber: "",
      aadhaarNumber: "",
      consent: false,

      // Step 4
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pinCode: "",
      addressType: "",

      // Step 5
      employmentType: "",
      companyName: "",
      monthlyIncome: "",
      workExperience: "",

      // Step 6
      hasCoApplicant: "",
      coApplicantName: "",
      relationship: "",
      coApplicantMobile: "",
      coApplicantIncome: "",

      // Step 7
      panCard: null,
      aadhaarCard: null,
      salarySlip: null,
      bankStatement: null,
    },
  });
}