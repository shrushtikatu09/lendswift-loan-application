import { step1Schema } from "./step1Schema";
import { step2Schema } from "./step2Schema";
import { step3Schema } from "./step3Schema";
import { step4Schema } from "./step4Schema";
import { step5Schema } from "./step5Schema";
import { step6Schema } from "./step6Schema";
import { step7Schema } from "./step7Schema";
import { loanApplicationSchema } from "./loanApplicationSchema";

const STEP_SCHEMAS = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
  4: step4Schema,
  5: step5Schema,
  6: step6Schema,
  7: step7Schema,
};

export function getStepSchema(step) {
  return STEP_SCHEMAS[step] ?? loanApplicationSchema;
}

export function getLoanApplicationSchema() {
  return loanApplicationSchema;
}

export function hasStepSchema(step) {
  return Object.prototype.hasOwnProperty.call(STEP_SCHEMAS, step);
}

export const stepSchemas = STEP_SCHEMAS;