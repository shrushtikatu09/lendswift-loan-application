import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

function SignaturePad({
  value,
  onChange,
  error,
}) {
  const signatureRef = useRef(null);

  const saveSignature = () => {
    if (!signatureRef.current) return;

    if (signatureRef.current.isEmpty()) {
      onChange(null);
      return;
    }

    const image = signatureRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    onChange(image);
  };

  const clearSignature = () => {
    signatureRef.current?.clear();
    onChange(null);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold">
        E-Signature
      </label>

      <div className="border rounded-lg inline-block">
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 180,
            className: "bg-white",
          }}
          onEnd={saveSignature}
        />
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={clearSignature}
          className="px-4 py-2 rounded bg-red-500 text-white"
        >
          Clear Signature
        </button>
      </div>

      {value && (
        <div className="mt-4">
          <p className="font-medium mb-2">
            Signature Preview
          </p>

          <img
            src={value}
            alt="Signature Preview"
            className="border rounded w-72"
          />
        </div>
      )}

      {error && (
        <p
          className="text-red-600 text-sm mt-2"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default SignaturePad;