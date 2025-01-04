const pool = require('../../config/db');
const mapKeysToCamelCase = require('../../utils/toCamelCase');

const createTeam = async (draftId, teamName, draftPosition) => {
  const result = await pool.query(
    'INSERT INTO teams (draft_id, name, draft_position) VALUES ($1, $2, $3) RETURNING id',
    [draftId, teamName, draftPosition]
  );
  return result.rows[0].id;
};

const getTeams = async (draftId) => {
  const result = await pool.query(
    'SELECT id AS team_id, name AS team_name, draft_position FROM teams WHERE draft_id = $1 ORDER BY draft_position ASC',
    [draftId]
  );
  return result.rows.map(team => mapKeysToCamelCase(team));
};

const getTeamById = async (teamId) => {
  const result = await pool.query(
    'SELECT * FROM teams WHERE id = $1',
    [teamId]
  );
  const team = mapKeysToCamelCase(result.rows[0]);

  const rosterResult = await pool.query(
    'SELECT * FROM team_rosters WHERE team_id = $1',
    [teamId]
  );
  const roster = mapKeysToCamelCase(rosterResult).rows.reduce((acc, slot) => {
    if (slot.position === 'bench') {
      acc.bench[slot.slot - 1] = slot.playerId;
    } else {
      acc[`${slot.position}${slot.slot}`] = slot.playerId;
    }
    return acc;
  }, { bench: [] });

  return { ...team, roster };
};

const updateTeam = async (teamId, teamName, draftPosition) => {
  await pool.query(
    'UPDATE teams SET name = $1, draft_position = $2 WHERE id = $3',
    [teamName, draftPosition, teamId]
  );
};

const deleteTeam = async (teamId) => {
  await pool.query(
    'DELETE FROM teams WHERE id = $1',
    [teamId]
  );
};

const createTeamRoster = async (teamId, position, slot, playerId) => {
  await pool.query(
    'INSERT INTO team_rosters (team_id, position, slot, player_id) VALUES ($1, $2, $3, $4)',
    [teamId, position, slot, playerId]
  );
};

const getTeamRosterByTeamId = async (teamId) => {
  const result = await pool.query(
    'SELECT * FROM team_rosters WHERE team_id = $1',
    [teamId]
  );
  return result.rows.map(slot => mapKeysToCamelCase(slot));
};

const updateTeamRoster = async (teamId, position, slot, playerId) => {
  await pool.query(
    'UPDATE team_rosters SET player_id = $1 WHERE team_id = $2 AND position = $3 AND slot = $4',
    [playerId, teamId, position, slot]
  );
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  createTeamRoster,
  getTeamRosterByTeamId,
  updateTeamRoster,
};