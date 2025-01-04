const fs = require('fs');
const path = require('path');
const pool = require('./db');
const { createPlayer } = require('../features/players/playerModel');

const seedPlayersToDatabase = async () => {
  const client = await pool.connect();
  try {
    const filePath = path.join(__dirname, 'processedPlayerData.json');
    const players = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    await client.query('BEGIN');

    const insertQuery = `
      INSERT INTO players (
        public_id,
        first_name,
        last_name,
        college,
        position,
        pro_team,
        bye_week,
        adp,
        rank,
        season_point_projection,
        status,
        height,
        weight,
        jersey_number,
        age,
        draft_status,
        fantasy_team
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
      )
      ON CONFLICT (first_name, last_name, pro_team, position) DO NOTHING
      RETURNING id
    `;

    for (const player of players) {
      const newPlayer = createPlayer(
        player.first_name,
        player.last_name,
        player.college,
        player.position,
        player.pro_team,
        player.bye_week,
        player.adp,
        player.rank,
        player.season_point_projection,
        player.status,
        player.height,
        player.weight,
        player.jerseyNumber,
        player.age
      ); 

      const values = [
        newPlayer.publicId,
        newPlayer.firstName,
        newPlayer.lastName,
        newPlayer.college,
        newPlayer.position,
        newPlayer.proTeam,
        newPlayer.byeWeek,
        newPlayer.adp,
        newPlayer.rank,
        newPlayer.seasonPointProjection,
        newPlayer.status,
        newPlayer.height,
        newPlayer.weight,
        newPlayer.jerseyNumber,
        newPlayer.age,
        newPlayer.draftStatus,
        newPlayer.fantasyTeam,
      ];

      await client.query(insertQuery, values);
    }

    await client.query('COMMIT');
    console.log('Players seeded into the database');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding players:', error.message);
    throw error;
  } finally {
    client.release();
  }
};

seedPlayersToDatabase();