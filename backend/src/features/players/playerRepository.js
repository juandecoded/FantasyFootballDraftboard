const pool = require('../../config/db');
const mapKeysToCamelCase = require('../../utils/toCamelCase');

const createPlayer = async (firstName, lastName, college, position, proTeam, byeWeek, rank, adp, seasonPointProjection, status, height, weight, jerseyNumber, age, draftStatus, fantasyTeam) => {
  const result = await pool.query(
    'INSERT INTO players (first_name, last_name, college, position, pro_team, bye_week, rank, adp, season_point_projection, status, height, weight, jersey_number, age, draft_status, fantasy_team) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id',
    [firstName, lastName, college, position, proTeam, byeWeek, rank, adp, seasonPointProjection, status, height, weight, jerseyNumber, age, draftStatus, fantasyTeam]
  );
  return result.rows[0].id;
};

const getAllPlayers = async () => {
  const result = await pool.query(
    'SELECt * FROM players'
  )
  return result.rows.map(player => mapKeysToCamelCase(player));
}

const getPlayerById = async (playerId) => {
  const result = await pool.query(
    'SELECT * FROM players WHERE id = $1',
    [playerId]
  );
  return mapKeysToCamelCase(result.rows[0]);
};

const updatePlayer = async (playerId, firstName, lastName, college, position, proTeam, byeWeek, rank, adp, seasonPointProjection, status, height, weight, jerseyNumber, age, draftStatus, fantasyTeam) => {
  await pool.query(
    'UPDATE players SET first_name = $1, last_name = $2, college = $3, position = $4, pro_team = $5, bye_week = $6, rank = $7, adp = $8, season_point_projection = $9, status = $10, height = $11, weight = $12, jersey_number = $13, age = $14, draft_status = $15, fantasy_team = $16 WHERE id = $17',
    [firstName, lastName, college, position, proTeam, byeWeek, rank, adp, seasonPointProjection, status, height, weight, jerseyNumber, age, draftStatus, fantasyTeam, playerId]
  );
};

const deletePlayer = async (playerId) => {
  await pool.query(
    'DELETE FROM players WHERE id = $1',
    [playerId]
  );
};

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
};