import React from "react";

function ResumeModal({
  open,
  onResume,
  onStartFresh,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">

        <h2 className="text-xl font-bold text-slate-900">
          Resume Previous Application
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          We found a saved loan application on this device.
          Would you like to continue where you left off or
          start a brand-new application?
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            type="button"
            onClick={onStartFresh}
            className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-slate-100"
          >
            Start Fresh
          </button>

          <button
            type="button"
            onClick={onResume}
            className="rounded-lg bg-[#1F4E79] px-5 py-2 font-medium text-white hover:bg-[#163A5C]"
          >
            Resume
          </button>

        </div>

      </div>
    </div>
  );
}

export default ResumeModal;