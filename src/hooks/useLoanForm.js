import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loanApplicationSchema } from "../schemas/loanApplicationSchema";

export function useLoanForm() {
  return useForm({
    resolver: zodResolver(loanApplicationSchema),

    mode: "onTouched",

    defaultValues: {
      // =========================
      // Step 1 - Loan Details
      // =========================
      loanType: "",
      loanAmount: "",
      loanTenure: "",
      loanPurpose: "",
      referralCode: "",

      // =========================
      // Step 2 - Personal Details
      // =========================
      fullName: "",
      email: "",
      mobile: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",

      // =========================
      // Step 3 - KYC
      // =========================
      panNumber: "",
      aadhaarNumber: "",
      consent: false,

      // =========================
      // Step 4 - Address
      // =========================
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pinCode: "",
      addressType: "",

      // =========================
      // Step 5 - Employment
      // =========================
      employmentType: "",

      // Salaried
      companyName: "",
      designation: "",
      monthlyIncome: "",
      workExperience: "",

      // Self Employed / Business
      businessName: "",
      businessType: "",
      annualTurnover: "",
      yearsInBusiness: "",
      selfMonthlyIncome: "",
      officeAddress: "",

      // Business Owner
      gstNumber: "",

      // =========================
      // Step 6 - Co Applicant
      // =========================
      
      coApplicantName: "",
      relationship: "",
      coApplicantPAN: "",
      coApplicantMobile: "",
      coApplicantIncome: "",
      coApplicantConsent: false,

      // =========================
      // Step 7 - Documents
      // =========================
      panCard: null,
      aadhaarCard: null,
      salarySlip: null,
      bankStatement: null,

      // =========================
      // Step 7 - Signature
      // =========================
      signature: "",

      // =========================
      // Step 8 - Final Consents
      // =========================
      declarationConsent: false,
      creditCheckConsent: false,
      termsConsent: false,
      communicationConsent: false,
    },
  });
}