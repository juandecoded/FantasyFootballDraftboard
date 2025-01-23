import { api } from '@/utils/api';

export const fetchDraftData = async (draftId) => {
  const response = await api(`/drafts/${draftId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch draft data');
  }
  return response.json;
};

export const fetchPlayers = async (page = 1, limit = 25) => {
  const response = await api(`/players?page=${page}&limit=${limit}`);

  if (response.ok && response.json) {
    return response.json;
  } else {
    throw new Error('Error fetching players', response.statusText);
  }
};

export const draftPlayerApi = async (draftId, teamId, playerId, pickNumber) => {
  const response = await api('/drafts/draftPlayer', {
    method: 'POST',
    body: { draftId, teamId, playerId, pickNumber },
  });
  console.log('draftPlayerApi response:', response);
  if (!response.ok) {
    throw new Error('Error drafting player');
  }
  return response.json;
};