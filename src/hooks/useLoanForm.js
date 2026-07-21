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
      fatherName: "",
      motherName: "",
      email: "",
      mobile: "",
      alternateMobile: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",

      // =========================
      // Step 3 - KYC
      // =========================
      panNumber: "",
      aadhaarNumber: "",
      consent: false,

      panVerified: false,
      aadhaarVerified: false,

      // =========================
      // Step 4 - Current Address
      // =========================
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pinCode: "",
      addressType: "",

      // =========================
      // Permanent Address
      // =========================
      sameAsCurrentAddress: false,

      permanentAddressLine1: "",
      permanentAddressLine2: "",
      permanentCity: "",
      permanentState: "",
      permanentPinCode: "",

      // =========================
      // Step 5 - Employment
      // =========================
      employmentType: "",

      // Salaried
      companyName: "",
      designation: "",
      monthlyIncome: undefined,
      workExperience: undefined,

      // Self Employed / Business
      businessName: "",
      businessType: "",
      annualTurnover: undefined,
      yearsInBusiness: undefined,
      selfMonthlyIncome: undefined,
      officeAddress: "",

      // Business Owner
      gstNumber: "",

      // =========================
      // Step 6 - Co Applicant
      // =========================
      hasCoApplicant: "",
      coApplicantName: "",
      relationship: "",
      coApplicantPAN: "",
      coApplicantPanVerified: false,
      coApplicantMobile: "",
      coApplicantIncome: undefined,
      coApplicantConsent: false,
      coApplicantSignature: null,

      // =========================
      // Step 7 - Documents
      // =========================
      panCard: null,
      aadhaarCard: null,
      salarySlip: null,
      bankStatement: null,

      itrDocument: null,
      propertyDocuments: null,
      businessCertificate: null,
      gstReturns: null,
      photograph: null,

      // =========================
      // Signature
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