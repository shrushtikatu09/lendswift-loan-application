import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { step6Schema } from "../schemas/step6Schema";

import Input from "../components/common/Input";
import RadioGroup from "../components/common/RadioGroup";
import Select from "../components/common/Select";

import { RELATIONSHIP_OPTIONS } from "../data/coApplicantOptions";

function Step6CoApplicant() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step6Schema),
    defaultValues: {
      hasCoApplicant: "",
      coApplicantName: "",
      relationship: "",
      coApplicantMobile: "",
      coApplicantIncome: undefined,
    },
  });

  const hasCoApplicant = watch("hasCoApplicant");

  const onSubmit = (data) => {
    console.log("Step 6 Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 6 - Co-Applicant Details</h2>

      <RadioGroup
        label="Do you have a Co-Applicant?"
        name="hasCoApplicant"
        register={register}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        error={errors.hasCoApplicant?.message}
      />

      {hasCoApplicant === "yes" && (
        <>
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

          <Input
            label="Mobile Number"
            id="coApplicantMobile"
            type="tel"
            placeholder="Enter Mobile Number"
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
              valueAsNumber: true,
            })}
          />
        </>
      )}

      <button type="submit">
        Validate Step 6
      </button>
    </form>
  );
}

export default Step6CoApplicant;