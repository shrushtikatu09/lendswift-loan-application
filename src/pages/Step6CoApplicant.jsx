import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Checkbox from "../components/common/Checkbox";
import FileUpload from "../components/common/FileUpload";

import { RELATIONSHIP_OPTIONS } from "../data/coApplicantOptions";

import { validatePAN } from "../utils/validators";
import { useVerification } from "../hooks/useVerification";

function Step6CoApplicant() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    register("coApplicantPanVerified");
    register("coApplicantSignature");
  }, [register]);

  const loanType = watch("loanType");
  const loanAmount = Number(watch("loanAmount") || 0);
  const coApplicantPAN = watch("coApplicantPAN");

  const showCoApplicant =
    loanType === "home" ||
    (loanType === "personal" && loanAmount > 500000) ||
    (loanType === "business" && loanAmount > 2000000);

  const {
    verify,
    resetVerification,
    isVerifying,
    isVerified,
    error,
  } = useVerification();

  const handlePanVerification = async () => {
    const success = await verify(
      (value) => validatePAN(value, loanType),
      coApplicantPAN
    );

    setValue("coApplicantPanVerified", success, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  if (!showCoApplicant) {
    return (
      <div className="rounded-lg border bg-green-50 p-6">
        <h2 className="mb-2 text-2xl font-semibold">
          Step 6 - Co-Applicant
        </h2>

        <p className="text-green-700">
          Co-Applicant is not required for this loan application.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">
        Step 6 - Co-Applicant Details
      </h2>

      <div className="rounded-md bg-blue-50 p-4 text-blue-700">
        Based on your loan type and requested amount,
        a co-applicant is mandatory.
      </div>

      <Input
        label="Co-Applicant Name"
        id="coApplicantName"
        placeholder="Enter Co-Applicant Name"
        error={errors.coApplicantName?.message}
        {...register("coApplicantName")}
      />

      <Select
        label="Relationship"
        id="relationship"
        name="relationship"
        placeholder="Select Relationship"
        register={register}
        options={RELATIONSHIP_OPTIONS}
        error={errors.relationship?.message}
      />

      <div>
        <Input
          label="PAN Number"
          id="coApplicantPAN"
          placeholder="ABCDE1234P"
          error={
            errors.coApplicantPAN?.message ||
            errors.coApplicantPanVerified?.message
          }
          {...register("coApplicantPAN", {
            onChange: () => {
              resetVerification();

              setValue("coApplicantPanVerified", false, {
                shouldValidate: true,
              });
            },
          })}
        />

        <button
          type="button"
          onClick={handlePanVerification}
          disabled={!coApplicantPAN || isVerifying}
          className="mt-2 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isVerifying
            ? "Verifying..."
            : "Verify PAN"}
        </button>

        {isVerified && (
          <p className="mt-2 font-medium text-green-600">
            ✅ PAN Verified Successfully
          </p>
        )}

        {error && (
          <p className="mt-2 text-red-600">
            {error}
          </p>
        )}
      </div>

      <Input
        label="Mobile Number"
        id="coApplicantMobile"
        type="tel"
        placeholder="9876543210"
        error={errors.coApplicantMobile?.message}
        {...register("coApplicantMobile")}
      />

      <Input
        label="Monthly Income"
        id="coApplicantIncome"
        type="number"
        placeholder="Enter Monthly Income"
        error={errors.coApplicantIncome?.message}
        {...register("coApplicantIncome", {
          setValueAs: (value) =>
            value === "" ? undefined : Number(value),
        })}
      />
            {/* ========================= */}
      {/* Co-Applicant Signature */}
      {/* ========================= */}

      <FileUpload
        label="Co-Applicant Signature"
        name="coApplicantSignature"
        watch={watch}
        setValue={setValue}
        error={errors.coApplicantSignature?.message}
        accept={{
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
        }}
      />

      <Checkbox
        id="coApplicantConsent"
        name="coApplicantConsent"
        label="I confirm that the Co-Applicant has provided consent to share their information."
        register={register}
        error={errors.coApplicantConsent?.message}
      />
    </div>
  );
}

export default Step6CoApplicant;