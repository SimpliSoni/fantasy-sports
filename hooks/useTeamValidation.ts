
import { useMemo } from 'react';
import { Player, PlayerRole } from '../types';
import { MAX_PLAYERS, MAX_CREDITS, MAX_PLAYERS_PER_TEAM, ROLE_LIMITS } from '../constants';

export const useTeamValidation = (selectedPlayers: Player[]) => {
  const validationState = useMemo(() => {
    const totalPlayers = selectedPlayers.length;
    const totalCredits = selectedPlayers.reduce((sum, p) => sum + p.event_player_credit, 0);
    const creditsLeft = MAX_CREDITS - totalCredits;

    const teamCounts: { [key: string]: number } = selectedPlayers.reduce((acc, p) => {
      acc[p.team_short_name] = (acc[p.team_short_name] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const roleCounts: { [key: string]: number } = {
      [PlayerRole.WK]: 0,
      [PlayerRole.BAT]: 0,
      [PlayerRole.AR]: 0,
      [PlayerRole.BOWL]: 0,
    };
    selectedPlayers.forEach(p => {
      roleCounts[p.role]++;
    });

    const isPlayerSelectable = (player: Player) => {
      if (totalPlayers >= MAX_PLAYERS) return { selectable: false, reason: 'Team is full' };
      if (creditsLeft < player.event_player_credit) return { selectable: false, reason: 'Not enough credits' };
      if ((teamCounts[player.team_short_name] || 0) >= MAX_PLAYERS_PER_TEAM) return { selectable: false, reason: `Max ${MAX_PLAYERS_PER_TEAM} players from ${player.team_short_name}` };
      if (roleCounts[player.role] >= ROLE_LIMITS[player.role as PlayerRole].max) return { selectable: false, reason: `Max ${ROLE_LIMITS[player.role as PlayerRole].max} ${player.role}s reached` };
      return { selectable: true, reason: '' };
    };

    const validationErrors: string[] = [];
    if (totalPlayers !== MAX_PLAYERS) {
      validationErrors.push(`Select ${MAX_PLAYERS} players`);
    }
    Object.entries(ROLE_LIMITS).forEach(([role, limits]) => {
      if (roleCounts[role] < limits.min) validationErrors.push(`Select at least ${limits.min} ${role}(s)`);
      if (roleCounts[role] > limits.max) validationErrors.push(`Select at most ${limits.max} ${role}(s)`);
    });
     Object.entries(teamCounts).forEach(([team, count]) => {
        if(count > MAX_PLAYERS_PER_TEAM) validationErrors.push(`Max ${MAX_PLAYERS_PER_TEAM} players from ${team}`);
     });
     if(creditsLeft < 0) validationErrors.push(`Credits exceed ${MAX_CREDITS}`);


    const isTeamValid = validationErrors.length === 0;

    return {
      totalPlayers,
      totalCredits,
      creditsLeft,
      teamCounts,
      roleCounts,
      isPlayerSelectable,
      isTeamValid,
      validationErrors
    };
  }, [selectedPlayers]);

  return validationState;
};
