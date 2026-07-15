import { useMemo, useState } from "react";

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

  const steps = useMemo(
    () => [
      Step1LoanType,
      Step2PersonalInfo,
      Step3KYC,
      Step4Address,
      Step5Employment,
      Step6CoApplicant,
      Step7Documents,
      Step8Review,
    ],
    []
  );

  const totalSteps = steps.length;

  const CurrentStepComponent =
    steps[currentStep - 1] ?? Step1LoanType;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">
          Loan Application Wizard
        </h2>

        <p className="text-gray-500">
          Complete all required information to submit your
          application.
        </p>

        <h3 className="text-xl font-semibold">
          {STEP_TITLES[currentStep - 1]}
        </h3>
      </div>

      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <CurrentStepComponent />

      <StepNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}

export default Wizard;