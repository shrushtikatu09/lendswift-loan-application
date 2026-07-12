import { TOTAL_STEPS } from "../../config/formConfig";

function ProgressBar({ currentStep }) {
  const progressPercentage = Math.round(
    (currentStep / TOTAL_STEPS) * 100
  );

  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "#e5e7eb",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progressPercentage}%`,
            height: "100%",
            backgroundColor: "#2563eb",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <p style={{ marginTop: "10px" }}>
        Step {currentStep} of {TOTAL_STEPS} ({progressPercentage}% Complete)
      </p>
    </div>
  );
}

export default ProgressBar;