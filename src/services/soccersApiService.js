const API_TOKEN = import.meta.env.VITE_SOCCERS_API_TOKEN;
const BASE_URL = 'https://api.soccersapi.com/v2.2';

async function fetchFromAPI(endpoint) {
  try {
    const url = `${BASE_URL}${endpoint}`;
    console.log('🔄 Fetching from SoccersAPI:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', response.status, errorText);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ API Response:', data);
    return data;
  } catch (error) {
    console.error('SoccersAPI Error:', error);
    throw error;
  }
}

// Get live matches
export async function getLiveMatches() {
  return await fetchFromAPI('/matches/live');
}

// Get today's matches
export async function getTodayMatches() {
  const today = new Date().toISOString().split('T')[0];
  return await fetchFromAPI(`/matches/${today}`);
}

// Get upcoming matches (next 7 days)
export async function getUpcomingMatches() {
  try {
    const matches = [];
    const today = new Date();
    
    // Get matches for next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      try {
        const response = await fetchFromAPI(`/matches/${dateStr}`);
        if (response.data) {
          matches.push(...response.data);
        }
      } catch (err) {
        console.log(`No matches for ${dateStr}`);
      }
    }
    
    return { data: matches };
  } catch (error) {
    throw error;
  }
}

// Get matches by competition
export async function getCompetitionMatches(competitionId) {
  return await fetchFromAPI(`/competitions/${competitionId}/matches`);
}

// Popular competition IDs (you may need to adjust these)
export const POPULAR_COMPETITIONS = {
  PREMIER_LEAGUE: 1,
  LA_LIGA: 2,
  BUNDESLIGA: 3,
  SERIE_A: 4,
  LIGUE_1: 5,
  CHAMPIONS_LEAGUE: 6
};

// Format match data
export function formatMatch(match) {
  const matchDate = new Date(match.scheduled);
  
  return {
    id: match.id,
    
    // Teams
    homeTeam: match.home_team?.name || 'TBD',
    awayTeam: match.away_team?.name || 'TBD',
    homeTeamId: match.home_team?.id,
    awayTeamId: match.away_team?.id,
    homeTeamLogo: match.home_team?.logo || null,
    awayTeamLogo: match.away_team?.logo || null,
    
    // League
    league: match.competition?.name || 'Unknown',
    leagueLogo: match.competition?.logo || null,
    
    // Date & Time
    date: matchDate.toLocaleDateString(),
    time: matchDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    timestamp: matchDate.getTime(),
    
    // Status
    status: match.status_type,
    isLive: match.status_type === 'inplay',
    isFinished: match.status_type === 'finished',
    isScheduled: match.status_type === 'notstarted',
    
    // Scores
    homeScore: match.home_score || 0,
    awayScore: match.away_score || 0,
    
    // Venue
    venue: match.venue?.name || 'TBD',
    city: match.venue?.city || ''
  };
}

// Get popular upcoming matches
export async function getPopularUpcomingMatches() {
  try {
    const response = await getUpcomingMatches();
    
    if (response.data && response.data.length > 0) {
      const formattedMatches = response.data
        .filter(match => match.status_type === 'notstarted' || match.status_type === 'inplay')
        .map(formatMatch)
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(0, 12);
      
      return { matches: formattedMatches };
    }
    
    return { matches: [] };
  } catch (error) {
    console.error('Error fetching popular matches:', error);
    throw error;
  }
}