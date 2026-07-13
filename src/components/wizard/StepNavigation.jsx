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
  const {
    trigger,
    watch,
  } = useFormContext();

  const handleNext = async () => {
    let fields = STEP_FIELDS[currentStep] || [];

    if (currentStep === 5) {
      const employmentType = watch("employmentType");

      switch (employmentType) {
        case "salaried":
          fields = [
            "employmentType",
            "companyName",
            "designation",
            "monthlyIncome",
            "workExperience",
          ];
          break;

        case "self-employed":
          fields = [
            "employmentType",
            "businessName",
            "businessType",
            "annualTurnover",
            "yearsInBusiness",
            "selfMonthlyIncome",
            "officeAddress",
          ];
          break;

        case "business":
          fields = [
            "employmentType",
            "businessName",
            "businessType",
            "annualTurnover",
            "yearsInBusiness",
            "gstNumber",
            "officeAddress",
          ];
          break;

        default:
          fields = ["employmentType"];
      }
    }

    const isValid = await trigger(fields);

    console.log("Current Step :", currentStep);
    console.log("Employment :", watch("employmentType"));
    console.log("Fields :", fields);
    console.log("Valid :", isValid);

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