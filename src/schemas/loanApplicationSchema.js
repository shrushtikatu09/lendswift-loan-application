import { z } from "zod";

import { step1Schema } from "./step1Schema";
import { step2Schema } from "./step2Schema";
import { step3Schema } from "./step3Schema";
import { step4Schema } from "./step4Schema";
import { step5Schema } from "./step5Schema";
import { step6Schema } from "./step6Schema";
import { step7Schema } from "./step7Schema";

// Zod schemas containing .superRefine() cannot be merged using .merge().
// Therefore we compose the master schema using intersections.

export const loanApplicationSchema = z.intersection(
  z.intersection(
    z.intersection(
      z.intersection(
        z.intersection(
          z.intersection(
            step1Schema,
            step2Schema
          ),
          step3Schema
        ),
        step4Schema
      ),
      step5Schema
    ),
    step6Schema
  ),
  step7Schema
);