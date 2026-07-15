import {
  calculateEMI,
  calculateProcessingFee,
  calculateTotalAmount,
  calculateTotalInterest,
  getInterestRate,
} from "../../utils/emiCalculator";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

function EMISummaryCard({
  loanType,
  loanAmount,
  loanTenure,
}) {
  const principal = Number(loanAmount) || 0;
  const tenure = Number(loanTenure) || 0;

  const interestRate = getInterestRate(loanType);

  const emi = calculateEMI(
    principal,
    interestRate,
    tenure
  );

  const processingFee =
    calculateProcessingFee(principal);

  const totalInterest =
    calculateTotalInterest(
      emi,
      tenure,
      principal
    );

  const totalRepayment =
    calculateTotalAmount(
      emi,
      tenure
    );

  const summary = [
    {
      label: "Loan Type",
      value: loanType || "—",
    },
    {
      label: "Loan Amount",
      value: formatCurrency(principal),
    },
    {
      label: "Interest Rate",
      value: `${interestRate}%`,
    },
    {
      label: "Loan Tenure",
      value: `${tenure} Months`,
    },
    {
      label: "Monthly EMI",
      value: formatCurrency(emi),
    },
    {
      label: "Processing Fee",
      value: formatCurrency(processingFee),
    },
    {
      label: "Total Interest",
      value: formatCurrency(totalInterest),
    },
    {
      label: "Total Repayment",
      value: formatCurrency(totalRepayment),
    },
  ];

  return (
    <div className="border rounded-lg shadow-sm p-5 mb-6 bg-white">

      <h3 className="text-xl font-semibold mb-4 border-b pb-2">
        EMI Summary
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {summary.map((item) => (
          <div
            key={item.label}
            className="border rounded p-3"
          >
            <p className="text-sm text-gray-500">
              {item.label}
            </p>

            <p className="font-semibold mt-1">
              {item.value}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default EMISummaryCard;