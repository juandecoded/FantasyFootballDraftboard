import { createContext, useContext, useReducer } from 'react';
import { initialState } from './initialState';

const DraftStateContext = createContext();
const DraftDispatchContext = createContext();

const draftReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DRAFT_STATUS':
      return { ...state, draftStatus: action.payload };
    case 'SET_CURRENTLY_DRAFTING':
      return { ...state, currentlyDrafting: action.payload };
    case 'SET_DRAFT_QUEUE':
      return { ...state, draftQueue: action.payload };
    case 'SET_PLAYERS_DATA':
      return { ...state, playersData: action.payload };
    case 'SET_TEAMS':
      return { ...state, teams: action.payload };
    case 'SET_DRAFT_RESULTS':
      return { ...state, draftResults: action.payload };
    case 'SET_PREV_TEAM':
      return { ...state, prevTeam: action.payload };
    case 'SET_LAST_PLAYER_PICKED':
      return { ...state, lastPlayerPicked: action.payload };
    case 'SET_SHOW_PLAYERS_PANEL':
      return { ...state, showPlayersPanel: action.payload };
    case 'SET_IS_DRAFTING':
      return { ...state, isDrafting: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const DraftProvider = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(draftReducer, initialState);

  return (
    <DraftStateContext.Provider value={state}>
      <DraftDispatchContext.Provider value={dispatch}>
        {children}
      </DraftDispatchContext.Provider>
    </DraftStateContext.Provider>
  );
}

export const useDraftState = () => {
  const context = useContext(DraftStateContext);
  if (context === undefined) {
    throw new Error('useDraftState must be used within a DraftProvider');
  }
  return context;
}

export const useDraftDispatch = () => {
  const context = useContext(DraftDispatchContext);
  if (context === undefined) {
    throw new Error('useDraftDispatch must be used within a DraftProvider');
  }
  return context;
}