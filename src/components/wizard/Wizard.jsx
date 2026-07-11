import ProgressBar from "./ProgressBar";
import StepNavigation from "./StepNavigation";

function Wizard() {
  return (
    <div>
      <h2>Loan Application Wizard</h2>

      <ProgressBar />

      <StepNavigation />
    </div>
  );
}

export default Wizard;