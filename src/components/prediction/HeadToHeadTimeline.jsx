import { Card, Badge } from 'react-bootstrap';
import { FaCalendar, FaTrophy } from 'react-icons/fa';

function HeadToHeadTimeline({ h2hData, homeTeam, awayTeam }) {
  const getResultBadge = (winner) => {
    if (winner === 'Home') return <Badge bg="success">Home Win</Badge>;
    if (winner === 'Away') return <Badge bg="danger">Away Win</Badge>;
    return <Badge bg="warning">Draw</Badge>;
  };

  return (
    <Card className="h2h-timeline-card">
      <Card.Header>
        <h6 className="mb-0">
          <FaTrophy className="text-warning me-2" />
          Head-to-Head History
        </h6>
      </Card.Header>
      <Card.Body>
        <div className="h2h-summary mb-4">
          <div className="h2h-stats-row">
            <div className="h2h-stat">
              <div className="h2h-stat-value text-success">{h2hData.homeWins}</div>
              <div className="h2h-stat-label">{homeTeam} Wins</div>
            </div>
            <div className="h2h-stat">
              <div className="h2h-stat-value text-warning">{h2hData.draws}</div>
              <div className="h2h-stat-label">Draws</div>
            </div>
            <div className="h2h-stat">
              <div className="h2h-stat-value text-danger">{h2hData.awayWins}</div>
              <div className="h2h-stat-label">{awayTeam} Wins</div>
            </div>
          </div>
        </div>

        <h6 className="text-muted mb-3">Recent Meetings</h6>
        <div className="timeline">
          {h2hData.lastMeetings.map((meeting, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <FaCalendar className="text-muted me-2" />
                    <small className="text-muted">{meeting.date}</small>
                  </div>
                  {getResultBadge(meeting.winner)}
                </div>
                <div className="timeline-score mt-2">
                  <strong>{meeting.result}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h2h-insights mt-4 p-3" style={{
          background: 'rgba(62, 207, 142, 0.05)',
          border: '1px solid rgba(62, 207, 142, 0.2)',
          borderRadius: '8px'
        }}>
          <strong className="text-success">📊 Average Goals:</strong>
          <p className="mb-0 text-muted mt-2">
            {homeTeam}: {h2hData.homeGoalsAvg} goals per game • {awayTeam}: {h2hData.awayGoalsAvg} goals per game
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default HeadToHeadTimeline;