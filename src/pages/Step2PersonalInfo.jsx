import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import RadioGroup from "../components/common/RadioGroup";
import Select from "../components/common/Select";

function Step2PersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2>Step 2 - Personal Information</h2>

      <Input
        label="Full Name"
        id="fullName"
        placeholder="Enter Full Name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />

      <Input
        label="Email Address"
        id="email"
        type="email"
        placeholder="Enter Email Address"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Mobile Number"
        id="mobile"
        type="tel"
        placeholder="Enter Mobile Number"
        error={errors.mobile?.message}
        {...register("mobile")}
      />

      <Input
        label="Date of Birth"
        id="dateOfBirth"
        type="date"
        error={errors.dateOfBirth?.message}
        {...register("dateOfBirth")}
      />

      <RadioGroup
        label="Gender"
        name="gender"
        register={register}
        options={[
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
          {
            label: "Other",
            value: "other",
          },
        ]}
        error={errors.gender?.message}
      />

      <Select
        label="Marital Status"
        id="maritalStatus"
        name="maritalStatus"
        placeholder="Select Marital Status"
        register={register}
        options={[
          {
            label: "Single",
            value: "single",
          },
          {
            label: "Married",
            value: "married",
          },
          {
            label: "Divorced",
            value: "divorced",
          },
          {
            label: "Widowed",
            value: "widowed",
          },
        ]}
        error={errors.maritalStatus?.message}
      />
    </div>
  );
}

export default Step2PersonalInfo;