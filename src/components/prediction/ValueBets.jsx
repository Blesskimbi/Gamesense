import { Card, Alert, Table, Badge } from 'react-bootstrap';
import { FaDollarSign, FaArrowUp, FaTrophy } from 'react-icons/fa';

function ValueBets({ valueBets }) {
  if (!valueBets || valueBets.length === 0) {
    return (
      <Card className="value-bets-card">
        <Card.Header>
          <h6 className="mb-0">💰 Value Bet Analysis</h6>
        </Card.Header>
        <Card.Body>
          <Alert variant="info" className="mb-0">
            No significant value bets detected. Our predictions align with bookmaker odds.
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="value-bets-card">
      <Card.Header>
        <h6 className="mb-0">
          <FaDollarSign className="text-warning me-2" />
          Value Bet Opportunities
        </h6>
        <small className="text-muted">Where our model finds betting value</small>
      </Card.Header>
      <Card.Body>
        <Alert variant="warning" className="mb-3">
          <strong>⚠️ Disclaimer:</strong> Value bets are mathematical calculations only. 
          Always gamble responsibly and within your means.
        </Alert>

        <Table responsive className="value-table">
          <thead>
            <tr>
              <th>Outcome</th>
              <th>Our Probability</th>
              <th>Bookmaker Odds</th>
              <th>Value Edge</th>
              <th>Potential ROI</th>
            </tr>
          </thead>
          <tbody>
            {valueBets.map((bet, index) => (
              <tr key={index} className="value-row">
                <td>
                  <strong className="text-success">{bet.outcome}</strong>
                  <br />
                  <Badge bg="success" className="mt-1">
                    <FaTrophy className="me-1" />
                    {bet.recommendation}
                  </Badge>
                </td>
                <td>
                  <div className="probability-display">
                    <strong className="text-success">{bet.ourProbability}%</strong>
                  </div>
                </td>
                <td>
                  <Badge bg="dark" className="odds-badge">
                    {bet.bookmakerOdds}
                  </Badge>
                  <br />
                  <small className="text-muted">({bet.impliedProbability}%)</small>
                </td>
                <td>
                  <Badge bg="success" className="value-badge">
                    <FaArrowUp className="me-1" />
                    +{bet.value}%
                  </Badge>
                </td>
                <td>
                  <strong className="text-success">+{bet.potentialROI}%</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="value-explanation mt-3 p-3" style={{
          background: 'rgba(62, 207, 142, 0.05)',
          border: '1px solid rgba(62, 207, 142, 0.2)',
          borderRadius: '8px'
        }}>
          <h6 className="text-success">💡 What is a Value Bet?</h6>
          <p className="mb-0 text-muted">
            A value bet occurs when our AI model calculates a higher probability than what 
            bookmaker odds suggest. The "edge" represents your theoretical advantage.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ValueBets;