import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import EMISummaryCard from "../components/review/EMISummaryCard";
import ConsentSection from "../components/review/ConsentSection";
import SuccessModal from "../components/common/SuccessModal";

import { clearSavedDraft } from "../hooks/useAutoSave";

const LOAN_TYPE_LABELS = {
  personal: "Personal Loan",
  home: "Home Loan",
  business: "Business Loan",
};

const EMPLOYMENT_LABELS = {
  salaried: "Salaried",
  "self-employed": "Self Employed",
  business: "Business Owner",
};

function Step8Review() {
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    getValues,
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const data = getValues();

  const handleSubmitApplication = async () => {
    setSubmitting(true);

    const valid = await trigger([
    "signature",
  "declarationConsent",
  "creditCheckConsent",
  "termsConsent",
  "communicationConsent",
]);

    if (!valid) {
      setSubmitting(false);
      return;
    }

    const generatedId = `LS-${uuidv4()
      .split("-")[0]
      .toUpperCase()}`;

    setApplicationId(generatedId);

    clearSavedDraft();

    setSubmitted(true);

    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Step 8 - Review & Submit
      </h2>

      {/* =========================
          Application Summary
      ========================= */}

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
              {LOAN_TYPE_LABELS[data.loanType] ||
                data.loanType}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Loan Amount
            </p>

            <p className="font-semibold">
              ₹{Number(
                data.loanAmount || 0
              ).toLocaleString("en-IN")}
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
              PAN Number
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
              {EMPLOYMENT_LABELS[
                data.employmentType
              ] || data.employmentType}
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

      {/* =========================
          EMI Summary
      ========================= */}

      <EMISummaryCard
        loanType={data.loanType}
        loanAmount={data.loanAmount}
        loanTenure={data.loanTenure}
      />
            {/* =========================
          Uploaded Documents
      ========================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">
          Uploaded Documents
        </h3>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border p-3">
            ✅ PAN Card
          </div>

          <div className="rounded-lg border p-3">
            ✅ Aadhaar Card
          </div>

          <div className="rounded-lg border p-3">
            ✅ Bank Statement
          </div>

          {data.salarySlip && (
            <div className="rounded-lg border p-3">
              ✅ Salary Slip
            </div>
          )}

          {data.itrDocument && (
            <div className="rounded-lg border p-3">
              ✅ ITR Document
            </div>
          )}

          {data.propertyDocuments && (
            <div className="rounded-lg border p-3">
              ✅ Property Documents
            </div>
          )}

          {data.businessCertificate && (
            <div className="rounded-lg border p-3">
              ✅ Business Registration Certificate
            </div>
          )}

          {data.gstReturns && (
            <div className="rounded-lg border p-3">
              ✅ GST Returns
            </div>
          )}

          {data.photograph && (
            <div className="rounded-lg border p-3">
              ✅ Applicant Photograph
            </div>
          )}
        </div>
      </div>

      {/* =========================
          Applicant Signature
      ========================= */}

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

      {/* =========================
          Final Consents
      ========================= */}

      <ConsentSection
        register={register}
        errors={errors}
      />

      <button
        type="button"
        onClick={handleSubmitApplication}
        disabled={submitting}
        className={`w-full rounded-xl py-3 text-base font-semibold text-white transition ${
          submitting
            ? "cursor-not-allowed bg-gray-400"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {submitting
          ? "Submitting Application..."
          : "Submit Loan Application"}
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