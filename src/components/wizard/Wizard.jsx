import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import ProgressBar from "./ProgressBar";
import StepNavigation from "./StepNavigation";

import ResumeModal from "../common/ResumeModal";

import useAutoSave, {
  getSavedDraft,
  clearSavedDraft,
} from "../../hooks/useAutoSave";

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
  const {
    watch,
    reset,
  } = useFormContext();

  const formValues = watch();

  const [currentStep, setCurrentStep] = useState(1);

  const [showResumeModal, setShowResumeModal] =
    useState(false);

  const [savedDraft, setSavedDraft] = useState(null);

  useAutoSave(formValues, currentStep);

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

  useEffect(() => {
    const draft = getSavedDraft();

    if (draft) {
      setSavedDraft(draft);
      setShowResumeModal(true);
    }
  }, []);

  const handleResume = () => {
    if (!savedDraft) return;

    reset(savedDraft.values);

    setCurrentStep(savedDraft.step || 1);

    setShowResumeModal(false);
  };

  const handleStartFresh = () => {
    clearSavedDraft();

    setShowResumeModal(false);

    setCurrentStep(1);
  };

  return (
    <>
      <ResumeModal
        open={showResumeModal}
        onResume={handleResume}
        onStartFresh={handleStartFresh}
      />

      <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              LendSwift Loan Application
            </h1>

            <p className="mt-3 text-base text-slate-600">
              Complete your loan application securely.
              All information is encrypted and reviewed
              before submission.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

            <div className="border-b border-slate-200 bg-slate-50 px-8 py-6">

              <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
                Application Progress
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {STEP_TITLES[currentStep - 1]}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Step {currentStep} of {totalSteps}
              </p>

            </div>

            <div className="px-8 pt-6">
              <ProgressBar currentStep={currentStep} />
            </div>

            <div className="px-8 py-8">
              <CurrentStepComponent />
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-8 py-5">
              <StepNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                setCurrentStep={setCurrentStep}
              />
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Wizard;