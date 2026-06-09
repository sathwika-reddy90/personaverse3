import { RELIABILITY } from "../questions/reliabilityMapping";

export function calculateLayer2Reliability(answers) {
  const consistencyCoverage =
    RELIABILITY.consistencyPairs.filter(
      ([a, b]) =>
        answers[a - 1] != null &&
        answers[b - 1] != null
    ).length /
    RELIABILITY.consistencyPairs.length;

  const socialCoverage =
    RELIABILITY.socialDesirability.filter(
      (id) => answers[id - 1] != null
    ).length /
    RELIABILITY.socialDesirability.length;

  return (
    ((consistencyCoverage + socialCoverage) / 2) * 100
  );
}