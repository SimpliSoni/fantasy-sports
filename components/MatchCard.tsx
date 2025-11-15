import React from 'react';
import { Link } from 'react-router-dom';
import { Match } from '../types';

const MatchCard = React.memo(({ match }: { match: Match }) => (
  <Link to={`/my-teams/${match.id}`} className="block bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{`${match.id}th IPL Match`}</div>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3 text-center w-2/5">
        <img src={match.t1_image} alt={match.t1_name} className="w-12 h-12" />
        <span className="font-bold text-gray-800 dark:text-gray-200">{match.t1_short_name}</span>
      </div>
      <div className="text-gray-500 dark:text-gray-400 font-semibold text-sm">vs</div>
      <div className="flex items-center space-x-3 text-center w-2/5 justify-end">
        <span className="font-bold text-gray-800 dark:text-gray-200">{match.t2_short_name}</span>
        <img src={match.t2_image} alt={match.t2_name} className="w-12 h-12" />
      </div>
    </div>
  </Link>
));

export default MatchCard;