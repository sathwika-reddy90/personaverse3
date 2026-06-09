export function calculateCoverage(questionIds, answers) {
    if (!questionIds.length) return 0;
  
    const answered = questionIds.filter(
      (id) => answers[id - 1] != null
    ).length;
  
    return answered / questionIds.length;
  }