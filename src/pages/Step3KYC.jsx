import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";

function Step3KYC() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2>Step 3 - KYC Verification</h2>

      <Input
        label="PAN Number"
        id="panNumber"
        type="text"
        placeholder="ABCDE1234F"
        error={errors.panNumber?.message}
        {...register("panNumber")}
      />

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