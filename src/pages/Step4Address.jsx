import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Checkbox from "../components/common/Checkbox";

import { ADDRESS_TYPES } from "../data/addressOptions";
import { usePinLookup } from "../hooks/usePinLookup";

function Step4Address() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  // =========================
  // Current Address
  // =========================

  const pinCode = watch("pinCode");

  // =========================
  // Permanent Address
  // =========================

  const permanentPinCode = watch("permanentPinCode");
  const sameAsCurrentAddress = watch("sameAsCurrentAddress");

  const addressLine1 = watch("addressLine1");
  const addressLine2 = watch("addressLine2");
  const city = watch("city");
  const state = watch("state");

  // =========================
  // Current PIN Lookup
  // =========================

  const {
    lookupPin,
    loading,
    lookupError,
  } = usePinLookup();

  // =========================
  // Permanent PIN Lookup
  // =========================

  const {
    lookupPin: lookupPermanentPin,
    loading: permanentLoading,
    lookupError: permanentLookupError,
  } = usePinLookup();

  // =========================
  // Current Address Lookup
  // =========================

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

  // =========================
  // Permanent Address Lookup
  // =========================

  useEffect(() => {
    if (sameAsCurrentAddress) return;

    async function fetchPermanentAddress() {
      if (permanentPinCode?.length !== 6) return;

      const result =
        await lookupPermanentPin(permanentPinCode);

      if (!result) return;

      setValue("permanentCity", result.city);

      setValue("permanentState", result.state);
    }

    fetchPermanentAddress();
  }, [
    permanentPinCode,
    sameAsCurrentAddress,
    lookupPermanentPin,
    setValue,
  ]);

  // =========================
  // Copy Current -> Permanent
  // =========================

  useEffect(() => {
    if (!sameAsCurrentAddress) return;

    setValue(
      "permanentAddressLine1",
      addressLine1
    );

    setValue(
      "permanentAddressLine2",
      addressLine2
    );

    setValue("permanentCity", city);

    setValue("permanentState", state);

    setValue("permanentPinCode", pinCode);
  }, [
    sameAsCurrentAddress,
    addressLine1,
    addressLine2,
    city,
    state,
    pinCode,
    setValue,
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Step 4 - Address Information
      </h2>

      <h3 className="text-lg font-semibold">
        Current Address
      </h3>

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
        <p className="text-sm text-blue-600">
          Fetching address...
        </p>
      )}

      {lookupError && (
        <p className="text-sm text-red-600">
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

      <Checkbox
        id="sameAsCurrentAddress"
        name="sameAsCurrentAddress"
        label="Permanent Address is same as Current Address"
        register={register}
      />
            {!sameAsCurrentAddress && (
        <>
          <h3 className="mt-8 text-lg font-semibold">
            Permanent Address
          </h3>

          <Input
            label="Permanent Address Line 1"
            id="permanentAddressLine1"
            placeholder="Enter Permanent Address Line 1"
            error={
              errors.permanentAddressLine1?.message
            }
            {...register("permanentAddressLine1")}
          />

          <Input
            label="Permanent Address Line 2 (Optional)"
            id="permanentAddressLine2"
            placeholder="Enter Permanent Address Line 2"
            error={
              errors.permanentAddressLine2?.message
            }
            {...register("permanentAddressLine2")}
          />

          <Input
            label="Permanent PIN Code"
            id="permanentPinCode"
            placeholder="Enter Permanent PIN Code"
            error={
              errors.permanentPinCode?.message
            }
            {...register("permanentPinCode")}
          />

          {permanentLoading && (
            <p className="text-sm text-blue-600">
              Fetching permanent address...
            </p>
          )}

          {permanentLookupError && (
            <p className="text-sm text-red-600">
              {permanentLookupError}
            </p>
          )}

          <Input
            label="Permanent City"
            id="permanentCity"
            placeholder="Permanent City"
            error={errors.permanentCity?.message}
            {...register("permanentCity")}
          />

          <Input
            label="Permanent State"
            id="permanentState"
            placeholder="Permanent State"
            error={errors.permanentState?.message}
            {...register("permanentState")}
          />
        </>
      )}
    </div>
  );
}

export default Step4Address;
