import { players } from './players';

export const draftData = {
  draftStatus: 'preDraft', //active, paused, completed, used for start/pause draft button
  draftId: '1234',
  draftName: "14 team 2 flex demo draft",
  teamCount: 14,
  draftSettings: {
              // draftType: "snake", // auction
              pickTimerLength: 60,
              autoDraft: "randomPlayer", // skip, endOfRound, etc
  },
  season: '2024',
  
  rosterSettings: {
    positions: {
      qb: 1,
      rb: 2, 
      wr: 2,
      te: 1,
      flex: 2,
      k: 1,
      def: 1,
      bench: 6
    },
    totalRosterSpots: 16 
  },
  teamsArr: [
      { 
        teamId: '1456',
        teamName: "Team 5",
        draftPosition: 1,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1457',
        teamName: "Team 1",
        draftPosition: 2,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1458',
        teamName: "Team 2",
        draftPosition: 3,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1459',
        teamName: "Team 3",
        draftPosition: 4,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1460',
        teamName: "Team 4",
        draftPosition: 5,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1461',
        teamName: "Team 13",
        draftPosition: 6,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1462',
        teamName: "Team 6",
        draftPosition: 7,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1463',
        teamName: "Team 7",
        draftPosition: 8,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1464',
        teamName: "Team 12",
        draftPosition: 9,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1465',
        teamName: "Team 8",
        draftPosition: 10,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1466',
        teamName: "Team 9",
        draftPosition: 11,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1467',
        teamName: "Team 10",
        draftPosition: 12,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1468',
        teamName: "Team 11",
        draftPosition: 13,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      },
      { 
        teamId: '1469',
        teamName: "Team 14",
        draftPosition: 14,
        roster: {
          qb: players.playerId,
          rb1: players.playerId,
          rb2: players.playerId,
          wr1: players.playerId,
          wr2: players.playerId,
          te: players.playerId,
          flex1: players.playerId,
          flex2: players.playerId,
          k: players.playerId,
          def: players.playerId,
          bench: [
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId,
            players.playerId
          ]
        }
      }
    ],
  results: {
      rounds: {
  }},

  teams: {
    '1456': {
        teamId: '1456',
        teamName: "Team 5",
        draftPosition: 1,
        roster: {
            qb: players[1].playerId,
            rb1: players[2].playerId,
            rb2: players[3].playerId,
            wr1: players[4].playerId,
            wr2: players[5].playerId,
            te: players[6].playerId,
            flex1: players[7].playerId,
            flex2: players[8].playerId,
            k: players[9].playerId,
            def: players[10].playerId,
            bench: [
                players[11].playerId,
                players[12].playerId,
                players[13].playerId,
                players[14].playerId,
                players[15].playerId,
                players[16].playerId
            ]
        }
    },
    '1457': {
        teamId: '1457',
        teamName: "Team 1",
        draftPosition: 2,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1458': {
        teamId: '1458',
        teamName: "Team 2",
        draftPosition: 3,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1459': {
        teamId: '1459',
        teamName: "Team 3",
        draftPosition: 4,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1460': {
        teamId: '1460',
        teamName: "Team 4",
        draftPosition: 5,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1461': {
        teamId: '1461',
        teamName: "Team 13",
        draftPosition: 6,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1462': {
        teamId: '1462',
        teamName: "Team 6",
        draftPosition: 7,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1463': {
        teamId: '1463',
        teamName: "Team 7",
        draftPosition: 8,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1464': {
        teamId: '1464',
        teamName: "Team 12",
        draftPosition: 9,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1465': {
        teamId: '1465',
        teamName: "Team 8",
        draftPosition: 10,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1466': {
        teamId: '1466',
        teamName: "Team 9",
        draftPosition: 11,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1467': {
        teamId: '1467',
        teamName: "Team 10",
        draftPosition: 12,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1468': {
        teamId: '1468',
        teamName: "Team 11",
        draftPosition: 13,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    },
    '1469': {
        teamId: '1469',
        teamName: "Team 14",
        draftPosition: 14,
        roster: {
            qb: players.playerId,
            rb1: players.playerId,
            rb2: players.playerId,
            wr1: players.playerId,
            wr2: players.playerId,
            te: players.playerId,
            flex1: players.playerId,
            flex2: players.playerId,
            k: players.playerId,
            def: players.playerId,
            bench: [
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId,
                players.playerId
            ]
        }
    }
  },
  currentlyDrafting: {
      round: 1,
      pick: 1,
      overallPickNumber: 1,
      teamId: '1456',
      lastPlayerPicked: null
  },
  draftQueue: {
      currentlyDrafting: '1456',
      upNext: '1457',
      onDeck: '1458',
      after: '1459'
  },
  draftOrder: {
    1: '1456',  // Team 5
    2: '1457',  // Team 1
    3: '1458',  // Team 2
    4: '1459',  // Team 3
    5: '1460',  // Team 4
    6: '1461',  // Team 13
    7: '1462',  // Team 6
    8: '1463',  // Team 7
    9: '1464',  // Team 12
    10: '1465', // Team 8
    11: '1466', // Team 9
    12: '1467', // Team 10
    13: '1468', // Team 11
    14: '1469'  // Team 14
  }
}