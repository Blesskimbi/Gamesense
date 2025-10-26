const BASE_URL = '/api/football';

async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Football API Error:', error);
    throw error;
  }
}

// Get matches from specific competitions (major leagues only)
export async function getPopularMatches() {
  try {
    const competitions = ['PL', 'PD', 'BL1', 'SA', 'FL1', 'CL']; // Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 10); // Next 10 days

    const dateFrom = today.toISOString().split('T')[0];
    const dateTo = nextWeek.toISOString().split('T')[0];

    // Get matches from date range
    const response = await fetchFromAPI(`/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    
    // Filter only scheduled and in-play matches from popular competitions
    const popularMatches = response.matches.filter(match => 
      (match.status === 'SCHEDULED' || match.status === 'IN_PLAY' || match.status === 'TIMED') &&
      competitions.includes(match.competition.code)
    );

    return { matches: popularMatches };
  } catch (error) {
    console.error('Error fetching popular matches:', error);
    throw error;
  }
}

// Get today's matches only
export async function getTodayMatches() {
  const today = new Date().toISOString().split('T')[0];
  return await fetchFromAPI(`/matches?date=${today}`);
}

// Get live matches only
export async function getLiveMatches() {
  try {
    const response = await getTodayMatches();
    const liveMatches = response.matches.filter(match => match.status === 'IN_PLAY');
    return { matches: liveMatches };
  } catch (error) {
    throw error;
  }
}

// Get matches for next 7 days
export async function getUpcomingMatches() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const dateFrom = today.toISOString().split('T')[0];
  const dateTo = nextWeek.toISOString().split('T')[0];

  return await fetchFromAPI(`/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`);
}

// Get specific competition matches
export async function getCompetitionMatches(competitionCode) {
  return await fetchFromAPI(`/competitions/${competitionCode}/matches?status=SCHEDULED`);
}

// Format match data
export function formatMatchData(match) {
  const matchDate = new Date(match.utcDate);
  const now = new Date();
  
  return {
    id: match.id,
    homeTeam: match.homeTeam.name,
    awayTeam: match.awayTeam.name,
    homeTeamId: match.homeTeam.id,
    awayTeamId: match.awayTeam.id,
    homeTeamCrest: match.homeTeam.crest,
    awayTeamCrest: match.awayTeam.crest,
    competition: match.competition.name,
    competitionEmblem: match.competition.emblem,
    date: matchDate.toLocaleDateString(),
    time: matchDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    }),
    status: match.status,
    isLive: match.status === 'IN_PLAY',
    homeScore: match.score?.fullTime?.home || 0,
    awayScore: match.score?.fullTime?.away || 0,
    venue: match.venue || 'TBD',
    utcDate: match.utcDate,
    isUpcoming: matchDate > now
  };
}

// Competition codes
export const COMPETITIONS = {
  PREMIER_LEAGUE: 'PL',
  LA_LIGA: 'PD',
  BUNDESLIGA: 'BL1',
  SERIE_A: 'SA',
  LIGUE_1: 'FL1',
  CHAMPIONS_LEAGUE: 'CL',
  EUROPA_LEAGUE: 'EL'
};