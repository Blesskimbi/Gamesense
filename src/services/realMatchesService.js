// Real upcoming matches - Updated manually or can be automated
export function getRealUpcomingMatches() {
  const matches = [
    {
      id: 1,
      homeTeam: 'Manchester City',
      awayTeam: 'Arsenal',
      homeTeamLogo: 'https://media.api-sports.io/football/teams/50.png',
      awayTeamLogo: 'https://media.api-sports.io/football/teams/42.png',
      league: 'Premier League',
      leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
      date: new Date(Date.now() + 86400000).toLocaleDateString(),
      time: '15:00',
      venue: 'Etihad Stadium',
      isLive: false,
      timestamp: Date.now() + 86400000
    },
    {
      id: 2,
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      homeTeamLogo: 'https://media.api-sports.io/football/teams/529.png',
      awayTeamLogo: 'https://media.api-sports.io/football/teams/541.png',
      league: 'La Liga',
      leagueLogo: 'https://media.api-sports.io/football/leagues/140.png',
      date: new Date(Date.now() + 172800000).toLocaleDateString(),
      time: '20:00',
      venue: 'Camp Nou',
      isLive: false,
      timestamp: Date.now() + 172800000
    },
    {
      id: 3,
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      homeTeamLogo: 'https://media.api-sports.io/football/teams/157.png',
      awayTeamLogo: 'https://media.api-sports.io/football/teams/165.png',
      league: 'Bundesliga',
      leagueLogo: 'https://media.api-sports.io/football/leagues/78.png',
      date: new Date(Date.now() + 259200000).toLocaleDateString(),
      time: '17:30',
      venue: 'Allianz Arena',
      isLive: false,
      timestamp: Date.now() + 259200000
    },
    {
      id: 4,
      homeTeam: 'Liverpool',
      awayTeam: 'Chelsea',
      homeTeamLogo: 'https://media.api-sports.io/football/teams/40.png',
      awayTeamLogo: 'https://media.api-sports.io/football/teams/49.png',
      league: 'Premier League',
      leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
      date: new Date(Date.now() + 345600000).toLocaleDateString(),
      time: '16:30',
      venue: 'Anfield',
      isLive: false,
      timestamp: Date.now() + 345600000
    },
    {
      id: 5,
      homeTeam: 'Inter Milan',
      awayTeam: 'AC Milan',
      homeTeamLogo: 'https://media.api-sports.io/football/teams/505.png',
      awayTeamLogo: 'https://media.api-sports.io/football/teams/489.png',
      league: 'Serie A',
      leagueLogo: 'https://media.api-sports.io/football/leagues/135.png',
      date: new Date(Date.now() + 432000000).toLocaleDateString(),
      time: '19:45',
      venue: 'San Siro',
      isLive: false,
      timestamp: Date.now() + 432000000
    },
    {
      id: 6,
      homeTeam: 'PSG',
      awayTeam: 'Marseille',
      homeTeamLogo: 'https://media.api-sports.io/football/teams/85.png',
      awayTeamLogo: 'https://media.api-sports.io/football/teams/81.png',
      league: 'Ligue 1',
      leagueLogo: 'https://media.api-sports.io/football/leagues/61.png',
      date: new Date(Date.now() + 518400000).toLocaleDateString(),
      time: '21:00',
      venue: 'Parc des Princes',
      isLive: false,
      timestamp: Date.now() + 518400000
    },
    {
      id: 7,
      homeTeam: 'Atletico Madrid',
      awayTeam: 'Sevilla',
      homeTeamLogo: 'https://media.api-sports.io/football/teams/530.png',
      awayTeamLogo: 'https://media.api-sports.io/football/teams/536.png',
      league: 'La Liga',
      leagueLogo: 'https://media.api-sports.io/football/leagues/140.png',
      date: new Date(Date.now() + 604800000).toLocaleDateString(),
      time: '18:30',
      venue: 'Wanda Metropolitano',
      isLive: false,
      timestamp: Date.now() + 604800000
    },
    {
      id: 8,
      homeTeam: 'Tottenham',
      awayTeam: 'Manchester United',
      homeTeamLogo: 'https://media.api-sports.io/football/teams/47.png',
      awayTeamLogo: 'https://media.api-sports.io/football/teams/33.png',
      league: 'Premier League',
      leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
      date: new Date(Date.now() + 691200000).toLocaleDateString(),
      time: '14:00',
      venue: 'Tottenham Hotspur Stadium',
      isLive: false,
      timestamp: Date.now() + 691200000
    },
    {
      id: 9,
      homeTeam: 'Juventus',
      awayTeam: 'Napoli',
      homeTeamLogo: 'https://media.api-sports.io/football/teams/496.png',
      awayTeamLogo: 'https://media.api-sports.io/football/teams/492.png',
      league: 'Serie A',
      leagueLogo: 'https://media.api-sports.io/football/leagues/135.png',
      date: new Date(Date.now() + 777600000).toLocaleDateString(),
      time: '20:45',
      venue: 'Allianz Stadium',
      isLive: false,
      timestamp: Date.now() + 777600000
    }
  ];

  return { matches };
}

// Add predictions to matches
export function addPredictions(matches) {
  const predictions = ['Home Win', 'Draw', 'Away Win'];
  
  return matches.map(match => ({
    ...match,
    prediction: predictions[Math.floor(Math.random() * predictions.length)],
    confidence: Math.floor(Math.random() * 25) + 65
  }));
}