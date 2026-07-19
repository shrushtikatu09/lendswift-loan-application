import { useMemo } from "react";

function SuccessModal({
  open,
  onClose,
  applicationData = {},
}) {
  const referenceNumber = useMemo(() => {
    return `LS-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
  }, []);

  if (!open) return null;

  const {
    fullName,
    loanType,
    loanAmount,
  } = applicationData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="border-b bg-green-50 px-8 py-6 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl">
            ✅
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Application Submitted Successfully
          </h2>

          <p className="mt-2 text-gray-600">
            Your loan application has been received successfully.
          </p>

        </div>

        {/* Summary */}
        <div className="space-y-4 px-8 py-6">

          <div className="rounded-xl border bg-gray-50 p-4">

            <h3 className="mb-4 text-lg font-semibold text-[#1F4E79]">
              Application Summary
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Reference Number
                </span>

                <span className="font-semibold text-[#1F4E79]">
                  {referenceNumber}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Applicant
                </span>

                <span className="font-medium">
                  {fullName || "--"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Loan Type
                </span>

                <span className="font-medium">
                  {loanType || "--"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Loan Amount
                </span>

                <span className="font-semibold">
                  ₹
                  {Number(
                    loanAmount || 0
                  ).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Date
                </span>

                <span>
                  {new Date().toLocaleDateString("en-IN")}
                </span>
              </div>

            </div>

          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            Our loan team will verify your application and contact you shortly after reviewing your documents.
          </div>

        </div>

        {/* Footer */}
        <div className="border-t px-8 py-5">

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-[#1F4E79] py-3 font-semibold text-white transition hover:bg-[#163A5C]"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

export default SuccessModal;