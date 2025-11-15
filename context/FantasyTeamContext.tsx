
import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { Player, Team, Match } from '../types';

type State = {
  selectedPlayers: Player[];
  captain: Player | null;
  viceCaptain: Player | null;
  savedTeams: { [matchId: number]: Team[] };
};

type Action =
  | { type: 'ADD_PLAYER'; payload: Player }
  | { type: 'REMOVE_PLAYER'; payload: Player }
  | { type: 'SET_CAPTAIN'; payload: Player }
  | { type: 'SET_VICE_CAPTAIN'; payload: Player }
  | { type: 'SAVE_TEAM'; payload: { matchId: number } }
  | { type: 'RESET_CURRENT_TEAM' }
  | { type: 'LOAD_TEAMS'; payload: { [matchId: number]: Team[] } };

const initialState: State = {
  selectedPlayers: [],
  captain: null,
  viceCaptain: null,
  savedTeams: {},
};

const FantasyTeamReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return { ...state, selectedPlayers: [...state.selectedPlayers, action.payload] };
    case 'REMOVE_PLAYER':
      return {
        ...state,
        selectedPlayers: state.selectedPlayers.filter(p => p.player_id !== action.payload.player_id),
      };
    case 'SET_CAPTAIN':
      return { ...state, captain: action.payload };
    case 'SET_VICE_CAPTAIN':
      return { ...state, viceCaptain: action.payload };
    case 'SAVE_TEAM': {
      if (!state.captain || !state.viceCaptain) return state;
      const newTeam: Team = {
        id: new Date().toISOString(),
        matchId: action.payload.matchId,
        players: state.selectedPlayers,
        captain: state.captain,
        viceCaptain: state.viceCaptain,
      };
      const matchTeams = state.savedTeams[action.payload.matchId] || [];
      const updatedTeams = { ...state.savedTeams, [action.payload.matchId]: [...matchTeams, newTeam] };
      localStorage.setItem('fantasyTeams', JSON.stringify(updatedTeams));
      return {
        ...state,
        savedTeams: updatedTeams,
        selectedPlayers: [],
        captain: null,
        viceCaptain: null,
      };
    }
    case 'RESET_CURRENT_TEAM':
        return {
            ...state,
            selectedPlayers: [],
            captain: null,
            viceCaptain: null,
        }
    case 'LOAD_TEAMS':
      return { ...state, savedTeams: action.payload };
    default:
      return state;
  }
};

const FantasyTeamContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const FantasyTeamProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(FantasyTeamReducer, initialState);

  useEffect(() => {
    try {
      const storedTeams = localStorage.getItem('fantasyTeams');
      if (storedTeams) {
        dispatch({ type: 'LOAD_TEAMS', payload: JSON.parse(storedTeams) });
      }
    } catch (error) {
        console.error("Could not parse teams from localStorage", error);
    }
  }, []);

  return <FantasyTeamContext.Provider value={{ state, dispatch }}>{children}</FantasyTeamContext.Provider>;
};

export const useFantasyTeam = () => {
  const context = useContext(FantasyTeamContext);
  if (context === undefined) {
    throw new Error('useFantasyTeam must be used within a FantasyTeamProvider');
  }
  return context;
};
