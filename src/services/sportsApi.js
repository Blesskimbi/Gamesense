const BASE_URL = '/api/football';

async function fetchFromAPI(endpoint) {
  try {
    console.log('🔄 Fetching:', BASE_URL + endpoint);
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', response.status, errorText);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ API Success:', data);
    return data;
  } catch (error) {
    console.error('Football API Error:', error);
    throw error;
  }
}

// Get matches happening today
export async function getTodayMatches() {
  const today = new Date().toISOString().split('T')[0];
  return await fetchFromAPI(`/matches?date=${today}`);
}

// Get matches for next 10 days (upcoming)
export async function getUpcomingMatches() {
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 10);

  const dateFrom = today.toISOString().split('T')[0];
  const dateTo = endDate.toISOString().split('T')[0];

  return await fetchFromAPI(`/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`);
}

// Format match data for our app
export function formatMatch(match) {
  const matchDate = new Date(match.utcDate);

  return {
    id: match.id,
    
    // Teams
    homeTeam: match.homeTeam.name,
    awayTeam: match.awayTeam.name,
    homeTeamId: match.homeTeam.id,
    awayTeamId: match.awayTeam.id,
    homeTeamLogo: match.homeTeam.crest,
    awayTeamLogo: match.awayTeam.crest,
    
    // League
    league: match.competition.name,
    leagueLogo: match.competition.emblem,
    
    // Date & Time
    date: matchDate.toLocaleDateString(),
    time: matchDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    timestamp: matchDate.getTime(),
    
    // Status
    status: match.status,
    isLive: match.status === 'IN_PLAY',
    isFinished: match.status === 'FINISHED',
    isScheduled: match.status === 'TIMED' || match.status === 'SCHEDULED',
    
    // Scores
    homeScore: match.score?.fullTime?.home || 0,
    awayScore: match.score?.fullTime?.away || 0,
    
    // Additional
    venue: match.venue || 'TBD',
    utcDate: match.utcDate
  };
}

// Get popular matches from top leagues
export async function getPopularMatches() {
  try {
    const response = await getUpcomingMatches();
    
    if (response.matches && response.matches.length > 0) {
      // Filter only upcoming or live matches
      const filteredMatches = response.matches
        .filter(match => 
          match.status !== 'FINISHED' && 
          match.status !== 'POSTPONED' &&
          match.status !== 'CANCELLED'
        )
        .map(formatMatch)
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(0, 12);
      
      return { matches: filteredMatches };
    }
    
    return { matches: [] };
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
}