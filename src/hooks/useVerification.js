import { useState } from "react";

export function useVerification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const verify = async (validator, value) => {
    setError("");
    setIsVerified(false);

    const result = validator(value);

    if (!result.valid) {
      setError(result.message);
      return false;
    }

    setIsVerifying(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    setIsVerifying(false);
    setIsVerified(true);

    return true;
  };

  const resetVerification = () => {
    setError("");
    setIsVerified(false);
    setIsVerifying(false);
  };

  return {
    verify,
    resetVerification,
    isVerifying,
    isVerified,
    error,
  };
}