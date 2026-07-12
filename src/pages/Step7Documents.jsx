import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { step7Schema } from "../schemas/step7Schema";

import FileUpload from "../components/common/FileUpload";

function Step7Documents() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step7Schema),
  });

  const onSubmit = (data) => {
    console.log("Step 7 Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <button type="submit">
        Validate Step 7
      </button>
    </form>
  );
}

export default Step7Documents;