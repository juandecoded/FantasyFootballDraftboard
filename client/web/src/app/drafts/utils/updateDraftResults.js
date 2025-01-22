export const updateDraftResults = (draftResults, currentRound, currentPick, draftedPlayer) => {
  const updatedDraftResults = { ...draftResults };

  if (!updatedDraftResults.rounds[currentRound]) {
    updatedDraftResults.rounds[currentRound] = {};
  }
  updatedDraftResults.rounds[currentRound][currentPick] = draftedPlayer;

  return updatedDraftResults;
};