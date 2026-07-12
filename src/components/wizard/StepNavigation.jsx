function StepNavigation({ currentStep, setCurrentStep }) {
  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      <button onClick={handlePrevious} disabled={currentStep === 1}>
        Previous
      </button>

      <button onClick={handleNext} disabled={currentStep === 8}>
        Next
      </button>
    </div>
  );
}

export default StepNavigation;