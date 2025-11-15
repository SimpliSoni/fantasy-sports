
export enum PlayerRole {
  WK = 'Wicket-Keeper',
  BAT = 'Batsman',
  AR = 'All-Rounder',
  BOWL = 'Bowler',
}

export interface Player {
  player_id: string;
  name: string;
  role: PlayerRole;
  team_short_name: string;
  event_player_credit: number;
  team_logo: string;
}

export interface Match {
  id: number;
  match_name: string;
  match_date: string;
  t1_name: string;
  t1_short_name: string;
  t1_image: string;
  t2_name: string;
  t2_short_name: string;
  t2_image: string;
}

export interface Team {
  id: string;
  matchId: number;
  players: Player[];
  captain: Player;
  viceCaptain: Player;
}
