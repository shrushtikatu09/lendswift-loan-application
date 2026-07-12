import { useFormContext } from "react-hook-form";
import { TOTAL_STEPS } from "../../config/formConfig";

const STEP_FIELDS = {
  1: [
    "loanType",
    "loanAmount",
    "loanTenure",
    "loanPurpose",
    "referralCode",
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
  5: [
    "employmentType",
    "companyName",
    "monthlyIncome",
    "workExperience",
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
};

function StepNavigation({ currentStep, setCurrentStep }) {
  const { trigger } = useFormContext();

  const handleNext = async () => {
    const fields = STEP_FIELDS[currentStep] || [];

    const isValid =
      fields.length === 0
        ? true
        : await trigger(fields);

    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex justify-between mt-6">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentStep === 1}
      >
        Previous
      </button>

      <button
        type="button"
        onClick={handleNext}
      >
        {currentStep === TOTAL_STEPS ? "Submit" : "Next"}
      </button>
    </div>
  );
}

export default StepNavigation;