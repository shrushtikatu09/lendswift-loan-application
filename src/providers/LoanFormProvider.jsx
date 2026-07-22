import { FormProvider } from "react-hook-form";
import { useLoanForm } from "../hooks/useLoanForm";

function LoanFormProvider({ children }) {
  const methods = useLoanForm();

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
}

export default LoanFormProvider;