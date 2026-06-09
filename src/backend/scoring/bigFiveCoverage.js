import { BIG_FIVE } from "../questions/bigFiveMapping";
import { calculateCoverage } from "./coverageUtils";

export function calculateBigFiveCoverage(answers) {
  let total = 0;

  Object.values(BIG_FIVE).forEach((questions) => {
    total += calculateCoverage(questions, answers) * 100;
  });

  return total / Object.keys(BIG_FIVE).length;
}