const draftService = require('./draftService');
const { validateNewDraft } = require('./draftValidator');

const createDraft = async (req, res, next) => {
  const { error } = validateNewDraft(req.body);
  if (error) {
    console.error('Validation error:', error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const draftId = await draftService.createDraft(req.body);
    res.status(201).json({ draftId, message: 'Draft created successfully' });
  } catch (error) {
    console.error('Error creating draft:', error.message);
    next(error);
  }
};

const getDraft = async (req, res, next) => {
  const { draftId } = req.params;

  try {
    const draft = await draftService.getDraft(draftId);
    res.status(200).json(draft);
  } catch (error) {
    console.error('Error getting draft:', error.message);
    next(error);
  }
}

const draftPlayer = async (req, res, next) => {
  const { draftId, teamId, playerId, pickNumber } = req.body;

  try {
    await draftService.draftPlayer(draftId, teamId, playerId, pickNumber);
    res.status(200).json({ message: 'Player drafted successfully' });
  } catch (error) {
    console.error('Error drafting player:', error.message);
    next(error);
  }
};

// const createdDraft = async (req, res) => {
//   const { draftName, teamCount, pickTimerLength, rosterSettings, teams } = req.body;

//   try {
//     // insert into drafts table
//     const draftResult = await pool.query(
//       'INSERT INTO drafts (draft_name, team_count, pick_timer_length) VALUES ($1, $2, $3) RETURNING id',
//       [draftName, teamCount, pickTimerLength]
//     )

//     const draftId = draftResult.rows[0].id; 

//     // insert roster settings into roster_settings table
//     const rosterSettingsPromise = Object.entries(rosterSettings.positions).map(async ([position, count]) => {
//       return await pool.query(
//         'INSERT INTO roster_settings (draft_id, position, count) VALUES ($1, $2, $3)',
//         [draftId, position, count]
//       )
//     });

//     await Promise.all(rosterSettingsPromise);

//     // insert teams into teams table
//     const teamsPromise = teams.map(async (team) => {
//       return await pool.query(
//         'INSERT INTO teams (draft_id, name, draft_position) VALUES ($1, $2, $3)',
//         [draftId, team.name, team.draftPosition]
//       )
//     });

//     await Promise.all(teamsPromise);

//     res.status(201).json({ draftId, message: 'draft created succesfully ' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// const getDraft = async (req, res) => {
//   const { draftId } = req.params;

//   try {
//     const draftResult = await pool.query(
//       'SELECT * FROM drafts WHERE id = $1',
//       [draftId]
//     );

//     const draftboardResult = await pool.query(
//       'SELECT * FROM draftboards WHERE draft_id = $1',
//       [draftId]
//     );

//     res.status(200).json({ draft: draftResult.rows[0], draftboard: draftboardResult.rows[0] });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

const updateDraft = async (req, res) => {
  const { draftId } = req.params;
  const { draftName, teamCount, pickTimerLength, rosterSettings, teams } = req.body;

  try {
    await pool.query(
      'UPDATE drafts SET draft_name = $1, team_count = $2, pick_timer_length = $3, roster_settings = $4, teams = $5 WHERE id = $6',
      [draftName, teamCount, pickTimerLength, rosterSettings, teams, draftId]
    );

    res.status(200).json({ message: 'Draft updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteDraft = async (req, res) => {
  const { draftId } = req.params;

  try {
    await pool.query(
      'DELETE FROM drafts WHERE id = $1',
      [draftId]
    );

    res.status(200).json({ message: 'Draft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createDraft,
  getDraft,
  updateDraft,
  deleteDraft,
  draftPlayer,
};