// const pool = require('../../config/db');

// const createDraft = async (draftName, teamCount, pickTimerLength, autoDraft, draftStatus) => {
//   const result = await pool.query(
//     'INSERT INTO drafts (draft_name, team_count, pick_timer_length, auto_draft, draft_status) VALUES ($1, $2, $3, $4, $5) RETURNING id',
//     [draftName, teamCount, pickTimerLength, autoDraft, draftStatus]
//   );
//   return result.rows[0].id;
// };

// const createRosterSettings = async (draftId, position, count) => {
//   const result = await pool.query(
//     'INSERT INTO roster_settings (draft_id, position, count) VALUES ($1, $2, $3)',
//     [draftId, position, count]
//   );
// };

// const createTeamRoster = async (teamId, roster) => {
//   const rosterPromises = [];

//   for (const [position, count] of Object.entries(roster)) {
//     if (Array.isArray(count)) {
//       count.forEach((_, index) => {
//         rosterPromises.push(
//           pool.query(
//             'INSERT INTO team_rosters (team_id, position, slot) VALUEs ($1, $2, $3)',
//             [teamId, position, index + 1]
//           ))
//       })
//     } else {
//       rosterPromises.push(
//         pool.query(
//           'INSERT INTO team_rosters (team_id, postion, slot) VALUES ($1, $2, $3)',
//           [teamId, position, 1]
//       ))
//     }
//   }

//   await Promise.all(rosterPromises);
// }

// const createTeam = async (draftId, teamName, draftPosition, roster) => {

//   const result = await pool.query(
//     'INSERT INTO teams (draft_id, name, draft_position) VALUES ($1, $2, $3)',
//     [draftId, teamName, draftPosition]
//   );
//   const teamId = result.rows[0].id;
//   await createTeamRoster(teamId, roster);
  
//   return result.rows[0].id;
// };

// const getDraftById = async (draftId) => {
//   const result = await pool.query(
//     'SELECT * FROM drafts WHERE id = $1',
//     [draftId]
//   );
//   return result.rows[0];
// }

// const getRosterSettings = async (draftId) => {
//   const result = await pool.query(
//     'SELECT position, count FROM roster_settings WHERE draft_id = $1',
//     [draftId]
//   );
//   const positions = {};
//   result.rows.forEach(row => {
//     positions[row.position] = row.count;
//   });
//   return { positions };
// }

// const getTeams = async (draftId) => {
//   const result = await pool.query(
//     'SELECT id AS team_id, name AS team_name, draft_position FROM teams WHERE draft_id = $1 ORDER BY draft_position ASC',
//     [draftId]
//   );
//   return result.rows;
// }

// module.exports = {
//   createDraft,
//   createRosterSettings,
//   createTeam,
//   getDraftById,
//   getRosterSettings,
//   getTeams,
// };

const pool = require('../../config/db');
const mapKeysToCamelCase = require('../../utils/toCamelCase');

const createDraft = async (draftName, teamCount, pickTimerLength) => {
  const result = await pool.query(
    'INSERT INTO drafts (draft_name, team_count, pick_timer_length) VALUES ($1, $2, $3) RETURNING id',
    [draftName, teamCount, pickTimerLength]
  );
  return result.rows[0].id;
};

const getDraft = async (draftId) => {
  const result = await pool.query(
    'SELECT * FROM drafts WHERE id = $1',
    [draftId]
  );
  console.log('draft repository getDraft returns:', result.rows[0]);
  return result.rows[0];
};

const updateDraft = async (draftId, draftName, teamCount, pickTimerLength) => {
  await pool.query(
    'UPDATE drafts SET draft_name = $1, team_count = $2, pick_timer_length = $3 WHERE id = $6',
    [draftName, teamCount, pickTimerLength, draftId]
  );
};

const deleteDraft = async (draftId) => {
  await pool.query(
    'DELETE FROM drafts WHERE id = $1',
    [draftId]
  );
};

const createRosterSettings = async (draftId, position, count) => {
  await pool.query(
    'INSERT INTO roster_settings (draft_id, position, count) VALUES ($1, $2, $3)',
    [draftId, position, count]
  );
};

const getRosterSettingsByDraftId = async (draftId) => {
  const result = await pool.query(
    'SELECT position, count FROM roster_settings WHERE draft_id = $1',
    [draftId]
  );
  const positions = {};
  result.rows.forEach(row => {
    const camelCaseRow = mapKeysToCamelCase(row);
    positions[camelCaseRow.position] = camelCaseRow.count;
  });
  return { positions };
};

const updateRosterSettings = async (draftId, position, count) => {
  await pool.query(
    'UPDATE roster_settings SET count = $1 WHERE draft_id = $2 AND position = $3',
    [count, draftId, position]
  );
};

const addDraftPick = async (draftId, teamId, playerId, pickNumber, roundNumber) => {
  await pool.query(
    'INSERT INTO draft_picks (draft_id, team_id, player_id, pick_number, round_number) VALUES ($1, $2, $3, $4, $5)',
    [draftId, teamId, playerId, pickNumber, roundNumber]
  );
};

const getDraftPlayer = async (draftId, playerId) => {
  const result = await pool.query(
    'SELECT * FROM draft_picks WHERE draft_id = $1 AND player_id = $2',
    [draftId, playerId]
  );
  return result.rows[0];
};


module.exports = {
  createDraft,
  getDraft,
  updateDraft,
  deleteDraft,
  createRosterSettings,
  getRosterSettingsByDraftId,
  updateRosterSettings,
  addDraftPick,
  getDraftPlayer,
};