import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFantasyTeam } from '../context/FantasyTeamContext';
import { Player } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import PlayerIcon from '../components/icons/PlayerIcon';
import FieldIcon from '../components/icons/FieldIcon';
import TeamPreviewModal from '../components/TeamPreviewModal';
import { matches } from '../data/mockData';

const SelectCaptain = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useFantasyTeam();
  const { selectedPlayers } = state;
  const match = matches.find(m => m.id === parseInt(matchId || ''));


  const [captainId, setCaptainId] = useState<string | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!matchId || !match) return <div>Invalid Match</div>;

  const handleCaptainSelect = (player: Player) => {
    if (player.player_id === viceCaptainId) {
      setViceCaptainId(null);
    }
    setCaptainId(player.player_id);
  };
  
  const handleViceCaptainSelect = (player: Player) => {
    if (player.player_id === captainId) {
      setCaptainId(null);
    }
    setViceCaptainId(player.player_id);
  };

  const handleSaveTeam = () => {
    if (!captainId || !viceCaptainId) {
        alert("Please select a Captain and Vice-Captain");
        return;
    }
    const captain = selectedPlayers.find(p => p.player_id === captainId);
    const viceCaptain = selectedPlayers.find(p => p.player_id === viceCaptainId);

    if (captain && viceCaptain) {
        dispatch({ type: 'SET_CAPTAIN', payload: captain });
        dispatch({ type: 'SET_VICE_CAPTAIN', payload: viceCaptain });
        dispatch({ type: 'SAVE_TEAM', payload: { matchId: parseInt(matchId) }});
        navigate(`/my-teams/${matchId}`);
    }
  };

  const saveEnabled = captainId && viceCaptainId;
  const captain = selectedPlayers.find(p => p.player_id === captainId);
  const viceCaptain = selectedPlayers.find(p => p.player_id === viceCaptainId);


  return (
    <div className="flex flex-col h-screen bg-slate-100 dark:bg-slate-900">
      <header className="bg-indigo-700 dark:bg-slate-800 text-white p-4 sticky top-0 z-20 flex items-center shadow-md">
        <button onClick={() => navigate(`/pick-players/${matchId}`)} className="mr-4 p-1 rounded-full hover:bg-white/10 transition-colors" aria-label="Back to pick players">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Select Captain & Vice-Captain</h1>
      </header>
      
      <main className="flex-grow overflow-y-auto pb-24">
        <div className="p-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-800/50 sticky top-[68px] z-10">
          Choose your Captain and Vice-Captain
        </div>
        <div className="bg-white dark:bg-slate-800">
            <div className="grid grid-cols-4 p-2 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-slate-700">
                <div className="col-span-2">PLAYER</div>
                <div className="text-center">CAPTAIN</div>
                <div className="text-center">VICE-CAP</div>
            </div>
            {selectedPlayers.map(player => (
                <div key={player.player_id}
                    className="grid grid-cols-4 items-center p-2 border-b border-gray-200 dark:border-slate-700">
                    <div className="col-span-2 flex items-center">
                        <PlayerIcon className="w-10 h-10 mr-2 text-gray-300 dark:text-gray-600" />
                        <div>
                            <p className="font-bold text-sm truncate text-slate-800 dark:text-slate-200">{player.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{player.team_short_name} - {player.role.split('-')[0]}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <button 
                            onClick={() => handleCaptainSelect(player)}
                            disabled={viceCaptainId === player.player_id}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mx-auto font-bold transition-colors disabled:opacity-50
                                ${captainId === player.player_id 
                                    ? 'bg-pink-600 text-white border-pink-600' 
                                    : 'bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-300 border-gray-400 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-slate-600'}`}
                        >
                           C
                        </button>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={() => handleViceCaptainSelect(player)}
                            disabled={captainId === player.player_id}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mx-auto font-bold transition-colors disabled:opacity-50
                                ${viceCaptainId === player.player_id
                                    ? 'bg-slate-700 dark:bg-slate-500 text-white border-slate-700 dark:border-slate-500'
                                    : 'bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-300 border-gray-400 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-slate-600'}`}
                        >
                           VC
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </main>

      <footer className="p-4 bg-white dark:bg-slate-800 sticky bottom-0 border-t border-gray-200 dark:border-slate-700 z-10 flex space-x-2">
        <button onClick={() => setIsPreviewOpen(true)} className="w-1/2 text-pink-600 dark:text-pink-500 border border-pink-600 dark:border-pink-500 font-bold py-3 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-colors flex items-center justify-center space-x-2">
            <FieldIcon className="w-5 h-5" />
            <span>Team Preview</span>
        </button>
        <button onClick={handleSaveTeam}
          className={`w-1/2 text-white font-bold py-3 rounded-lg transition-colors ${saveEnabled ? 'bg-pink-600 shadow-lg hover:bg-pink-700' : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'}`}
          disabled={!saveEnabled}
        >
          Save Team
        </button>
      </footer>
      <TeamPreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        players={selectedPlayers}
        captain={captain || null}
        viceCaptain={viceCaptain || null}
        match={match}
      />
    </div>
  );
};

export default SelectCaptain;