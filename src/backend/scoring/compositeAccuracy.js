import { COMPOSITES } from "../../questions/compositeMapping";
import { calculateCoverage } from "./coverageUtils";

export function calculateCompositeAccuracy(answers) {
  let total = 0;

  Object.values(COMPOSITES).forEach((composite) => {
    const coverage = calculateCoverage(
      composite.questions,
      answers
    );

    total += coverage * 100;
  });

  return total / Object.keys(COMPOSITES).length;
}