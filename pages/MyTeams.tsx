import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFantasyTeam } from '../context/FantasyTeamContext';
import { matches } from '../data/mockData';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import PlayerIcon from '../components/icons/PlayerIcon';
import { ROLE_SHORT_NAME } from '../constants';
import { PlayerRole, Team } from '../types';
import TeamPreviewModal from '../components/TeamPreviewModal';

const MyTeams = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useFantasyTeam();
  const [teamToPreview, setTeamToPreview] = useState<Team | null>(null);
  
  const match = matches.find(m => m.id === parseInt(matchId || ''));
  const userTeams = state.savedTeams[parseInt(matchId || '')] || [];

  useEffect(() => {
    dispatch({ type: 'RESET_CURRENT_TEAM' });
  }, [dispatch]);

  if (!match) {
    return <div>Match not found</div>;
  }

  const handleCreateTeam = () => {
    dispatch({ type: 'RESET_CURRENT_TEAM' });
    navigate(`/pick-players/${matchId}`);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex flex-col">
      <header className="bg-indigo-700 dark:bg-slate-800 text-white p-4 flex items-center sticky top-0 z-10 shadow-md">
        <button onClick={() => navigate('/')} className="mr-4 p-1 rounded-full hover:bg-white/10 transition-colors" aria-label="Back to matches">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-lg font-bold">{match.t1_short_name} VS {match.t2_short_name}</h1>
          <p className="text-xs opacity-80">02h 11m Left</p>
        </div>
      </header>
      <main className="flex-grow p-4">
        <h2 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">My Teams ({userTeams.length})</h2>
        {userTeams.length === 0 ? (
           <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">You haven't created any teams for this match yet.</p>
           </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userTeams.map((team, index) => {
                const roleCounts = team.players.reduce((acc, player) => {
                    const role = ROLE_SHORT_NAME[player.role as PlayerRole];
                    acc[role] = (acc[role] || 0) + 1;
                    return acc;
                }, {} as {[key: string]: number});

                return (
                    <div key={team.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-800 dark:text-gray-200">Team {index + 1}</h3>
                            <div className="flex space-x-3 text-gray-500 dark:text-gray-400">
                                {/* Icons for share, edit, copy can go here */}
                            </div>
                        </div>
                        <div className="flex items-center my-3 space-x-4 sm:space-x-6">
                            <div className="flex items-center space-x-2">
                                <PlayerIcon className="w-8 h-8 text-blue-400" />
                                <div>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{team.captain.name}</p>
                                    <p className="text-xs bg-black text-white px-2 py-0.5 rounded-full inline-block font-bold">C</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <PlayerIcon className="w-8 h-8 text-purple-400" />
                                <div>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{team.viceCaptain.name}</p>
                                    <p className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded-full inline-block font-bold">VC</p>
                                </div>
                            </div>
                        </div>
                         <div className="flex justify-between items-center mt-2 border-t border-gray-200 dark:border-slate-700 pt-3">
                            <div className="flex space-x-4 text-center">
                                <div><p className="text-xs text-gray-500 dark:text-gray-400">WK</p><p className="font-bold text-slate-700 dark:text-slate-200">{roleCounts.WK || 0}</p></div>
                                <div><p className="text-xs text-gray-500 dark:text-gray-400">BAT</p><p className="font-bold text-slate-700 dark:text-slate-200">{roleCounts.BAT || 0}</p></div>
                                <div><p className="text-xs text-gray-500 dark:text-gray-400">AR</p><p className="font-bold text-slate-700 dark:text-slate-200">{roleCounts.AR || 0}</p></div>
                                <div><p className="text-xs text-gray-500 dark:text-gray-400">BOWL</p><p className="font-bold text-slate-700 dark:text-slate-200">{roleCounts.BOWL || 0}</p></div>
                            </div>
                            <button onClick={() => setTeamToPreview(team)} className="text-sm font-semibold text-pink-600 dark:text-pink-500 border border-pink-600 dark:border-pink-500 rounded-md px-3 py-1.5 hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-colors">Team Preview</button>
                        </div>
                    </div>
                );
            })}
            </div>
        )}
      </main>
      <footer className="p-4 bg-white dark:bg-slate-800 sticky bottom-0 border-t border-gray-200 dark:border-slate-700">
        <button 
          onClick={handleCreateTeam}
          className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-pink-700 transition-colors"
        >
          Create New Team
        </button>
      </footer>
      {match && <TeamPreviewModal 
        isOpen={!!teamToPreview}
        onClose={() => setTeamToPreview(null)}
        players={teamToPreview?.players || []}
        captain={teamToPreview?.captain || null}
        viceCaptain={teamToPreview?.viceCaptain || null}
        match={match}
      />}
    </div>
  );
};

export default MyTeams;