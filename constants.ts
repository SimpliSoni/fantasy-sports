
import { PlayerRole } from './types';

export const MAX_PLAYERS = 11;
export const MAX_CREDITS = 100;
export const MAX_PLAYERS_PER_TEAM = 7;

export const ROLE_LIMITS = {
  [PlayerRole.WK]: { min: 1, max: 5 },
  [PlayerRole.BAT]: { min: 3, max: 7 },
  [PlayerRole.AR]: { min: 0, max: 4 },
  [PlayerRole.BOWL]: { min: 3, max: 7 },
};

export const ROLE_SHORT_NAME = {
    [PlayerRole.WK]: 'WK',
    [PlayerRole.BAT]: 'BAT',
    [PlayerRole.AR]: 'AR',
    [PlayerRole.BOWL]: 'BOWL'
};
