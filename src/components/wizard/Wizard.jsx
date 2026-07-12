import { useState } from "react";

import ProgressBar from "./ProgressBar";
import StepNavigation from "./StepNavigation";

import { STEP_TITLES } from "../../config/formConfig";

import Step1LoanType from "../../pages/Step1LoanType";
import Step2PersonalInfo from "../../pages/Step2PersonalInfo";
import Step3KYC from "../../pages/Step3KYC";
import Step4Address from "../../pages/Step4Address";
import Step5Employment from "../../pages/Step5Employment";
import Step6CoApplicant from "../../pages/Step6CoApplicant";
import Step7Documents from "../../pages/Step7Documents";
import Step8Review from "../../pages/Step8Review";

function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    Step1LoanType,
    Step2PersonalInfo,
    Step3KYC,
    Step4Address,
    Step5Employment,
    Step6CoApplicant,
    Step7Documents,
    Step8Review,
  ];

  const CurrentStepComponent = steps[currentStep - 1];

  return (
    <div>
      <h2>Loan Application Wizard</h2>

      <h3>{STEP_TITLES[currentStep - 1]}</h3>

      <ProgressBar currentStep={currentStep} />

      <CurrentStepComponent />

      <StepNavigation
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}

export default Wizard;