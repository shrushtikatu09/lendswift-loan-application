import { useFormContext } from "react-hook-form";
import { TOTAL_STEPS } from "../../config/formConfig";

const STEP_FIELDS = {
  1: [
    "loanType",
    "loanAmount",
    "loanTenure",
    "loanPurpose",
  ],

  2: [
    "fullName",
    "fatherName",
    "motherName",
    "email",
    "mobile",
    "alternateMobile",
    "dateOfBirth",
    "gender",
    "maritalStatus",
  ],

  3: [
    "panNumber",
    "aadhaarNumber",
    "consent",
    "panVerified",
    "aadhaarVerified",
  ],

  4: [
    "addressLine1",
    "city",
    "state",
    "pinCode",
    "addressType",

    "sameAsCurrentAddress",

    "permanentAddressLine1",
    "permanentCity",
    "permanentState",
    "permanentPinCode",
  ],

  6: [
    "hasCoApplicant",
    "coApplicantName",
    "relationship",
    "coApplicantMobile",
    "coApplicantIncome",
    "coApplicantConsent",
  ],

  7: [
    "panCard",
    "aadhaarCard",
    "salarySlip",
    "bankStatement",
  ],

  8: [],
};

function StepNavigation({
  currentStep,
  setCurrentStep,
}) {
  const {
    trigger,
    watch,
    setFocus,
  } = useFormContext();

  const employmentType = watch("employmentType");

  const getStepFields = () => {
    if (currentStep !== 5) {
      return STEP_FIELDS[currentStep] || [];
    }

    switch (employmentType) {
      case "salaried":
        return [
          "employmentType",
          "companyName",
          "designation",
          "monthlyIncome",
          "workExperience",
        ];

      case "self-employed":
        return [
          "employmentType",
          "businessName",
          "businessType",
          "annualTurnover",
          "yearsInBusiness",
          "selfMonthlyIncome",
          "officeAddress",
        ];

      case "business":
        return [
          "employmentType",
          "businessName",
          "businessType",
          "annualTurnover",
          "yearsInBusiness",
          "gstNumber",
          "officeAddress",
        ];

      default:
        return ["employmentType"];
    }
  };

  const handleNext = async () => {
    let fields = getStepFields();

    // =========================
    // Step 4 Conditional Validation
    // =========================

    if (currentStep === 4) {
      const sameAsCurrentAddress = watch(
        "sameAsCurrentAddress"
      );

      if (sameAsCurrentAddress) {
        fields = [
          "addressLine1",
          "city",
          "state",
          "pinCode",
          "addressType",
          "sameAsCurrentAddress",
        ];
      }
    }

    // =========================
    // Step 6 Conditional Validation
    // =========================

    if (currentStep === 6) {
      const loanType = watch("loanType");
      const loanAmount = Number(
        watch("loanAmount") || 0
      );

      const requiresCoApplicant =
        loanType === "home" ||
        (loanType === "personal" &&
          loanAmount > 500000) ||
        (loanType === "business" &&
          loanAmount > 2000000);

      if (!requiresCoApplicant) {
        fields = [];
      }
    }

    const valid = await trigger(fields);

    if (!valid) {
      if (fields.length > 0) {
        setFocus(fields[0]);
      }

      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-10 border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="
            min-w-[130px]
            rounded-lg
            border
            border-slate-300
            bg-white
            px-6
            py-3
            text-sm
            font-semibold
            text-slate-700
            shadow-sm
            transition-all
            duration-200
            hover:bg-slate-100
            hover:shadow
            focus:outline-none
            focus:ring-2
            focus:ring-blue-200
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          ← Previous
        </button>

        {currentStep !== TOTAL_STEPS && (
          <button
            type="button"
            onClick={handleNext}
            className="
              min-w-[140px]
              rounded-lg
              bg-[#1F4E79]
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-md
              transition-all
              duration-200
              hover:bg-[#163A5C]
              hover:shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-300
            "
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

export default StepNavigation;