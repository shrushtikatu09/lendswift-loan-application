import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { step5Schema } from "../schemas/step5Schema";

import Input from "../components/common/Input";
import Select from "../components/common/Select";

import { EMPLOYMENT_TYPES } from "../data/employmentOptions";

function Step5Employment() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      employmentType: "",
      companyName: "",
      monthlyIncome: undefined,
      workExperience: "",
    },
  });

  const employmentType = watch("employmentType");

  const onSubmit = (data) => {
    console.log("Step 5 Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 5 - Employment Details</h2>

      <Select
        label="Employment Type"
        id="employmentType"
        name="employmentType"
        placeholder="Select Employment Type"
        register={register}
        options={EMPLOYMENT_TYPES}
        error={errors.employmentType?.message}
      />

      {employmentType && (
        <>
          <Input
            label={
              employmentType === "business"
                ? "Business Name"
                : "Company Name"
            }
            id="companyName"
            placeholder={
              employmentType === "business"
                ? "Enter Business Name"
                : "Enter Company Name"
            }
            error={errors.companyName?.message}
            {...register("companyName")}
          />

          <Input
            label="Monthly Income"
            id="monthlyIncome"
            type="number"
            placeholder="Enter Monthly Income"
            error={errors.monthlyIncome?.message}
            {...register("monthlyIncome", {
              valueAsNumber: true,
            })}
          />

          <Input
            label="Work Experience (Years)"
            id="workExperience"
            placeholder="e.g. 5 Years"
            error={errors.workExperience?.message}
            {...register("workExperience")}
          />
        </>
      )}

      <button type="submit">
        Validate Step 5
      </button>
    </form>
  );
}

export default Step5Employment;