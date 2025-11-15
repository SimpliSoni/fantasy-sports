import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import UpcomingMatches from './pages/UpcomingMatches';
import PickPlayers from './pages/PickPlayers';
import SelectCaptain from './pages/SelectCaptain';
import MyTeams from './pages/MyTeams';
import { FantasyTeamProvider } from './context/FantasyTeamContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <FantasyTeamProvider>
        <div className="max-w-screen-md mx-auto bg-white dark:bg-slate-900 min-h-screen shadow-2xl font-sans">
          <HashRouter>
            <Routes>
              <Route path="/" element={<UpcomingMatches />} />
              <Route path="/my-teams/:matchId" element={<MyTeams />} />
              <Route path="/pick-players/:matchId" element={<PickPlayers />} />
              <Route path="/select-captain/:matchId" element={<SelectCaptain />} />
            </Routes>
          </HashRouter>
        </div>
      </FantasyTeamProvider>
    </ThemeProvider>
  );
}

export default App;