// fetch player data from Sleeper API and save to playerData.json ! only run once manually
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const fetchPlayerData = async () => {
  try {
    const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
    const playerData = response.data;
    const filePath = path.join(__dirname, 'playerData.json');
    fs.writeFileSync(filePath, JSON.stringify(playerData, null, 2));
    console.log('Player data saved to playerData.json');
  } catch (error) {
    console.error('Error fetching player data:', error);
  }
};

fetchPlayerData();