import { useState, useCallback } from "react";

export function usePinLookup() {
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");

  const lookupPin = useCallback(async (pinCode) => {
    setLookupError("");

    if (!/^\d{6}$/.test(pinCode)) {
      return null;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pinCode}`
      );

      const data = await response.json();

      if (
        !data ||
        data[0].Status !== "Success" ||
        !data[0].PostOffice?.length
      ) {
        setLookupError("Invalid PIN Code.");
        return null;
      }

      const office = data[0].PostOffice[0];

      return {
        city: office.District,
        state: office.State,
      };
    } catch (error) {
      console.error(error);

      setLookupError(
        "Unable to fetch address details. Please try again."
      );

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    lookupPin,
    loading,
    lookupError,
  };
}