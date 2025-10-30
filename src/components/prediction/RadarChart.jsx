import { Card } from 'react-bootstrap';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function TeamRadarChart({ homeData, awayData, homeTeam, awayTeam }) {
  const data = [
    { stat: 'Attack', [homeTeam]: homeData.attack, [awayTeam]: awayData.attack, max: 100 },
    { stat: 'Defense', [homeTeam]: homeData.defense, [awayTeam]: awayData.defense, max: 100 },
    { stat: 'Possession', [homeTeam]: homeData.possession, [awayTeam]: awayData.possession, max: 100 },
    { stat: 'Passing', [homeTeam]: homeData.passing, [awayTeam]: awayData.passing, max: 100 },
    { stat: 'Intensity', [homeTeam]: homeData.intensity, [awayTeam]: awayData.intensity, max: 100 }
  ];

  return (
    <Card className="visualization-card">
      <Card.Header>
        <h6 className="mb-0">🎯 Team Comparison Radar</h6>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.2)" />
            <PolarAngleAxis dataKey="stat" stroke="#a0a0a0" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#a0a0a0" />
            <Radar 
              name={homeTeam} 
              dataKey={homeTeam} 
              stroke="#3ecf8e" 
              fill="#3ecf8e" 
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar 
              name={awayTeam} 
              dataKey={awayTeam} 
              stroke="#ef4444" 
              fill="#ef4444" 
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(26, 26, 26, 0.95)', 
                border: '1px solid #3ecf8e',
                borderRadius: '8px'
              }} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}

export default TeamRadarChart;