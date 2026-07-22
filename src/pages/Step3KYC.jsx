import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";

import {
  validatePAN,
  validateAadhaar,
} from "../utils/validators";

import { useVerification } from "../hooks/useVerification";

function Step3KYC() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const loanType = watch("loanType");
  const panNumber = watch("panNumber");
  const aadhaarNumber = watch("aadhaarNumber");

  // =========================
  // PAN Verification
  // =========================

  const {
    verify: verifyPan,
    resetVerification: resetPanVerification,
    isVerifying: isPanVerifying,
    isVerified: isPanVerified,
    error: panError,
  } = useVerification();

  // =========================
  // Aadhaar Verification
  // =========================

  const {
    verify: verifyAadhaar,
    resetVerification: resetAadhaarVerification,
    isVerifying: isAadhaarVerifying,
    isVerified: isAadhaarVerified,
    error: aadhaarError,
  } = useVerification();

  const handlePanVerification = async () => {
    const success = await verifyPan(
      (value) => validatePAN(value, loanType),
      panNumber
    );

    setValue("panVerified", success, {
      shouldValidate: true,
    });
  };

  const handleAadhaarVerification = async () => {
    const success = await verifyAadhaar(
      validateAadhaar,
      aadhaarNumber
    );

    setValue("aadhaarVerified", success, {
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Step 3 - KYC Verification
      </h2>

      {/* ========================= */}
      {/* PAN */}
      {/* ========================= */}

      <div>
        <Input
          label="PAN Number"
          id="panNumber"
          type="text"
          placeholder="ABCDE1234F"
          error={
            errors.panNumber?.message ||
            errors.panVerified?.message
          }
          {...register("panNumber", {
            onChange: () => {
              resetPanVerification();

              setValue("panVerified", false, {
                shouldValidate: true,
              });
            },
          })}
        />

        <button
          type="button"
          onClick={handlePanVerification}
          disabled={!panNumber || isPanVerifying}
          className="mt-2 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isPanVerifying
            ? "Verifying..."
            : "Verify PAN"}
        </button>

        {isPanVerified && (
          <p className="mt-2 font-medium text-green-600">
            ✅ PAN Verified Successfully
          </p>
        )}

        {panError && (
          <p className="mt-2 text-red-600">
            {panError}
          </p>
        )}
      </div>

      {/* ========================= */}
      {/* Aadhaar */}
      {/* ========================= */}

      <div>
        <Input
          label="Aadhaar Number"
          id="aadhaarNumber"
          type="text"
          placeholder="123456789012"
          error={
            errors.aadhaarNumber?.message ||
            errors.aadhaarVerified?.message
          }
          {...register("aadhaarNumber", {
            onChange: () => {
              resetAadhaarVerification();

              setValue("aadhaarVerified", false, {
                shouldValidate: true,
              });
            },
          })}
        />

        <button
          type="button"
          onClick={handleAadhaarVerification}
          disabled={
            !aadhaarNumber ||
            isAadhaarVerifying
          }
          className="mt-2 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isAadhaarVerifying
            ? "Verifying..."
            : "Verify Aadhaar"}
        </button>

        {isAadhaarVerified && (
          <p className="mt-2 font-medium text-green-600">
            ✅ Aadhaar Verified Successfully
          </p>
        )}

        {aadhaarError && (
          <p className="mt-2 text-red-600">
            {aadhaarError}
          </p>
        )}
      </div>

      {/* ========================= */}
      {/* Consent */}
      {/* ========================= */}

      <Checkbox
        id="consent"
        name="consent"
        label="I hereby consent to the verification of my PAN and Aadhaar details."
        register={register}
        error={errors.consent?.message}
      />
    </div>
  );
}

export default Step3KYC;