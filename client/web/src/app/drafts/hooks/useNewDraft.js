import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import { defaultRosterSettings, defaultDraftName, defaultNumberOfTeams, defaultPickTimerLength, createTeams } from '../utils/newDraftUtils';

export const useNewDraft = () => {
  const [activeTab, setActiveTab] = useState('draftSettings');
  const [rosterSettings, setRosterSettings] = useState(defaultRosterSettings);
  const [draftName, setDraftName] = useState(defaultDraftName);
  const [teamCount, setTeamCount] = useState(defaultNumberOfTeams);
  const [pickTimerLength, setPickTimerLength] = useState(defaultPickTimerLength);
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState(createTeams(defaultNumberOfTeams));
  const router = useRouter();

  const handleTeamNameChange = (teamId, newName) => {
    setTeams(teams.map(team => team.teamId === teamId ? { ...team, teamName: newName } : team));
  };

  const handleDraftOrderChange = (updatedTeams) => {
    setTeams(updatedTeams);
  };

  const incrementPosition = (position) => {
    setRosterSettings((prevSettings) => ({
      ...prevSettings,
      positions: {
        ...prevSettings.positions,
        [position]: prevSettings.positions[position] + 1
      },
      totalRosterSpots: prevSettings.totalRosterSpots + 1
    }));
  };

  const decrementPosition = (position) => {
    setRosterSettings((prevSettings) => ({
      ...prevSettings,
      positions: {
        ...prevSettings.positions,
        [position]: prevSettings.positions[position] > 0 ? prevSettings.positions[position] - 1 : 0
      },
      totalRosterSpots: prevSettings.positions[position] > 0 ? prevSettings.totalRosterSpots - 1 : prevSettings.totalRosterSpots
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDraftNameChange = (e) => {
    setDraftName(e.target.value);
  };

  const handleTeamCountChange = (newCount) => {
    setTeamCount(newCount);
    setTeams(createTeams(newCount));
  };

  const handlePickTimerLengthChange = (length) => {
    setPickTimerLength(length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const draftData = {
      draftName,
      teamCount,
      pickTimerLength: Number(pickTimerLength),
      rosterSettings,
      teams: teams.map(({ teamId, ...rest }) => rest)
    };

    try {
      const result = await api('/drafts', {
        method: 'POST',
        body: draftData,
      });

      if (result.ok) {
        const data = await result.json;
        router.push(`/drafts/${data.draftId}`);
      } else {
        console.error('Failed to create draft', result.json);
      }
    } catch (error) {
      console.error(`Error creating draft: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activeTab,
    rosterSettings,
    draftName,
    teamCount,
    pickTimerLength,
    isLoading,
    teams,
    handleTeamNameChange,
    handleDraftOrderChange,
    incrementPosition,
    decrementPosition,
    handleTabChange,
    handleDraftNameChange,
    handleTeamCountChange,
    handlePickTimerLengthChange,
    handleSubmit,
  };
};