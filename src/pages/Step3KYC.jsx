import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";

import { validatePAN } from "../utils/validators";
import { useVerification } from "../hooks/useVerification";

function Step3KYC() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const loanType = watch("loanType");
  const panNumber = watch("panNumber");

  const {
    verify,
    resetVerification,
    isVerifying,
    isVerified,
    error,
  } = useVerification();

  const handlePanVerification = async () => {
    await verify(
      (value) => validatePAN(value, loanType),
      panNumber
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Step 3 - KYC Verification
      </h2>

      <div>
        <Input
          label="PAN Number"
          id="panNumber"
          type="text"
          placeholder="ABCDE1234F"
          error={errors.panNumber?.message}
          {...register("panNumber", {
            onChange: () => resetVerification(),
          })}
        />

        <button
          type="button"
          onClick={handlePanVerification}
          disabled={!panNumber || isVerifying}
          className="mt-2 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isVerifying ? "Verifying..." : "Verify PAN"}
        </button>

        {isVerified && (
          <p className="mt-2 text-green-600 font-medium">
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
        label="Aadhaar Number"
        id="aadhaarNumber"
        type="text"
        placeholder="123456789012"
        error={errors.aadhaarNumber?.message}
        {...register("aadhaarNumber")}
      />

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