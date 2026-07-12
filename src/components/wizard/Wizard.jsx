import Step1LoanType from "../../pages/Step1LoanType";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import StepNavigation from "./StepNavigation";

function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <h2>Loan Application Wizard</h2>

      <p>Current Step: {currentStep}</p>

      <ProgressBar />

      <Step1LoanType />

      <StepNavigation
  currentStep={currentStep}
  setCurrentStep={setCurrentStep}
/>
    </div>
  );
}

export default Wizard;