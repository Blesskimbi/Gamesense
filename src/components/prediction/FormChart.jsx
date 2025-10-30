import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function FormChart({ homeData, awayData, homeTeam, awayTeam }) {
  const data = homeData.map((item, index) => ({
    match: `M${item.match}`,
    [homeTeam]: item.points,
    [awayTeam]: awayData[index]?.points || 0
  }));

  return (
    <Card className="visualization-card">
      <Card.Header>
        <h6 className="mb-0">📈 Recent Form Trend (Last 10 Matches)</h6>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="match" stroke="#a0a0a0" />
            <YAxis stroke="#a0a0a0" />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(26, 26, 26, 0.95)', 
                border: '1px solid #3ecf8e',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={homeTeam} 
              stroke="#3ecf8e" 
              strokeWidth={3}
              dot={{ fill: '#3ecf8e', r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey={awayTeam} 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}

export default FormChart;