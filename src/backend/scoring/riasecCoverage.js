import { RIASEC } from "../../questions/riasecMapping";
import { calculateCoverage } from "./coverageUtils";

export function calculateRiasecCoverage(answers) {
  let total = 0;

  Object.values(RIASEC).forEach((questions) => {
    total += calculateCoverage(questions, answers) * 100;
  });

  return total / Object.keys(RIASEC).length;
}