import { TOTAL_STEPS, STEP_TITLES } from "../../config/formConfig";

function ProgressBar({ currentStep }) {
  const progressPercentage = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Loan Application
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Step {currentStep} of {TOTAL_STEPS}
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          {Math.round(progressPercentage)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div
        className="relative h-2 w-full rounded-full bg-slate-200"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-valuenow={currentStep}
        aria-label={`Step ${currentStep} of ${TOTAL_STEPS}`}
      >
        <div
          className="h-full rounded-full bg-blue-700 transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step Circles */}
      <div className="relative mt-5 flex justify-between">
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
          const step = index + 1;

          const completed = step < currentStep;
          const active = step === currentStep;

          return (
            <div
              key={step}
              className="flex w-16 flex-col items-center"
            >
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full
                  border-2 text-sm font-semibold transition-all
                  ${
                    completed
                      ? "border-green-600 bg-green-600 text-white"
                      : active
                      ? "border-blue-700 bg-blue-700 text-white"
                      : "border-slate-300 bg-white text-slate-500"
                  }
                `}
              >
                {completed ? "✓" : step}
              </div>

              <p
                className={`mt-2 text-center text-xs ${
                  active
                    ? "font-semibold text-blue-700"
                    : "text-slate-500"
                }`}
              >
                {STEP_TITLES?.[index] ?? `Step ${step}`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;