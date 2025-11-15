import React, { useEffect } from 'react';
import { matches } from '../data/mockData';
import { useFantasyTeam } from '../context/FantasyTeamContext';
import ThemeToggle from '../components/ThemeToggle';
import MatchCard from '../components/MatchCard';

const UpcomingMatches = () => {
  const { dispatch } = useFantasyTeam();

  useEffect(() => {
    dispatch({ type: 'RESET_CURRENT_TEAM' });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
            <div className="text-left">
                <div className="font-semibold">Bhupender Singh</div>
                <div className="text-sm opacity-80">₹12,120.99</div>
            </div>
            <h1 className="text-xl font-bold">Fantasy Sports</h1>
            <ThemeToggle />
        </div>
      </header>
      <main className="p-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Upcoming Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
         <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg text-center">
            <h3 className="font-bold text-lg">MAKE YOUR TEAM & PLAY</h3>
            <p className="text-sm">WIN UPTO ₹1,00,000</p>
            <button className="mt-2 bg-white text-pink-600 font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition-colors">Make your team now</button>
        </div>
      </main>
    </div>
  );
};

export default UpcomingMatches;