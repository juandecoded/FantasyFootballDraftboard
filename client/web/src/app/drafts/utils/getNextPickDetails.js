export const getNextPickDetails = (currentPick, currentRound, overallPickNumber, totalTeams) => {
  let nextPick = currentPick + 1;
  let nextRound = currentRound;
  let nextOverallPickNumber = overallPickNumber + 1;

  if (nextPick > totalTeams) {
    nextRound += 1;
    nextPick = 1;
  }

  return { nextPick, nextRound, nextOverallPickNumber };
};