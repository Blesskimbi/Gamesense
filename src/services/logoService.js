// Get team logo from API or fallback
export function getTeamLogo(teamName, crestUrl) {
  // If we have the crest URL from API, use it
  if (crestUrl && crestUrl !== '') {
    return crestUrl;
  }
  
  // Fallback to placeholder with team initial
  return null; // Return null to show letter fallback
}

// Get league logo
export function getLeagueLogo(competitionName, emblemUrl) {
  if (emblemUrl && emblemUrl !== '') {
    return emblemUrl;
  }
  
  return null;
}

// Generate gradient color based on team name
export function getTeamColor(teamName) {
  const colors = [
    ['#3ecf8e', '#2da876'],
    ['#60a5fa', '#3b82f6'],
    ['#f59e0b', '#d97706'],
    ['#ef4444', '#dc2626'],
    ['#8b5cf6', '#7c3aed'],
    ['#ec4899', '#db2777']
  ];
  
  const hash = teamName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}