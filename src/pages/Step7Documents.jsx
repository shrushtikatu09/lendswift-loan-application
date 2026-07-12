import { useFormContext } from "react-hook-form";

import FileUpload from "../components/common/FileUpload";

function Step7Documents() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2>Step 7 - Upload Documents</h2>

      <FileUpload
        label="PAN Card"
        id="panCard"
        name="panCard"
        register={register}
        error={errors.panCard?.message}
      />

      <FileUpload
        label="Aadhaar Card"
        id="aadhaarCard"
        name="aadhaarCard"
        register={register}
        error={errors.aadhaarCard?.message}
      />

      <FileUpload
        label="Salary Slip"
        id="salarySlip"
        name="salarySlip"
        register={register}
        error={errors.salarySlip?.message}
      />

      <FileUpload
        label="Bank Statement"
        id="bankStatement"
        name="bankStatement"
        register={register}
        error={errors.bankStatement?.message}
      />
    </div>
  );
}

export default Step7Documents;