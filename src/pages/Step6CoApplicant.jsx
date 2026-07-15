import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Checkbox from "../components/common/Checkbox";

import { RELATIONSHIP_OPTIONS } from "../data/coApplicantOptions";

function Step6CoApplicant() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const loanType = watch("loanType");
  const loanAmount = Number(watch("loanAmount") || 0);

  const showCoApplicant =
    loanType === "home" ||
    (loanType === "personal" && loanAmount > 500000) ||
    (loanType === "business" && loanAmount > 2000000);

  if (!showCoApplicant) {
    return (
      <div className="rounded-lg border bg-green-50 p-6">
        <h2 className="text-2xl font-semibold mb-2">
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
        label="I confirm that the Co-Applicant has provided consent to share their information."
        register={register}
        error={errors.coApplicantConsent?.message}
      />
    </div>
  );
}

export default Step6CoApplicant;