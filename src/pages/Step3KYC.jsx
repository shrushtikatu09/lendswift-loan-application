import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { step3Schema } from "../schemas/step3Schema";

import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";

function Step3KYC() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      panNumber: "",
      aadhaarNumber: "",
      consent: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Step 3 Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <button type="submit">
        Validate Step 3
      </button>
    </form>
  );
}

export default Step3KYC;