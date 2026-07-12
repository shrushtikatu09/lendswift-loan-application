function Step8Review() {
  const handleSubmitApplication = () => {
    alert("Loan Application Submitted Successfully!");
  };

  return (
    <div>
      <h2>Step 8 - Review & Submit</h2>

      <h3>Review Your Application</h3>

      <p>Please review all the information entered in previous steps.</p>

      <ul>
        <li>✓ Loan Details</li>
        <li>✓ Personal Information</li>
        <li>✓ KYC Details</li>
        <li>✓ Address Information</li>
        <li>✓ Employment Details</li>
        <li>✓ Co-Applicant Details</li>
        <li>✓ Documents Uploaded</li>
      </ul>

      <button
        type="button"
        onClick={handleSubmitApplication}
      >
        Submit Loan Application
      </button>
    </div>
  );
}

export default Step8Review;