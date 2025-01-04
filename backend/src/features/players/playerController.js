const playerService = require('./playerService');

const getPlayers = async (req, res, next) => {

  const { sortBy, filterBy, filterValue } = req.query;

  try {
    const players = await playerService.getPlayers(sortBy, filterBy, filterValue);
    res.status(200).json(players);
  } catch (error) {
    console.error('Error getting players:', error.message);
    next(error);
  }
}

module.exports = {
  getPlayers,
}