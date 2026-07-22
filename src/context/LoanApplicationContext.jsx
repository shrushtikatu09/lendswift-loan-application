import { createContext, useContext, useState } from "react";

const LoanApplicationContext = createContext(null);

export function LoanApplicationProvider({ children }) {
  const [applicationData, setApplicationData] = useState({});

  const updateApplicationData = (stepData) => {
    setApplicationData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  return (
    <LoanApplicationContext.Provider
      value={{
        applicationData,
        updateApplicationData,
      }}
    >
      {children}
    </LoanApplicationContext.Provider>
  );
}

export function useLoanApplication() {
  const context = useContext(LoanApplicationContext);

  if (!context) {
    throw new Error(
      "useLoanApplication must be used inside LoanApplicationProvider"
    );
  }

  return context;
}