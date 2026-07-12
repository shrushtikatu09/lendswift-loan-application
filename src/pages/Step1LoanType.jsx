import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "../schemas/step1Schema";

function Step1LoanType() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Step 1 - Loan Type Selection</h3>

      <div>
        <label>Loan Type</label>
        <br />

        <input
          type="radio"
          value="Personal"
          {...register("loanType")}
        />
        Personal

        <input
          type="radio"
          value="Home"
          {...register("loanType")}
        />
        Home

        <input
          type="radio"
          value="Business"
          {...register("loanType")}
        />
        Business

        <p>{errors.loanType?.message}</p>
      </div>

      <br />

      <div>
        <label>Loan Amount</label>
        <br />

        <input
          type="number"
          placeholder="Enter Amount"
          {...register("loanAmount", { valueAsNumber: true })}
        />

        <p>{errors.loanAmount?.message}</p>
      </div>

      <br />

      <button type="submit">Validate Step 1</button>
    </form>
  );
}

export default Step1LoanType;