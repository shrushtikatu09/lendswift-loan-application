const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const AADHAAR_REGEX = /^\d{12}$/;

const BUSINESS_ENTITY_TYPES = ["P", "C", "F"];

export function validatePAN(pan, loanType) {
  const value = (pan || "").trim().toUpperCase();

  if (!PAN_REGEX.test(value)) {
    return {
      valid: false,
      message: "PAN must be in AAAAA9999A format.",
    };
  }

  const entityType = value[3];

  if (
    (loanType === "personal" || loanType === "home") &&
    entityType !== "P"
  ) {
    return {
      valid: false,
      message:
        "For Personal/Home loans, PAN must belong to an Individual (P).",
    };
  }

  if (
    loanType === "business" &&
    !BUSINESS_ENTITY_TYPES.includes(entityType)
  ) {
    return {
      valid: false,
      message:
        "Business loan PAN must contain P, C or F as the entity type.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

export function validateAadhaar(aadhaar) {
  const value = (aadhaar || "").trim();

  if (!AADHAAR_REGEX.test(value)) {
    return {
      valid: false,
      message: "Aadhaar must contain exactly 12 digits.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}