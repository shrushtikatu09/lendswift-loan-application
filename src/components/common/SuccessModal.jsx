function SuccessModal({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl">
            ✅
          </div>
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold">
          Application Submitted
        </h2>

        <p className="mt-3 text-center text-gray-600">
          Your loan application has been submitted successfully.
        </p>

        <p className="mt-2 text-center text-sm text-gray-500">
          Our team will review your application and contact you soon.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default SuccessModal;