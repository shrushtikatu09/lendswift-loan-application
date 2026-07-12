import { createContext, useContext } from "react";

const FormContext = createContext();

export function FormProvider({ children, value }) {
  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}

export function useLoanForm() {
  return useContext(FormContext);
}