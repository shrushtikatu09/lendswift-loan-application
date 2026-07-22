import Checkbox from "../common/Checkbox";

function ConsentSection({
  register,
  errors,
}) {
  return (
    <div className="border rounded-lg shadow-sm p-5 mb-6 bg-white">

      <h3 className="text-xl font-semibold mb-4 border-b pb-2">
        Final Declaration & Consents
      </h3>

      <Checkbox
        id="declarationConsent"
        name="declarationConsent"
        register={register}
        label="I declare that all information provided in this loan application is true and accurate."
        error={errors.declarationConsent?.message}
      />

      <Checkbox
        id="creditCheckConsent"
        name="creditCheckConsent"
        register={register}
        label="I authorize the lender to perform credit bureau verification."
        error={errors.creditCheckConsent?.message}
      />

      <Checkbox
        id="termsConsent"
        name="termsConsent"
        register={register}
        label="I have read and agree to the Terms & Conditions."
        error={errors.termsConsent?.message}
      />

      <Checkbox
        id="communicationConsent"
        name="communicationConsent"
        register={register}
        label="I agree to receive loan related communication through SMS, Email and Phone."
        error={errors.communicationConsent?.message}
      />

    </div>
  );
}

export default ConsentSection;