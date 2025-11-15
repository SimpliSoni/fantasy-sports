
import { Match, Player, PlayerRole } from '../types';

export const matches: Match[] = [
  {
    id: 6432,
    match_name: 'MS vs PS',
    match_date: '2024-08-23T08:15+00:00',
    t1_name: 'Melbourne Stars',
    t1_short_name: 'MS',
    t1_image: 'https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png',
    t2_name: 'Perth Scorchers',
    t2_short_name: 'PS',
    t2_image: 'https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png',
  },
  {
    id: 6433,
    match_name: 'CSK vs KKR',
    match_date: '2024-08-24T14:00+00:00',
    t1_name: 'Chennai Super Kings',
    t1_short_name: 'CSK',
    t1_image: 'https://s3.ap-south-1.amazonaws.com/leaguex/team-images/ipl/CSK.png',
    t2_name: 'Kolkata Knight Riders',
    t2_short_name: 'KKR',
    t2_image: 'https://s3.ap-south-1.amazonaws.com/leaguex/team-images/ipl/KKR.png'
  },
   {
    id: 6434,
    match_name: 'SRH vs RCB',
    match_date: '2024-08-25T10:00+00:00',
    t1_name: 'Sunrisers Hyderabad',
    t1_short_name: 'SRH',
    t1_image: 'https://s3.ap-south-1.amazonaws.com/leaguex/team-images/ipl/SRH.png',
    t2_name: 'Royal Challengers Bangalore',
    t2_short_name: 'RCB',
    t2_image: 'https://s3.ap-south-1.amazonaws.com/leaguex/team-images/ipl/RCB.png'
  }
];

export const players: { [key: number]: Player[] } = {
  6432: [
    // Melbourne Stars (MS)
    { player_id: "1160", name: "Zahir Khan", role: PlayerRole.BOWL, team_short_name: "MS", event_player_credit: 8.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" },
    { player_id: "81", name: "Glenn Maxwell", role: PlayerRole.AR, team_short_name: "MS", event_player_credit: 10, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" },
    { player_id: "100", name: "Marcus Stoinis", role: PlayerRole.AR, team_short_name: "MS", event_player_credit: 9.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" },
    { player_id: "101", name: "Adam Zampa", role: PlayerRole.BOWL, team_short_name: "MS", event_player_credit: 9, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" },
    { player_id: "102", name: "Joe Clarke", role: PlayerRole.WK, team_short_name: "MS", event_player_credit: 8.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" },
    { player_id: "103", name: "Hilton Cartwright", role: PlayerRole.BAT, team_short_name: "MS", event_player_credit: 8.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" },
    { player_id: "104", name: "Nathan Coulter-Nile", role: PlayerRole.BOWL, team_short_name: "MS", event_player_credit: 8.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" },
    { player_id: "105", name: "Joe Burns", role: PlayerRole.BAT, team_short_name: "MS", event_player_credit: 8, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" },
    { player_id: "106", name: "Beau Webster", role: PlayerRole.BAT, team_short_name: "MS", event_player_credit: 7.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" },
    { player_id: "107", name: "Brody Couch", role: PlayerRole.BOWL, team_short_name: "MS", event_player_credit: 7, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" },
    { player_id: "108", name: "Clint Hinchliffe", role: PlayerRole.AR, team_short_name: "MS", event_player_credit: 6.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" },
    
    // Perth Scorchers (PS)
    { player_id: "43584", name: "Ashton Turner", role: PlayerRole.BAT, team_short_name: "PS", event_player_credit: 9, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" },
    { player_id: "55846", name: "Josh Inglis", role: PlayerRole.WK, team_short_name: "PS", event_player_credit: 8.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" },
    { player_id: "200", name: "Mitchell Marsh", role: PlayerRole.AR, team_short_name: "PS", event_player_credit: 10, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" },
    { player_id: "201", name: "Cameron Bancroft", role: PlayerRole.WK, team_short_name: "PS", event_player_credit: 9, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" },
    { player_id: "202", name: "Jason Behrendorff", role: PlayerRole.BOWL, team_short_name: "PS", event_player_credit: 9, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" },
    { player_id: "203", name: "Andrew Tye", role: PlayerRole.BOWL, team_short_name: "PS", event_player_credit: 9, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" },
    { player_id: "204", name: "Laurie Evans", role: PlayerRole.BAT, team_short_name: "PS", event_player_credit: 8.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" },
    { player_id: "205", name: "Colin Munro", role: PlayerRole.BAT, team_short_name: "PS", event_player_credit: 8.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" },
    { player_id: "206", name: "Kurtis Patterson", role: PlayerRole.BAT, team_short_name: "PS", event_player_credit: 8, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" },
    { player_id: "207", name: "Jhye Richardson", role: PlayerRole.BOWL, team_short_name: "PS", event_player_credit: 9.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" },
    { player_id: "208", name: "Ashton Agar", role: PlayerRole.AR, team_short_name: "PS", event_player_credit: 8.5, team_logo: "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" },
  ]
};
// Add empty player lists for other matches to prevent errors
players[6433] = [...players[6432]];
players[6433].forEach(p => p.team_short_name = Math.random() > 0.5 ? 'CSK' : 'KKR');
players[6434] = [...players[6432]];
players[6434].forEach(p => p.team_short_name = Math.random() > 0.5 ? 'SRH' : 'RCB');

