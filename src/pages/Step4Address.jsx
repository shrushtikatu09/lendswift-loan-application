import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Select from "../components/common/Select";

import { ADDRESS_TYPES } from "../data/addressOptions";

function Step4Address() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2>Step 4 - Address Information</h2>

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
        label="City"
        id="city"
        placeholder="Enter City"
        error={errors.city?.message}
        {...register("city")}
      />

      <Input
        label="State"
        id="state"
        placeholder="Enter State"
        error={errors.state?.message}
        {...register("state")}
      />

      <Input
        label="PIN Code"
        id="pinCode"
        placeholder="Enter 6-digit PIN Code"
        error={errors.pinCode?.message}
        {...register("pinCode")}
      />

      <Select
        label="Address Type"
        id="addressType"
        name="addressType"
        placeholder="Select Address Type"
        register={register}
        options={ADDRESS_TYPES}
        error={errors.addressType?.message}
      />
    </div>
  );
}

export default Step4Address;
