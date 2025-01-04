// processPlayerData.js
const fs = require('fs');
const path = require('path');

// Process player data and save to processedPlayerData.json
const processPlayerData = () => {
  try {
    const filePath = path.join(__dirname, 'playerData.json');
    const playersData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const playersArray = Object.values(playersData);

    const processedPlayers = playersArray
      .filter(player => player.active && player.team)
      .map((player) => ({
      first_name: player.first_name || null,
      last_name: player.last_name || null,
      college: player.college || null,
      draft_status: null,
      position: player.position || '',
      pro_team: player.team || '',
      status: player.status || '',
      bye_week: player.bye_week || null,
      adp: player.adp || null,
      season_point_projection: player.season_point_projection || null,
      fantasy_team: null,
      rank: player.search_rank || null,
      height: player.height || null,
      weight: player.weight || null,
      jerseyNumber: player.number || null,
      age: player.age || null
    }));

    const processedFilePath = path.join(__dirname, 'processedPlayerData.json');
    fs.writeFileSync(processedFilePath, JSON.stringify(processedPlayers, null, 2));
    console.log(`Processed ${processedPlayers.length} players and saved to processedPlayerData.json`);
  } catch (error) {
    console.error('Error processing player data:', error);
  }
};

processPlayerData();