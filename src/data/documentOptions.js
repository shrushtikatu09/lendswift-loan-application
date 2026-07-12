export const DOCUMENT_TYPES = [
  {
    label: "PAN Card",
    value: "panCard",
  },
  {
    label: "Aadhaar Card",
    value: "aadhaarCard",
  },
  {
    label: "Salary Slip",
    value: "salarySlip",
  },
  {
    label: "Bank Statement",
    value: "bankStatement",
  },
];

export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB