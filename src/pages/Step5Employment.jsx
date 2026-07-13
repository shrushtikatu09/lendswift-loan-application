import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Select from "../components/common/Select";

import { EMPLOYMENT_TYPES } from "../data/employmentOptions";

function Step5Employment() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const employmentType = watch("employmentType");

  return (
    <div>
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
            label="Designation"
            id="designation"
            placeholder="Enter Designation"
            error={errors.designation?.message}
            {...register("designation")}
          />

          <Input
            label="Monthly Net Salary"
            id="monthlyIncome"
            type="number"
            placeholder="Enter Monthly Net Salary"
            error={errors.monthlyIncome?.message}
            {...register("monthlyIncome", {
              valueAsNumber: true,
            })}
          />

          <Input
            label="Years of Experience"
            id="workExperience"
            placeholder="Enter Years of Experience"
            error={errors.workExperience?.message}
            {...register("workExperience")}
          />
        </>
      )}
    </div>
  );
}

export default Step5Employment;