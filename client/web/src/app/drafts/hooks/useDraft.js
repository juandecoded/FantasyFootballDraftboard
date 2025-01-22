import { useEffect, useCallback } from 'react';
import { useDraftState, useDraftDispatch } from '../context/DraftContext';
import { fetchPlayers, draftPlayerApi } from '../api/draftApi';
import { autodraftPlayer as handleAutodraftPlayer, getNextTeamId, processPlayerData, updateDraftQueue, updateTeamRoster, updateDraftResults, getNextPickDetails } from '../utils';

export const useDraft = () => {
  const state = useDraftState();
  const dispatch = useDraftDispatch();

  const { draftStatus, currentlyDrafting, draftQueue, playersData, teams, draftResults, prevTeam, lastPlayerPicked, isDrafting, showPlayersPanel, teamsArr, rosterSettings } = state;

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const players = await fetchPlayers();
        const processedPlayers = processPlayerData(players);
        dispatch({ type: 'SET_PLAYERS_DATA', payload: processedPlayers });
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    loadPlayers();
  }, [dispatch]);

  const handleDraftPlayer = async (playerId) => {
    if (isDrafting) return;
    dispatch({ type: 'SET_IS_DRAFTING', payload: true });

    try {
      const response = await draftPlayerApi(state.draftData.draftId, currentlyDrafting.teamId, playerId, currentlyDrafting.overallPickNumber);
      console.log('handleDraftPlayer response:', response);

        const draftedPlayer = playersData.find((player) => player.playerId === playerId);
        draftedPlayer.draftStatus = 'drafted';
        draftedPlayer.fantasyTeam = currentlyDrafting.teamId;

        const updatedTeams = { ...teams };
        const teamRoster = updateTeamRoster(updatedTeams[currentlyDrafting.teamId].roster, draftedPlayer, rosterSettings);

        dispatch({ type: 'SET_LAST_PLAYER_PICKED', payload: draftedPlayer });
        dispatch({ type: 'SET_TEAMS', payload: updatedTeams });
        dispatch({ type: 'SET_PLAYERS_DATA', payload: playersData.filter((player) => player.playerId !== playerId) });

        const currentRound = currentlyDrafting.round;
        const currentPick = currentlyDrafting.pick;
        const updatedDraftResults = updateDraftResults(draftResults, currentRound, currentPick, draftedPlayer);

        dispatch({ type: 'SET_DRAFT_RESULTS', payload: updatedDraftResults });

        const totalTeams = state.teamsArr.length;
        const { nextPick, nextRound, nextOverallPickNumber } = getNextPickDetails(currentPick, currentRound, currentlyDrafting.overallPickNumber, totalTeams);

        const nextTeamId = getNextTeamId(nextPick, nextRound, teamsArr);

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

        const newDraftQueue = updateDraftQueue(nextTeamId, nextPick, nextRound, teamsArr, teams, getNextTeamId);
        dispatch({ type: 'SET_DRAFT_QUEUE', payload: newDraftQueue });
    } catch (error) {
      console.error('Error drafting player:', error);
    } finally {
      dispatch({ type: 'SET_IS_DRAFTING', payload: false });
    }
  };

  const togglePlayersPanel = () => {
    dispatch({ type: 'SET_SHOW_PLAYERS_PANEL', payload: !showPlayersPanel });
  };

  const autodraftPlayer = ()=> {handleAutodraftPlayer(playersData, handleDraftPlayer)};

  useEffect(() => {
    const newDraftQueue = updateDraftQueue(currentlyDrafting.teamId, currentlyDrafting.pick, currentlyDrafting.round, teamsArr, teams, getNextTeamId);
    dispatch({ type: 'SET_DRAFT_QUEUE', payload: newDraftQueue });
  }, [currentlyDrafting, teams, dispatch, teamsArr]); 

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