export const updateTeamRoster = (teamRoster, draftedPlayer, rosterSettings) => {
  const position = draftedPlayer.position.toLowerCase();
  const positionCount = rosterSettings.positions[position] || 0;

  let assigned = false;
  for (let i = 1; i <= positionCount; i++) {
    const posKey = `${position}${i}`;
    if (!teamRoster[posKey]) {
      teamRoster[posKey] = draftedPlayer;
      assigned = true;
      break;
    }
  }

  if (!assigned && rosterSettings.positions.flex) {
    for (let i = 1; i <= rosterSettings.positions.flex; i++) {
      const posKey = `flex${i}`;
      if (!teamRoster[posKey]) {
        teamRoster[posKey] = draftedPlayer;
        assigned = true;
        break;
      }
    }
  }

  if (!assigned) {
    teamRoster.bench.push(draftedPlayer);
  }

  return teamRoster;
};