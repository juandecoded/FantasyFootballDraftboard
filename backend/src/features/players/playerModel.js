const { v4: uuidv4 } = require('uuid');

const createPlayer = (firstName, lastName, college, position, proTeam, byeWeek, adp, rank, seasonPointProjection, status, height, weight, jerseyNumber, age) => ({
  id: uuidv4(),
  publicId: uuidv4(),
  firstName,
  lastName,
  college,
  position,
  proTeam,
  byeWeek,
  adp,
  rank,
  seasonPointProjection,
  status,
  height,
  weight,
  jerseyNumber,
  age,
  draftStatus: 'undrafted',
  fantasyTeam: null,
});

module.exports = {
  createPlayer,
};