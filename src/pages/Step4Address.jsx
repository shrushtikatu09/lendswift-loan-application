import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Select from "../components/common/Select";

import { ADDRESS_TYPES } from "../data/addressOptions";
import { usePinLookup } from "../hooks/usePinLookup";

function Step4Address() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const pinCode = watch("pinCode");

  const {
    lookupPin,
    loading,
    lookupError,
  } = usePinLookup();

  useEffect(() => {
    async function fetchAddress() {
      if (pinCode?.length !== 6) return;

      const result = await lookupPin(pinCode);

      if (!result) return;

      setValue("city", result.city);
      setValue("state", result.state);
    }

    fetchAddress();
  }, [pinCode, lookupPin, setValue]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Step 4 - Address Information
      </h2>

      <Input
        label="Address Line 1"
        id="addressLine1"
        placeholder="Enter Address Line 1"
        error={errors.addressLine1?.message}
        {...register("addressLine1")}
      />

      <Input
        label="Address Line 2 (Optional)"
        id="addressLine2"
        placeholder="Enter Address Line 2"
        error={errors.addressLine2?.message}
        {...register("addressLine2")}
      />

      <Input
        label="PIN Code"
        id="pinCode"
        placeholder="Enter 6-digit PIN Code"
        error={errors.pinCode?.message}
        {...register("pinCode")}
      />

      {loading && (
        <p className="text-blue-600 text-sm">
          Fetching address...
        </p>
      )}

      {lookupError && (
        <p className="text-red-600 text-sm">
          {lookupError}
        </p>
      )}

      <Input
        label="City"
        id="city"
        placeholder="City"
        error={errors.city?.message}
        {...register("city")}
      />

      <Input
        label="State"
        id="state"
        placeholder="State"
        error={errors.state?.message}
        {...register("state")}
      />

      <Select
        label="Address Type"
        id="addressType"
        name="addressType"
        register={register}
        options={ADDRESS_TYPES}
        placeholder="Select Address Type"
        error={errors.addressType?.message}
      />
    </div>
  );
}

export default Step4Address;
