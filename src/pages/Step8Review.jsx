import { useState } from "react";
import { useFormContext } from "react-hook-form";

import EMISummaryCard from "../components/review/EMISummaryCard";
import ConsentSection from "../components/review/ConsentSection";
import SuccessModal from "../components/common/SuccessModal";
import SignaturePad from "../components/common/SignaturePad";

function Step8Review() {
  const [submitted, setSubmitted] = useState(false);

  const {
    getValues,
    register,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const data = getValues();

  const signature = watch("signature");

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

    console.log("Loan Application Submitted", getValues());

    setSubmitted(true);
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold">
        Step 8 - Review & Submit
      </h2>

      <div className="rounded-lg border p-5">

        <h3 className="mb-4 text-lg font-semibold">
          Application Summary
        </h3>

        <div className="space-y-2">

          <p>
            <strong>Loan Type:</strong>{" "}
            {data.loanType}
          </p>

          <p>
            <strong>Loan Amount:</strong>{" "}
            ₹{data.loanAmount}
          </p>

          <p>
            <strong>Applicant:</strong>{" "}
            {data.fullName}
          </p>

          <p>
            <strong>Mobile:</strong>{" "}
            {data.mobile}
          </p>

          <p>
            <strong>PAN:</strong>{" "}
            {data.panNumber}
          </p>

          <p>
            <strong>Employment:</strong>{" "}
            {data.employmentType}
          </p>

          {data.coApplicantName && (
            <p>
              <strong>Co-Applicant:</strong>{" "}
              {data.coApplicantName}
            </p>
          )}

        </div>

      </div>

      <EMISummaryCard />

      <SignaturePad
        value={signature}
        onChange={(value) =>
          setValue("signature", value, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        error={errors.signature?.message}
      />

      <ConsentSection
        register={register}
        errors={errors}
      />

      <button
        type="button"
        onClick={handleSubmitApplication}
        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
      >
        Submit Loan Application
      </button>

      <SuccessModal
        open={submitted}
        onClose={() => setSubmitted(false)}
      />

    </div>
  );
}

export default Step8Review;