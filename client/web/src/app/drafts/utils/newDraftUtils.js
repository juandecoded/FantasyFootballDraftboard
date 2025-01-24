export const defaultRosterSettings = {
  positions: {
    qb: 1,
    rb: 2,
    wr: 2,
    te: 1,
    flex: 1, // can only be wr, rb, or te
    k: 1,
    def: 1,
    bench: 6
  },
  totalRosterSpots: 15
};

export const positionColors = {
  qb: 'red',
  rb: 'blue',
  wr: 'orange',
  te: 'yellow',
  flex: 'pink',
  k: 'purple',
  def: 'green',
};

export const defaultDraftName = `Commysh is awesome demo`;
export const defaultNumberOfTeams = 10;
export const defaultPickTimerLength = '30';

export const createTeams = (teamCount) => {
  return Array.from({ length: teamCount }, (_, i) => ({
    teamId: i + 1,
    teamName: `Team ${i + 1}`,
    draftPosition: i + 1
  }));
};