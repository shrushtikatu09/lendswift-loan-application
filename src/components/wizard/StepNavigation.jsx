import { useFormContext } from "react-hook-form";
import { TOTAL_STEPS } from "../../config/formConfig";

function StepNavigation({ currentStep, setCurrentStep }) {
  const { trigger } = useFormContext();

  const handleNext = async () => {
    let fieldsToValidate = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          "loanType",
          "loanAmount",
          "loanTenure",
          "loanPurpose",
          "referralCode",
        ];
        break;

      default:
        fieldsToValidate = [];
    }

    const isValid =
      fieldsToValidate.length === 0
        ? true
        : await trigger(fieldsToValidate);

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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
      }}
    >
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