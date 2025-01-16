import { useEffect, useCallback } from 'react';
import { api } from '@/utils/api';
import { useDraftState, useDraftDispatch} from '../context/DraftContext';

export const useDraft = () => {
  const state = useDraftState();
  const dispatch = useDraftDispatch();

  const {draftStatus, currentlyDrafting, draftQueue, playersData, teams, draftResults, prevTeam, lastPlayerPicked, isDrafting, showPlayersPanel, teamsArr, rosterSettings } = state

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await api('/players');
        if (response.ok && response.json) {
          const processedData = response.json.map(player => ({
            playerId: player.id,
            firstName: player.firstName,
            lastName: player.lastName,
            position: player.position,
            proTeam: player.proTeam,
            byeWeek: player.byeWeek,
            draftStatus: player.draftStatus,
            fantasyTeam: player.fantasyTeam,
          }));
          dispatch({type: 'SET_PLAYERS_DATA', payload: processedData});
        } else {
          console.error('Error fetching players:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [dispatch]);

  const togglePlayersPanel = () => {
    dispatch({ type: 'SET_SHOW_PLAYERS_PANEL', payload: !state.showPlayersPanel });
  };

  const getNextTeamId = (pickNumber, roundNumber) => {
    const index = pickNumber - 1;
    const isEvenRound = roundNumber % 2 === 0;
    const adjustedIndex = isEvenRound ? teamsArr.length - 1 - index : index;
    return teamsArr[adjustedIndex]?.teamId;
  };

  const handleDraftPlayer = async (playerId) => {
    if (isDrafting) return;
    dispatch({ type: 'SET_IS_DRAFTING', payload: true });

    try {
      const response = await api('/drafts/draftPlayer', {
        method: 'POST',
        body: {
          draftId: state.draftData.draftId,
          teamId: currentlyDrafting.teamId,
          playerId,
          pickNumber: currentlyDrafting.overallPickNumber,
        },
      });

      if (response.ok) {
        // Update the frontend state based on the response
        const draftedPlayer = playersData.find((player) => player.playerId === playerId);
        draftedPlayer.draftStatus = 'drafted';
        draftedPlayer.fantasyTeam = currentlyDrafting.teamId;

        const updatedTeams = { ...teams };
        const teamRoster = updatedTeams[currentlyDrafting.teamId].roster;
        const position = draftedPlayer.position.toLowerCase();
        const positionCount = rosterSettings.positions[position] || 0;

        let assigned = false;
        for (let i = 1; i <= positionCount; i++) {
          const posKey = `${position}${i}`;
          if (!teamRoster[posKey]) {
            teamRoster[posKey] = draftedPlayer;
            assigned = true;
            break;
          }
        }

        if (!assigned && rosterSettings.positions.flex) {
          for (let i = 1; i <= rosterSettings.positions.flex; i++) {
            const posKey = `flex${i}`;
            if (!teamRoster[posKey]) {
              teamRoster[posKey] = draftedPlayer;
              assigned = true;
              break;
            }
          }
        }

        if (!assigned) {
          teamRoster.bench.push(draftedPlayer);
        }

        dispatch({ type: 'SET_LAST_PLAYER_PICKED', payload: draftedPlayer });
        dispatch({ type: 'SET_TEAMS', payload: updatedTeams });
        dispatch({ type: 'SET_PLAYERS_DATA', payload: playersData.filter((player) => player.playerId !== playerId) });


        const currentRound = currentlyDrafting.round;
        const currentPick = currentlyDrafting.pick;
        const updatedDraftResults = { ...draftResults };

        if (!updatedDraftResults.rounds[currentRound]) {
          updatedDraftResults.rounds[currentRound] = {};
        }
        updatedDraftResults.rounds[currentRound][currentPick] = draftedPlayer;
        dispatch({ type: 'SET_DRAFT_RESULTS', payload: updatedDraftResults });

        const totalTeams = state.teamsArr.length;
        let nextPick = currentPick + 1;
        let nextRound = currentRound;
        let nextOverallPickNumber = currentlyDrafting.overallPickNumber + 1;

        if (nextPick > totalTeams) {
          nextRound += 1;
          nextPick = 1;
        }

        const nextTeamId = getNextTeamId(nextPick, nextRound);

        dispatch({ type: 'SET_PREV_TEAM', payload: currentlyDrafting.teamId });

        dispatch({
          type: 'SET_CURRENTLY_DRAFTING',
          payload: {
            teamId: nextTeamId,
            lastPlayerPicked: playerId,
            pick: nextPick,
            round: nextRound,
            overallPickNumber: nextOverallPickNumber,
          },
        });

        updateDraftQueue(nextTeamId, nextPick, nextRound);
      }
    } catch (error) {
      console.error('Error drafting player:', error);
    } finally {
      dispatch({ type: 'SET_IS_DRAFTING', payload: false });
    }
  };

  const updateDraftQueue = useCallback((nextTeamId, nextPick, nextRound) => {
    const totalTeams = teamsArr.length;

    const onDeckPick = nextPick + 1 > totalTeams ? 1 : nextPick + 1;
    const onDeckRound = nextPick + 1 > totalTeams ? nextRound + 1 : nextRound;
    const onDeckTeamId = getNextTeamId(onDeckPick, onDeckRound);

    const afterPick = onDeckPick + 1 > totalTeams ? 1 : onDeckPick + 1;
    const afterRound = onDeckPick + 1 > totalTeams ? onDeckRound + 1 : onDeckRound;
    const afterTeamId = getNextTeamId(afterPick, afterRound);

    dispatch({
      type: 'SET_DRAFT_QUEUE',
      payload: {
        currentTeamName: teams[nextTeamId]?.teamName || 'Unknown Team',
        upNext: teams[onDeckTeamId]?.teamName || 'Unknown Team',
        onDeck: teams[afterTeamId]?.teamName || 'Unknown Team',
        after: teams[getNextTeamId(afterPick + 1, afterRound)]?.teamName || 'Unknown Team',
      },
    });
  }, [teams, dispatch]);

  const autodraftPlayer = () => {
    if (playersData.length > 0) {
      const randomPlayer = playersData[Math.floor(Math.random() * playersData.length)];
      handleDraftPlayer(randomPlayer.playerId);
    }
  };

  useEffect(() => {
    updateDraftQueue(currentlyDrafting.teamId, currentlyDrafting.pick, currentlyDrafting.round);
  }, [currentlyDrafting, teams, updateDraftQueue]);

  return {
    draftStatus,
    setDraftStatus: (status) => dispatch({ type: 'SET_DRAFT_STATUS', payload: status }),
    currentlyDrafting,
    draftQueue,
    showPlayersPanel,
    playersData,
    teams,
    draftResults,
    prevTeam,
    lastPlayerPicked,
    togglePlayersPanel,
    handleDraftPlayer,
    autodraftPlayer,
  };
};