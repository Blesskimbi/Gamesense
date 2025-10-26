const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';

async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API-Football Error:', error);
    throw error;
  }
}

// Get live matches
export async function getLiveMatches() {
  return await fetchFromAPI('/fixtures?live=all');
}

// Get matches for today
export async function getTodayMatches() {
  const today = new Date().toISOString().split('T')[0];
  return await fetchFromAPI(`/fixtures?date=${today}`);
}

// Get matches by date range
export async function getMatchesByDateRange(days = 7) {
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + days);
  
  const from = today.toISOString().split('T')[0];
  const to = endDate.toISOString().split('T')[0];
  
  return await fetchFromAPI(`/fixtures?from=${from}&to=${to}`);
}

// Get matches by league
export async function getLeagueMatches(leagueId, season = 2024) {
  return await fetchFromAPI(`/fixtures?league=${leagueId}&season=${season}`);
}

// Popular leagues
export const POPULAR_LEAGUES = {
  PREMIER_LEAGUE: 39,
  LA_LIGA: 140,
  BUNDESLIGA: 78,
  SERIE_A: 135,
  LIGUE_1: 61,
  CHAMPIONS_LEAGUE: 2,
  EUROPA_LEAGUE: 3
};

// Format match data
export function formatMatch(fixture) {
  const matchDate = new Date(fixture.fixture.date);
  
  return {
    id: fixture.fixture.id,
    
    // Teams
    homeTeam: fixture.teams.home.name,
    awayTeam: fixture.teams.away.name,
    homeTeamId: fixture.teams.home.id,
    awayTeamId: fixture.teams.away.id,
    homeTeamLogo: fixture.teams.home.logo,
    awayTeamLogo: fixture.teams.away.logo,
    
    // League
    league: fixture.league.name,
    leagueLogo: fixture.league.logo,
    leagueCountry: fixture.league.country,
    
    // Date & Time
    date: matchDate.toLocaleDateString(),
    time: matchDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    timestamp: matchDate.getTime(),
    
    // Status
    status: fixture.fixture.status.short,
    isLive: ['1H', '2H', 'HT', 'ET', 'P'].includes(fixture.fixture.status.short),
    isFinished: fixture.fixture.status.short === 'FT',
    isScheduled: ['TBD', 'NS'].includes(fixture.fixture.status.short),
    
    // Scores
    homeScore: fixture.goals.home || 0,
    awayScore: fixture.goals.away || 0,
    
    // Venue
    venue: fixture.fixture.venue.name,
    city: fixture.fixture.venue.city
  };
}

// Get popular upcoming matches (mixed from top leagues)
export async function getPopularUpcomingMatches() {
  try {
    const response = await getMatchesByDateRange(7);
    
    if (response.response && response.response.length > 0) {
      // Filter only scheduled matches from popular leagues
      const popularLeagueIds = Object.values(POPULAR_LEAGUES);
      
      const filteredMatches = response.response
        .filter(fixture => {
          const isPopularLeague = popularLeagueIds.includes(fixture.league.id);
          const isScheduled = ['TBD', 'NS', '1H', '2H', 'HT'].includes(fixture.fixture.status.short);
          return isPopularLeague && isScheduled;
        })
        .map(formatMatch)
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(0, 12);
      
      return { matches: filteredMatches };
    }
    
    return { matches: [] };
  } catch (error) {
    console.error('Error fetching popular matches:', error);
    throw error;
  }
}