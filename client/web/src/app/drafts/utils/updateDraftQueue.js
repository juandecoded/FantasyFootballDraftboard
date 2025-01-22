export const updateDraftQueue = (nextTeamId, nextPick, nextRound, teamsArr, teams, getNextTeamId) => {
  const totalTeams = teamsArr.length;

  const onDeckPick = nextPick + 1 > totalTeams ? 1 : nextPick + 1;
  const onDeckRound = nextPick + 1 > totalTeams ? nextRound + 1 : nextRound;
  const onDeckTeamId = getNextTeamId(onDeckPick, onDeckRound, teamsArr);

  const afterPick = onDeckPick + 1 > totalTeams ? 1 : onDeckPick + 1;
  const afterRound = onDeckPick + 1 > totalTeams ? onDeckRound + 1 : onDeckRound;
  const afterTeamId = getNextTeamId(afterPick, afterRound, teamsArr);

  return {
    currentTeamName: teams[nextTeamId]?.teamName || 'Unknown Team',
    upNext: teams[onDeckTeamId]?.teamName || 'Unknown Team',
    onDeck: teams[afterTeamId]?.teamName || 'Unknown Team',
    after: teams[getNextTeamId(afterPick + 1, afterRound, teamsArr)]?.teamName || 'Unknown Team',
  };
};