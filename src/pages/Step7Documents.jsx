import { useFormContext } from "react-hook-form";

import FileUpload from "../components/common/FileUpload";

function Step7Documents() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const loanType = watch("loanType");
  const employmentType = watch("employmentType");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Step 7 - Upload Documents
      </h2>

      <FileUpload
        label="PAN Card"
        name="panCard"
        watch={watch}
        setValue={setValue}
        error={errors.panCard?.message}
      />

      <FileUpload
        label="Aadhaar Card"
        name="aadhaarCard"
        watch={watch}
        setValue={setValue}
        error={errors.aadhaarCard?.message}
      />

      <FileUpload
        label="Bank Statement (Last 6 Months)"
        name="bankStatement"
        watch={watch}
        setValue={setValue}
        error={errors.bankStatement?.message}
      />

      {employmentType === "salaried" && (
        <FileUpload
          label="Salary Slip (Last 3 Months)"
          name="salarySlip"
          watch={watch}
          setValue={setValue}
          error={errors.salarySlip?.message}
        />
      )}

      {(employmentType === "self-employed" ||
        employmentType === "business") && (
        <FileUpload
          label="ITR (Last 2 Years)"
          name="itrDocument"
          watch={watch}
          setValue={setValue}
          error={errors.itrDocument?.message}
        />
      )}

      {loanType === "home" && (
        <FileUpload
          label="Property Documents"
          name="propertyDocuments"
          watch={watch}
          setValue={setValue}
          error={errors.propertyDocuments?.message}
        />
      )}

      {loanType === "business" && (
        <>
          <FileUpload
            label="Business Registration Certificate"
            name="businessCertificate"
            watch={watch}
            setValue={setValue}
            error={errors.businessCertificate?.message}
          />

          <FileUpload
            label="GST Returns"
            name="gstReturns"
            watch={watch}
            setValue={setValue}
            error={errors.gstReturns?.message}
          />
        </>
      )}

      <FileUpload
        label="Passport Size Photograph"
        name="photograph"
        watch={watch}
        setValue={setValue}
        error={errors.photograph?.message}
      />
    </div>
  );
}

export default Step7Documents;