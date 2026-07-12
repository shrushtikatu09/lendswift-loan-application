import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { step1Schema } from "../schemas/step1Schema";

import Input from "../components/common/Input";
import RadioGroup from "../components/common/RadioGroup";
import Select from "../components/common/Select";

import {
  LOAN_TYPES,
  LOAN_TENURES,
  LOAN_PURPOSES,
} from "../data/loanOptions";

function Step1LoanType() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      loanType: "",
      loanAmount: undefined,
      loanTenure: "",
      loanPurpose: "",
      referralCode: "",
    },
  });

  const selectedLoanType = watch("loanType");

  const tenureOptions = selectedLoanType
    ? LOAN_TENURES[selectedLoanType].map((month) => ({
        label: `${month} Months`,
        value: String(month),
      }))
    : [];

  const purposeOptions = selectedLoanType
    ? LOAN_PURPOSES[selectedLoanType].map((purpose) => ({
        label: purpose,
        value: purpose,
      }))
    : [];

  const onSubmit = (data) => {
    console.log("Step 1 Data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1 - Loan Details</h2>

      <RadioGroup
        label="Loan Type"
        name="loanType"
        options={LOAN_TYPES}
        register={register}
        error={errors.loanType?.message}
      />

      <Input
        label="Loan Amount"
        id="loanAmount"
        type="number"
        placeholder="Enter Loan Amount"
        error={errors.loanAmount?.message}
        {...register("loanAmount", {
          valueAsNumber: true,
        })}
      />

      <Select
        label="Loan Tenure"
        id="loanTenure"
        name="loanTenure"
        placeholder="Select Loan Tenure"
        options={tenureOptions}
        register={register}
        error={errors.loanTenure?.message}
      />

      <Select
        label="Loan Purpose"
        id="loanPurpose"
        name="loanPurpose"
        placeholder="Select Loan Purpose"
        options={purposeOptions}
        register={register}
        error={errors.loanPurpose?.message}
      />

      <Input
        label="Referral Code (Optional)"
        id="referralCode"
        type="text"
        placeholder="Enter Referral Code"
        error={errors.referralCode?.message}
        {...register("referralCode")}
      />

      <button type="submit">
        Validate Step 1
      </button>
    </form>
  );
}

export default Step1LoanType;