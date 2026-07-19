import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Select from "../components/common/Select";

import {
  EMPLOYMENT_TYPES,
  BUSINESS_TYPES,
} from "../data/employmentOptions";

function Step5Employment() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const employmentType = watch("employmentType");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Step 5 - Employment Details
      </h2>

      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm text-blue-700">
          Please provide your current employment
          information. The details entered here will be
          used to assess your loan eligibility.
        </p>
      </div>

      <Select
        label="Employment Type"
        id="employmentType"
        name="employmentType"
        placeholder="Select Employment Type"
        register={register}
        options={EMPLOYMENT_TYPES}
        error={errors.employmentType?.message}
      />

      {/* =========================
          Salaried
      ========================= */}

      {employmentType === "salaried" && (
        <div className="space-y-5 rounded-lg border border-slate-200 p-5">
          <Input
            label="Company Name"
            id="companyName"
            placeholder="Enter Company Name"
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
            label="Monthly Salary"
            id="monthlyIncome"
            type="number"
            placeholder="e.g. 50000"
            error={errors.monthlyIncome?.message}
            {...register("monthlyIncome", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
          />

          <p className="text-xs text-slate-500">
            Minimum monthly salary required: ₹15,000
          </p>

          <Input
            label="Work Experience (Years)"
            id="workExperience"
            type="number"
            placeholder="e.g. 5"
            error={errors.workExperience?.message}
            {...register("workExperience", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
          />
        </div>
      )}

      {/* =========================
          Self Employed
      ========================= */}

      {employmentType === "self-employed" && (
        <div className="space-y-5 rounded-lg border border-slate-200 p-5">
          <Input
            label="Business Name"
            id="businessName"
            placeholder="Enter Business Name"
            error={errors.businessName?.message}
            {...register("businessName")}
          />

          <Select
            label="Business Type"
            id="businessType"
            name="businessType"
            placeholder="Select Business Type"
            register={register}
            options={BUSINESS_TYPES}
            error={errors.businessType?.message}
          />

          <Input
            label="Annual Turnover"
            id="annualTurnover"
            type="number"
            placeholder="e.g. 500000"
            error={errors.annualTurnover?.message}
            {...register("annualTurnover", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
          />

          <Input
            label="Monthly Income"
            id="selfMonthlyIncome"
            type="number"
            placeholder="e.g. 50000"
            error={errors.selfMonthlyIncome?.message}
            {...register("selfMonthlyIncome", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
          />

          <Input
            label="Years in Business"
            id="yearsInBusiness"
            type="number"
            placeholder="e.g. 5"
            error={errors.yearsInBusiness?.message}
            {...register("yearsInBusiness", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
          />

          <Input
            label="Office Address"
            id="officeAddress"
            placeholder="Enter Office Address"
            error={errors.officeAddress?.message}
            {...register("officeAddress")}
          />

          <p className="text-xs text-slate-500">
            Please provide your registered business
            address.
          </p>
        </div>
      )}
            {/* =========================
          Business Owner
      ========================= */}

      {employmentType === "business" && (
        <div className="space-y-5 rounded-lg border border-slate-200 p-5">
          <Input
            label="Business Name"
            id="businessName"
            placeholder="Enter Business Name"
            error={errors.businessName?.message}
            {...register("businessName")}
          />

          <Select
            label="Business Type"
            id="businessType"
            name="businessType"
            placeholder="Select Business Type"
            register={register}
            options={BUSINESS_TYPES}
            error={errors.businessType?.message}
          />

          <Input
            label="Annual Turnover"
            id="annualTurnover"
            type="number"
            placeholder="e.g. 1000000"
            error={errors.annualTurnover?.message}
            {...register("annualTurnover", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
          />

          <Input
            label="Years in Business"
            id="yearsInBusiness"
            type="number"
            placeholder="e.g. 8"
            error={errors.yearsInBusiness?.message}
            {...register("yearsInBusiness", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
          />

          <Input
            label="GST Number"
            id="gstNumber"
            placeholder="22AAAAA0000A1Z5"
            error={errors.gstNumber?.message}
            {...register("gstNumber", {
              setValueAs: (value) =>
                value?.toUpperCase().trim(),
            })}
          />

          <Input
            label="Office Address"
            id="officeAddress"
            placeholder="Enter Office Address"
            error={errors.officeAddress?.message}
            {...register("officeAddress")}
          />

          <p className="text-xs text-slate-500">
            GST Number should be valid and match your
            registered business.
          </p>
        </div>
      )}
    </div>
  );
}

export default Step5Employment;