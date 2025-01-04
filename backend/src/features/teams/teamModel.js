const { v4: uuidv4 } = require('uuid');

const createTeam = (draftId, teamName, draftPosition) => ({
  id: uuidv4(),
  publicId: uuidv4(),
  draftId,
  teamName,
  draftPosition,
  roster: {
    qb: [],
    rb: [],
    wr: [],
    te: [],
    flex: [],
    k: [],
    def: [],
    bench: [],
  },
});

const createRoster = (teamId, position, slot, playerId) => ({
  teamId,
  position,
  slot,
  playerId,
});




module.exports = {
  createTeam,
  createRoster,
};