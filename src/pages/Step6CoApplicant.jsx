import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import RadioGroup from "../components/common/RadioGroup";
import Select from "../components/common/Select";
import Checkbox from "../components/common/Checkbox";

import { RELATIONSHIP_OPTIONS } from "../data/coApplicantOptions";

function Step6CoApplicant() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const hasCoApplicant = watch("hasCoApplicant");

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Step 6 - Co-Applicant Details
      </h2>

      <RadioGroup
        label="Do you have a Co-Applicant?"
        name="hasCoApplicant"
        register={register}
        options={[
          {
            label: "Yes",
            value: "yes",
          },
          {
            label: "No",
            value: "no",
          },
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
            label="PAN Number"
            id="coApplicantPAN"
            placeholder="ABCDE1234F"
            error={errors.coApplicantPAN?.message}
            {...register("coApplicantPAN")}
          />

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
              valueAsNumber: true,
            })}
          />

          <Checkbox
            id="coApplicantConsent"
            name="coApplicantConsent"
            label="I confirm that the Co-Applicant has given consent to share their information."
            register={register}
            error={errors.coApplicantConsent?.message}
          />
        </>
      )}
    </div>
  );
}

export default Step6CoApplicant;