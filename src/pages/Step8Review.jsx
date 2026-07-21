import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import EMISummaryCard from "../components/review/EMISummaryCard";
import ConsentSection from "../components/review/ConsentSection";
import SuccessModal from "../components/common/SuccessModal";

import { clearSavedDraft } from "../hooks/useAutoSave";

function Step8Review() {
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const {
    getValues,
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const data = getValues();

  const handleSubmitApplication = async () => {
    const valid = await trigger([
      "signature",
      "declarationConsent",
      "creditCheckConsent",
      "termsConsent",
      "communicationConsent",
    ]);

    if (!valid) {
      return;
    }

    const generatedId = `LS-${uuidv4()
      .split("-")[0]
      .toUpperCase()}`;

    setApplicationId(generatedId);

    clearSavedDraft();

    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Step 8 - Review & Submit
      </h2>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">
          Application Summary
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">
              Loan Type
            </p>

            <p className="font-semibold">
              {data.loanType}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Loan Amount
            </p>

            <p className="font-semibold">
              ₹{data.loanAmount}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Applicant
            </p>

            <p className="font-semibold">
              {data.fullName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Mobile
            </p>

            <p className="font-semibold">
              {data.mobile}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              PAN
            </p>

            <p className="font-semibold">
              {data.panNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Employment
            </p>

            <p className="font-semibold">
              {data.employmentType}
            </p>
          </div>

          {data.coApplicantName && (
            <div>
              <p className="text-sm text-slate-500">
                Co-Applicant
              </p>

              <p className="font-semibold">
                {data.coApplicantName}
              </p>
            </div>
          )}
        </div>
      </div>

      <EMISummaryCard
        loanType={data.loanType}
        loanAmount={data.loanAmount}
        loanTenure={data.loanTenure}
      />

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">
          Applicant Signature
        </h3>
                {data.signature ? (
          <div className="rounded-lg border bg-slate-50 p-4">
            <img
              src={data.signature}
              alt="Applicant Signature"
              className="max-h-40 rounded border bg-white"
            />

            <p className="mt-3 text-sm font-medium text-green-600">
              ✓ Signature Verified
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">
              Signature not available.
            </p>
          </div>
        )}
      </div>

      <ConsentSection
        register={register}
        errors={errors}
      />

      <button
        type="button"
        onClick={handleSubmitApplication}
        className="w-full rounded-xl bg-green-600 py-3 text-base font-semibold text-white transition hover:bg-green-700"
      >
        Submit Loan Application
      </button>

      <SuccessModal
        open={submitted}
        onClose={() => setSubmitted(false)}
        applicationData={data}
        applicationId={applicationId}
      />
    </div>
  );
}

export default Step8Review;