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
    "email",
    "mobile",
    "dateOfBirth",
    "gender",
    "maritalStatus",
  ],

  3: [
    "panNumber",
    "aadhaarNumber",
    "consent",
  ],

  4: [
    "addressLine1",
    "city",
    "state",
    "pinCode",
    "addressType",
  ],

  6: [
    "hasCoApplicant",
    "coApplicantName",
    "relationship",
    "coApplicantMobile",
    "coApplicantIncome",
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
    const fields = getStepFields();

    const valid = await trigger(fields);

    if (!valid) {
      if (fields.length > 0) {
        setFocus(fields[0]);
      }
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentStep === 1}
        className="px-5 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        {currentStep === TOTAL_STEPS ? "Submit" : "Next"}
      </button>
    </div>
  );
}

export default StepNavigation;