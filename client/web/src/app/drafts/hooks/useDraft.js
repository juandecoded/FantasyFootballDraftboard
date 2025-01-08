import { useState, useEffect } from 'react';
import { api } from '@/utils/api';

export const useDraft = (draftData) => {
  const { draftStatus: initialDraftStatus, draftOrder, rosterSettings, teamsArr } = draftData;
  const [draftStatus, setDraftStatus] = useState(initialDraftStatus);
  const [currentlyDrafting, setCurrentlyDrafting] = useState(draftData.currentlyDrafting);
  const [draftQueue, setDraftQueue] = useState(draftData.draftQueue);
  const [showPlayersPanel, setShowPlayersPanel] = useState(true);
  const [playersData, setPlayersData] = useState([]);
  const [teams, setTeams] = useState(draftData.teams);
  const [draftResults, setDraftResults] = useState(draftData.results);
  const [prevTeam, setPrevTeam] = useState(null);
  const [lastPlayerPicked, setLastPlayerPicked] = useState(null);

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
          setPlayersData(processedData);
        } else {
          console.error('Error fetching players:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  const togglePlayersPanel = () => {
    setShowPlayersPanel(!showPlayersPanel);
  };

  const getNextTeamId = (pickNumber, roundNumber) => {
    const index = pickNumber - 1;
    const isEvenRound = roundNumber % 2 === 0;
    const adjustedIndex = isEvenRound ? teamsArr.length - 1 - index : index;
    return teamsArr[adjustedIndex]?.teamId;
  };

  const handleDraftPlayer = async (playerId) => {
    try {
      const response = await api('/drafts/draftPlayer', {
        method: 'POST',
        body: {
          draftId: draftData.draftId,
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

        setLastPlayerPicked(draftedPlayer);
        setTeams(updatedTeams);
        setPlayersData(playersData.filter((player) => player.playerId !== playerId));


        const currentRound = currentlyDrafting.round;
        const currentPick = currentlyDrafting.pick;
        const updatedDraftResults = { ...draftResults };

        if (!updatedDraftResults.rounds[currentRound]) {
          updatedDraftResults.rounds[currentRound] = {};
        }
        updatedDraftResults.rounds[currentRound][currentPick] = draftedPlayer;
        setDraftResults(updatedDraftResults);

        const totalTeams = teamsArr.length;
        let nextPick = currentPick + 1;
        let nextRound = currentRound;
        let nextOverallPickNumber = currentlyDrafting.overallPickNumber + 1;

        if (nextPick > totalTeams) {
          nextRound += 1;
          nextPick = 1;
        }

        const nextTeamId = getNextTeamId(nextPick, nextRound);

        setPrevTeam(currentlyDrafting.teamId);

        setCurrentlyDrafting({
          teamId: nextTeamId,
          lastPlayerPicked: playerId,
          pick: nextPick,
          round: nextRound,
          overallPickNumber: nextOverallPickNumber,
        });

        updateDraftQueue(nextTeamId, nextPick, nextRound);
      }
    } catch (error) {
      console.error('Error drafting player:', error);
    }
  };

  const updateDraftQueue = (nextTeamId, nextPick, nextRound) => {
    const totalTeams = teamsArr.length;

    const onDeckPick = nextPick + 1 > totalTeams ? 1 : nextPick + 1;
    const onDeckRound = nextPick + 1 > totalTeams ? nextRound + 1 : nextRound;
    const onDeckTeamId = getNextTeamId(onDeckPick, onDeckRound);

    const afterPick = onDeckPick + 1 > totalTeams ? 1 : onDeckPick + 1;
    const afterRound = onDeckPick + 1 > totalTeams ? onDeckRound + 1 : onDeckRound;
    const afterTeamId = getNextTeamId(afterPick, afterRound);

    setDraftQueue({
      currentTeamName: teams[nextTeamId]?.teamName || 'Unknown Team',
      upNext: teams[onDeckTeamId]?.teamName || 'Unknown Team',
      onDeck: teams[afterTeamId]?.teamName || 'Unknown Team',
      after: teams[getNextTeamId(afterPick + 1, afterRound)]?.teamName || 'Unknown Team',
    });
    
  };

  useEffect(() => {
    updateDraftQueue(currentlyDrafting.teamId, currentlyDrafting.pick, currentlyDrafting.round);
  }, [currentlyDrafting, teams]);

  return {
    draftStatus,
    setDraftStatus,
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
  };
};