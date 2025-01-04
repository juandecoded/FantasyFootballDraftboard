const { v4: uuidv4 } = require('uuid');

const createDraft = (draftName, teamCount, pickTimerLength, autoDraft, draftStatus) => ({
  id: uuidv4(),
  publicId: uuidv4(),
  draftName,
  teamCount,
  pickTimerLength,
  autoDraft,
  draftStatus,
  currentlyDrafting: {
    teamId: null,
    round: 1,
    pick: 1,
    overallPickNumber: 1,
  },
  draftOrder: [],
  results: {
    rounds: {},
  },
  teams: {},
  rosterSettings: {},
});

module.exports = {
  createDraft,
};