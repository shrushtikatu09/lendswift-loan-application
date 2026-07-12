import { z } from "zod";

import { step1Schema } from "./step1Schema";
import { step2Schema } from "./step2Schema";
import { step3Schema } from "./step3Schema";
import { step4Schema } from "./step4Schema";
import { step5Schema } from "./step5Schema";
import { step6Schema } from "./step6Schema";
import { step7Schema } from "./step7Schema";

export const loanApplicationSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema);