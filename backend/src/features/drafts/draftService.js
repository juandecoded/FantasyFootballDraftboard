const draftRepository = require('./draftRepository');
const teamRepository = require('../teams/teamRepository');
const playerRepository = require('../players/playerRepository');

// const { validateFinalDraft } = require('./draftValidator');

const createDraft = async (draftData) => {
  console.log('Creating draft with data:', draftData);
  
  const { draftName, teamCount, pickTimerLength, rosterSettings, teams } = draftData;

  const draftId = await draftRepository.createDraft(draftName, teamCount, pickTimerLength);

  const rosterSettingsPromise = Object.entries(rosterSettings.positions).map(([position, count]) => {
    return draftRepository.createRosterSettings(draftId, position, count);
  });

  await Promise.all(rosterSettingsPromise);

  const teamsPromise = teams.map(async (team) => {
    const teamId = await teamRepository.createTeam(draftId, team.teamName, team.draftPosition);
    const roster = initialRoster(rosterSettings.positions);
    const rosterPromises = Object.entries(roster).map(([position, slots]) => {
      if (Array.isArray(slots)) {
        return slots.map((_, index) => teamRepository.createTeamRoster(teamId, position, index + 1, null));
      } else {
        return teamRepository.createTeamRoster(teamId, position, 1, null);
      }
    });
    await Promise.all(rosterPromises.flat());
    return { ...team, teamId };
  });

  const initializedTeams = await Promise.all(teamsPromise);

  const draftOrder = initializedTeams.reduce((acc, team) => {
    acc[team.draftPosition] = team.teamId;
    return acc;
  }, {});

  const draftDataWithDefaults = {
    draftId,
    draftName,
    teamCount,
    pickTimerLength,
    rosterSettings,
    draftStatus: 'preDraft',
    currentlyDrafting: {
      teamId: null,
      round: 1,
      pick: 1,
      overallPickNumber: 1,
    },
    draftOrder,
    results: {
      rounds: {},
    },
    teams: initializedTeams.reduce((acc, team) => {
      acc[team.teamId] = {
        teamId: team.teamId,
        teamName: team.teamName,
        draftPosition: team.draftPosition,
        roster: initialRoster(rosterSettings.positions),
      };
      return acc;
    }, {}),
    teamsArr: initializedTeams.map(team => ({
      teamId: team.teamId,
      teamName: team.teamName,
      draftPosition: team.draftPosition,
    })),
  };

  return draftId;
};

const initialRoster = (positions) => {
  const roster = {}

  Object.entries(positions).forEach(([position, count]) => {
    if (position !== 'bench') {
      for (let i=1; i <= count; i++) {
        const posKey = count > 1 ? `${position}${i}` : position;
        roster[posKey] = null;
      }
    } else {
      roster['bench'] = Array(count).fill(null);
    }
  })
  return roster;
}

const getDraft = async (draftId) => {
  const draft = await draftRepository.getDraft(draftId);
  if (!draft) {
    throw new Error('Draft not found');
  }

  const rosterSettings = await draftRepository.getRosterSettingsByDraftId(draftId);
  const totalRosterSpots = Object.values(rosterSettings.positions).reduce((acc, count) => acc + count, 0);
  rosterSettings.totalRosterSpots = totalRosterSpots;

  const teams = await teamRepository.getTeams(draftId);

  const initializedTeams = await Promise.all(teams.map(async (team) => {
    const roster = await teamRepository.getTeamRosterByTeamId(team.teamId);
    const formattedRoster = roster.reduce((acc, slot) => {
      if (slot.position === 'bench') {
        acc.bench[slot.slot - 1] = slot.playerId;
      } else {
        acc[`${slot.position}${slot.slot}`] = slot.playerId;
      }
      return acc;
    }, { bench: Array(rosterSettings.positions.bench).fill(null) });

    return {
      teamId: team.teamId,
      teamName: team.teamName,
      draftPosition: team.draftPosition,
      roster: formattedRoster,
    };
  }));
  
  const draftOrder = initializedTeams
    .sort((a, b) => a.draftPosition - b.draftPosition)
    .reduce((acc, team) => {
      acc[team.draftPosition] = team.teamId.toString();
      return acc;
    }, {});

  // Extract team IDs in draft order
  const teamIdsInOrder = Object.values(draftOrder);

  const currentlyDrafting = {
    teamId: teamIdsInOrder[0],
    round: 1,
    pick: 1,
    overallPickNumber: 1,
  };

  // Determine the current pick number
  const currentPickNumber = currentlyDrafting.overallPickNumber - 1;

  // Initialize draftQueue based on current pick
  const draftQueue = {
    currentlyDrafting: teamIdsInOrder[currentPickNumber % teamIdsInOrder.length],
    upNext: teamIdsInOrder[(currentPickNumber + 1) % teamIdsInOrder.length] || null,
    onDeck: teamIdsInOrder[(currentPickNumber + 2) % teamIdsInOrder.length] || null,
    after: teamIdsInOrder[(currentPickNumber + 3) % teamIdsInOrder.length] || null,
  };


  const draftDataWithDefaults = {
    draftId: draft.id,
    draftName: draft.draft_name,
    teamCount: draft.team_count,
    pickTimerLength: draft.pick_timer_length,
    rosterSettings,
    draftStatus: 'preDraft',
    currentlyDrafting,
    draftOrder,
    draftQueue,
    results: {
      rounds: {},
    },
    teams: initializedTeams.reduce((acc, team) => {
      acc[team.teamId] = team;
      return acc;
    }, {}),
    teamsArr: initializedTeams.map(team => ({
      teamId: team.teamId,
      teamName: team.teamName,
      draftPosition: team.draftPosition,
    })),
  };

  console.log('getDraft called: Draft data being returned from draft service server', draftDataWithDefaults);

  return draftDataWithDefaults;
};

const draftPlayer = async (draftId, teamId, playerId, pickNumber) => {
  const player = await playerRepository.getPlayerById(playerId);
  if (!player) {
    throw new Error(`Player with id ${playerId} does not exist`);
  }

  if (player.draftStatus !== 'undrafted') {
    throw new Error(`Player with id ${playerId} has already been drafted`);
  }

  const team = await teamRepository.getTeamById(teamId);
  if (!team) {
    throw new Error(`Team with id ${teamId} does not exist`);
  }

  console.log('draft player api endpoint called')

  const draft = await getDraft(draftId);
  if (!draft) {
    throw new Error(`Draft with id ${draftId} not found`);
  }

  const currentlyDrafting = draft.currentlyDrafting;

  const rosterSettings = await draftRepository.getRosterSettingsByDraftId(draftId);
  if (!rosterSettings) {
    throw new Error(`Roster settings for draft with id ${draftId} not found`);
  }

  const roster = team.roster || { bench: [] };
  const rosterLimit = rosterSettings.totalRosterSpots;
  if (roster.length >= rosterLimit) {
    throw new Error(`Team with id ${teamId} has a full roster`);
  }

  // Assign player to position
  const position = player.position.toLowerCase();
  const positionCount = rosterSettings.positions[position] || 0;

  let assigned = false;
  for (let i = 1; i <= positionCount; i++) {
    const posKey = `${position}${i}`;
    if (!roster[posKey]) {
      roster[posKey] = player;
      await teamRepository.updateTeamRoster(teamId, position, i, playerId);
      assigned = true;
      break;
    }
  }

  // Or assign to flex
  if (!assigned && rosterSettings.positions.flex) {
    for (let i = 1; i <= rosterSettings.positions.flex; i++) {
      const posKey = `flex${i}`;
      if (!roster[posKey]) {
        roster[posKey] = player;
        await teamRepository.updateTeamRoster(teamId, 'flex', i, playerId);
        assigned = true;
        break;
      }
    }
  }

  if (!assigned) {
    roster.bench.push(player);
    await teamRepository.updateTeamRoster(teamId, 'bench', i, playerId);
  }

  // Update player and team
  // player.draftStatus = `drafted ${pickNumber} by ${teamId}`;
  // player.fantasyTeam = teamId;

  await teamRepository.updateTeamRoster(teamId, roster);
  // await playerRepository.updatePlayer(playerId, player);

  // Update draft pick in the draft repository
  // await draftRepository.addDraftPick(draftId, teamId, playerId, pickNumber);
  // add to draft picks table
  await draftRepository.addDraftPick(draftId, teamId, playerId, pickNumber, currentlyDrafting.round);
  
  
};

module.exports = {
  createDraft,
  getDraft,
  draftPlayer
};