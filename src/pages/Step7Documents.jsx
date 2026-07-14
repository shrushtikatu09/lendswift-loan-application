import { useFormContext } from "react-hook-form";

import FileUpload from "../components/common/FileUpload";

function Step7Documents() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
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
        label="Salary Slip"
        name="salarySlip"
        watch={watch}
        setValue={setValue}
        error={errors.salarySlip?.message}
      />

      <FileUpload
        label="Bank Statement"
        name="bankStatement"
        watch={watch}
        setValue={setValue}
        error={errors.bankStatement?.message}
      />
    </div>
  );
}

export default Step7Documents;