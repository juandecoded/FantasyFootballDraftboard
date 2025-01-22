export const getNextTeamId = (pickNumber, roundNumber, teamsArr) => {
  const index = pickNumber - 1;
  const adjustedIndex = (roundNumber % 2 === 0) ? teamsArr.length - 1 - index : index;

  return (adjustedIndex >= 0 && adjustedIndex < teamsArr.length) ? teamsArr[adjustedIndex]?.teamId || null : null;
};