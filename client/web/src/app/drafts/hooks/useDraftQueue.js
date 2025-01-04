import { useState, useEffect } from 'react';

export const useDraftQueue = (teamsArr, currentlyDrafting, teams) => {
  const [draftQueue, setDraftQueue] = useState({});

  const getNextTeamId = (pickNumber, roundNumber) => {
    const index = pickNumber - 1;
    const isEvenRound = roundNumber % 2 === 0;
    const adjustedIndex = isEvenRound ? teamsArr.length - 1 - index : index;
    return teamsArr[adjustedIndex]?.teamId;
  };

  const updateDraftQueue = (nextTeamId, nextPick, nextRound) => {
    const totalTeams = teamsArr.length;

    const onDeckPick = nextPick + 1 > totalTeams ? 1 : nextPick + 1;
    const onDeckRound = nextPick + 1 > totalTeams ? nextRound + 1 : nextRound;
    const onDeckTeamId = getNextTeamId(onDeckPick, onDeckRound);

    const afterPick = onDeckPick + 1 > totalTeams ? 1 : onDeckPick + 1;
    const afterRound = onDeckPick + 1 > totalTeams ? onDeckRound + 1 : onDeckRound;
    const afterTeamId = getNextTeamId(afterPick, afterRound);

    setDraftQueue({
      currentTeamName: teams[nextTeamId]?.teamName || 'Unknown Team',
      upNext: teams[onDeckTeamId]?.teamName || 'Unknown Team',
      onDeck: teams[afterTeamId]?.teamName || 'Unknown Team',
      after: teams[getNextTeamId(afterPick + 1, afterRound)]?.teamName || 'Unknown Team',
    });
  };

  useEffect(() => {
    updateDraftQueue(currentlyDrafting.teamId, currentlyDrafting.pick, currentlyDrafting.round);
  }, [currentlyDrafting, teams]);

  return draftQueue;
};