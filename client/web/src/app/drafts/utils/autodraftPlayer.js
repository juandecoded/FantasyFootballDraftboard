export const autodraftPlayer = (playersData, handleDraftPlayer) => {
  if (playersData.length > 0) {
    const randomPlayer = playersData[Math.floor(Math.random() * playersData.length)];
    handleDraftPlayer(randomPlayer.playerId);
  }
};