import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFantasyTeam } from '../context/FantasyTeamContext';
import { useTeamValidation } from '../hooks/useTeamValidation';
import { matches, players as allPlayers } from '../data/mockData';
import { Player, PlayerRole } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import PlayerIcon from '../components/icons/PlayerIcon';
import FieldIcon from '../components/icons/FieldIcon';
import Toast from '../components/Toast';
import TeamPreviewModal from '../components/TeamPreviewModal';
import { MAX_PLAYERS, MAX_CREDITS, ROLE_LIMITS, ROLE_SHORT_NAME } from '../constants';

const roles: PlayerRole[] = [PlayerRole.WK, PlayerRole.BAT, PlayerRole.AR, PlayerRole.BOWL];

const PickPlayers = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useFantasyTeam();
  const [activeRole, setActiveRole] = useState<PlayerRole>(PlayerRole.WK);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const match = matches.find(m => m.id === parseInt(matchId || ''));
  const availablePlayers = allPlayers[parseInt(matchId || '')] || [];

  const {
    totalPlayers,
    creditsLeft,
    teamCounts,
    roleCounts,
    isPlayerSelectable,
  } = useTeamValidation(state.selectedPlayers);

  if (!match) return <div>Match not found</div>;

  const handlePlayerToggle = (player: Player) => {
    const isSelected = state.selectedPlayers.some(p => p.player_id === player.player_id);
    if (isSelected) {
      dispatch({ type: 'REMOVE_PLAYER', payload: player });
    } else {
      const { selectable, reason } = isPlayerSelectable(player);
      if (selectable) {
        dispatch({ type: 'ADD_PLAYER', payload: player });
      } else {
        setToastMessage(reason);
      }
    }
  };

  const filteredPlayers = availablePlayers.filter(p => p.role === activeRole);
  const proceedEnabled = totalPlayers === MAX_PLAYERS;

  return (
    <div className="flex flex-col h-screen bg-slate-100 dark:bg-slate-900">
      <header className="bg-indigo-700 dark:bg-slate-800 text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(`/my-teams/${matchId}`)} className="mr-4 p-1 rounded-full hover:bg-white/10 transition-colors" aria-label="Back to my teams">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">Pick Players</h1>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="text-center">
            <p className="font-bold">{totalPlayers}/{MAX_PLAYERS}</p>
            <p className="text-xs opacity-80">Players</p>
          </div>
          <div className="flex items-center space-x-2">
             <img src={match.t1_image} alt={match.t1_short_name} className="w-8 h-8" />
             <span className="font-bold text-lg">{teamCounts[match.t1_short_name] || 0}</span>
             <span className="opacity-80">-</span>
             <span className="font-bold text-lg">{teamCounts[match.t2_short_name] || 0}</span>
             <img src={match.t2_image} alt={match.t2_short_name} className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="font-bold">{creditsLeft.toFixed(1)}</p>
            <p className="text-xs opacity-80">Credits Left</p>
          </div>
        </div>
        <div className="w-full bg-black/20 rounded-full h-1.5 mt-3">
          <div className="bg-green-400 h-1.5 rounded-full" style={{ width: `${(totalPlayers / MAX_PLAYERS) * 100}%` }}></div>
        </div>
      </header>

      <div className="sticky top-[146px] bg-white dark:bg-slate-800 z-10 border-b border-gray-200 dark:border-slate-700">
        <div className="flex justify-around">
          {roles.map(role => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`py-3 px-2 text-sm font-semibold w-full transition-colors ${activeRole === role ? 'text-pink-600 dark:text-pink-500 border-b-2 border-pink-600 dark:border-pink-500' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {ROLE_SHORT_NAME[role]} ({roleCounts[role] || 0})
            </button>
          ))}
        </div>
      </div>
      
      <main className="flex-grow overflow-y-auto pb-24">
        <div className="p-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-slate-800/50 sticky top-[197px] z-[5]">
          Select {ROLE_LIMITS[activeRole].min}-{ROLE_LIMITS[activeRole].max} {activeRole}(s)
        </div>
        <div className="bg-white dark:bg-slate-800">
            <div className="grid grid-cols-3 p-2 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-slate-700">
                <div className="col-span-1">PLAYER</div>
                <div className="text-right">POINTS</div>
                <div className="text-right">CREDITS</div>
            </div>
            {filteredPlayers.map(player => {
                const isSelected = state.selectedPlayers.some(p => p.player_id === player.player_id);
                return (
                    <div key={player.player_id} onClick={() => handlePlayerToggle(player)}
                        className={`grid grid-cols-3 items-center p-2 border-b border-gray-200 dark:border-slate-700 cursor-pointer transition-colors ${isSelected ? 'bg-green-50 dark:bg-green-900/40' : 'hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}>
                        <div className="col-span-1 flex items-center">
                            <PlayerIcon className={`w-10 h-10 mr-2 ${player.team_short_name === match.t1_short_name ? 'text-blue-300 dark:text-blue-600' : 'text-yellow-300 dark:text-yellow-600'}`} />
                            <div>
                                <p className="font-bold text-sm truncate text-slate-800 dark:text-slate-200">{player.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{player.team_short_name} - {player.role.split('-')[0]}</p>
                            </div>
                        </div>
                        <div className="text-right text-gray-700 dark:text-gray-300">80</div>
                        <div className="flex items-center justify-end">
                            <span className="mr-4 font-semibold text-slate-700 dark:text-slate-200">{player.event_player_credit}</span>
                            <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${isSelected ? 'bg-green-500 border-green-500' : 'border-gray-400 dark:border-gray-500'}`}>
                                {isSelected && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      </main>

      <footer className="p-4 bg-white dark:bg-slate-800 sticky bottom-0 border-t border-gray-200 dark:border-slate-700 z-10 flex space-x-2">
        <button onClick={() => setIsPreviewOpen(true)} className="w-1/2 text-pink-600 dark:text-pink-500 border border-pink-600 dark:border-pink-500 font-bold py-3 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-colors flex items-center justify-center space-x-2">
            <FieldIcon className="w-5 h-5" />
            <span>Team Preview</span>
        </button>
        <Link to={proceedEnabled ? `/select-captain/${matchId}` : '#'}
          className={`w-1/2 text-center text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center ${proceedEnabled ? 'bg-pink-600 shadow-lg hover:bg-pink-700' : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'}`}>
          Proceed
        </Link>
      </footer>
      <Toast message={toastMessage} onClear={() => setToastMessage('')} />
      {match && <TeamPreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        players={state.selectedPlayers}
        captain={null}
        viceCaptain={null}
        match={match}
      />}
    </div>
  );
};

export default PickPlayers;