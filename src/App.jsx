import "./App.css";

import Wizard from "./components/wizard/Wizard";
import LoanFormProvider from "./providers/LoanFormProvider";

function App() {
  return (
    <LoanFormProvider>
      <div className="app">
        <Wizard />
      </div>
    </LoanFormProvider>
  );
}

export default App;