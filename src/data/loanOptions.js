export const LOAN_TYPES = [
  {
    label: "Personal Loan",
    value: "personal",
  },
  {
    label: "Home Loan",
    value: "home",
  },
  {
    label: "Business Loan",
    value: "business",
  },
];

export const LOAN_LIMITS = {
  personal: {
    min: 50000,
    max: 1000000,
  },
  home: {
    min: 50000,
    max: 10000000,
  },
  business: {
    min: 50000,
    max: 5000000,
  },
};

export const LOAN_TENURES = {
  personal: [
    12, 24, 36, 48, 60,
  ],

  home: [
    60, 120, 180, 240, 300, 360,
  ],

  business: [
    12, 24, 36, 48, 60, 72, 84, 96, 108, 120,
  ],
};

export const LOAN_PURPOSES = {
  personal: [
    "Medical Emergency",
    "Education",
    "Travel",
    "Wedding",
    "Other",
  ],

  home: [
    "Purchase House",
    "Construction",
    "Renovation",
    "Balance Transfer",
  ],

  business: [
    "Working Capital",
    "Business Expansion",
    "Machinery Purchase",
    "Inventory",
  ],
};