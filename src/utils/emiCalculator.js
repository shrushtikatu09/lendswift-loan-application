const INTEREST_RATES = {
  personal: 10.5,
  home: 8.5,
  business: 14,
};

export function calculateEMI(
  principal,
  annualRate,
  tenureMonths
) {
  if (!principal || !annualRate || !tenureMonths) {
    return 0;
  }

  const monthlyRate = annualRate / 12 / 100;

  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  return Math.round(emi);
}

export function getInterestRate(loanType) {
  return INTEREST_RATES[loanType] ?? 10.5;
}

export function calculateProcessingFee(amount) {
  if (!amount) return 0;

  const fee = amount * 0.01;

  return Math.min(Math.max(fee, 2000), 25000);
}

export function calculateTotalInterest(
  emi,
  tenureMonths,
  principal
) {
  if (!emi || !tenureMonths || !principal) {
    return 0;
  }

  return emi * tenureMonths - principal;
}

export function calculateTotalAmount(
  emi,
  tenureMonths
) {
  if (!emi || !tenureMonths) {
    return 0;
  }

  return emi * tenureMonths;
}