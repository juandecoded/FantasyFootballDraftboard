export const processPlayerData = (players) => {
  return players.map(player => ({
    playerId: player.id,
    firstName: player.firstName,
    lastName: player.lastName,
    position: player.position,
    proTeam: player.proTeam,
    byeWeek: player.byeWeek,
    draftStatus: player.draftStatus,
    fantasyTeam: player.fantasyTeam,
  }));
};