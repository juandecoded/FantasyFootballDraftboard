const playerRepository = require('./playerRepository');

const getPlayers = async (sortBy, filterBy, filterValue) => {
  console.log('Getting players with sortBy:', sortBy, 'filterBy:', filterBy, 'filterValue:', filterValue);

  let players = await playerRepository.getAllPlayers();

  if (filterBy && filterValue) {
    players = players.filter(player => player[filterBy] === filterValue);
  }

  if (sortBy) {
    players.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
  }
  console.log('returning players')

  return players;
}

module.exports = {
  getPlayers,
}