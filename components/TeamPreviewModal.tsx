import React from 'react';
import { Player, PlayerRole, Match } from '../types';
import PlayerIcon from './icons/PlayerIcon';

interface TeamPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  captain: Player | null;
  viceCaptain: Player | null;
  match: Match;
}

const PlayerChip = ({ player, isCaptain, isViceCaptain }: { player: Player, isCaptain: boolean, isViceCaptain: boolean }) => (
    <div className="flex flex-col items-center text-center w-20">
        <div className="relative">
            <PlayerIcon className="w-12 h-12 text-white bg-black/20 rounded-full p-1" />
            {(isCaptain || isViceCaptain) && (
                <span className={`absolute -top-1 -right-1 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center text-white
                    ${isCaptain ? 'bg-pink-600' : 'bg-slate-600'}`}>
                    {isCaptain ? 'C' : 'VC'}
                </span>
            )}
        </div>
        <p className="text-xs font-bold text-white bg-black/50 rounded-md px-1 py-0.5 mt-1 truncate w-full">{player.name}</p>
        <p className="text-xxs text-white/80">{player.event_player_credit} Cr</p>
    </div>
);

const TeamPreviewModal = ({ isOpen, onClose, players, captain, viceCaptain, match }: TeamPreviewModalProps) => {
  if (!isOpen) return null;

  const getPlayersByRole = (role: PlayerRole) => players.filter(p => p.role === role);

  const roles: { name: string, role: PlayerRole }[] = [
    { name: 'Wicket-Keepers', role: PlayerRole.WK },
    { name: 'Batsmen', role: PlayerRole.BAT },
    { name: 'All-Rounders', role: PlayerRole.AR },
    { name: 'Bowlers', role: PlayerRole.BOWL },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="w-full max-w-md mx-auto" onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-b from-green-700 to-green-900 rounded-xl shadow-2xl border-4 border-white/30 overflow-hidden">
          <header className="p-3 bg-black/20 flex justify-between items-center text-white">
            <h2 className="font-bold text-lg">Team Preview</h2>
            <button onClick={onClose} className="text-2xl font-bold">&times;</button>
          </header>
          
          <div className="relative aspect-[3/4] bg-[url('https://i.imgur.com/crF2S8g.png')] bg-cover bg-center bg-no-repeat p-4 space-y-4">
            {roles.map(({name, role}) => (
                <div key={role}>
                    <p className="text-center text-white text-xs font-semibold bg-black/30 rounded-full py-0.5 mb-2">{name} ({getPlayersByRole(role).length})</p>
                    <div className="flex justify-center items-start gap-2 flex-wrap">
                        {getPlayersByRole(role).map(p => (
                            <PlayerChip 
                                key={p.player_id}
                                player={p}
                                isCaptain={p.player_id === captain?.player_id}
                                isViceCaptain={p.player_id === viceCaptain?.player_id}
                            />
                        ))}
                    </div>
                </div>
            ))}
          </div>

          <footer className="p-3 bg-black/20 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
                <img src={match.t1_image} alt={match.t1_name} className="w-6 h-6" />
                <span>{players.filter(p => p.team_short_name === match.t1_short_name).length}</span>
            </div>
            <div className="flex items-center space-x-2">
                <span>{players.filter(p => p.team_short_name === match.t2_short_name).length}</span>
                <img src={match.t2_image} alt={match.t2_name} className="w-6 h-6" />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TeamPreviewModal;