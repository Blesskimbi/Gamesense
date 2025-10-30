import { Card, Table, Badge } from 'react-bootstrap';
import { FaRobot, FaChartBar, FaCalculator } from 'react-icons/fa';

function ModelComparison({ comparison }) {
  const models = [
    { name: 'Our AI Model', icon: FaRobot, color: 'success', data: comparison.ourModel },
    { name: 'Elo Rating', icon: FaChartBar, color: 'primary', data: comparison.eloModel },
    { name: 'Poisson Model', icon: FaCalculator, color: 'info', data: comparison.poissonModel }
  ];

  return (
    <Card className="model-comparison-card">
      <Card.Header>
        <h6 className="mb-0">🤖 AI Model Comparison</h6>
        <small className="text-muted">Compare predictions across different algorithms</small>
      </Card.Header>
      <Card.Body>
        <Table responsive hover className="comparison-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Home Win</th>
              <th>Draw</th>
              <th>Away Win</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, index) => (
              <tr key={index}>
                <td>
                  <model.icon className={`text-${model.color} me-2`} />
                  <strong>{model.name}</strong>
                </td>
                <td>
                  <Badge bg="success" className="probability-badge">
                    {model.data.homeWin.toFixed(1)}%
                  </Badge>
                </td>
                <td>
                  <Badge bg="warning" className="probability-badge">
                    {model.data.draw.toFixed(1)}%
                  </Badge>
                </td>
                <td>
                  <Badge bg="danger" className="probability-badge">
                    {model.data.awayWin.toFixed(1)}%
                  </Badge>
                </td>
                <td>
                  <div className="confidence-indicator">
                    {Math.max(model.data.homeWin, model.data.draw, model.data.awayWin).toFixed(0)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="consensus-section mt-3">
          <h6 className="text-success">✓ Consensus Prediction</h6>
          <p className="text-muted mb-0">
            All models agree: <strong className="text-success">
              {comparison.consensus.homeWin > Math.max(comparison.consensus.draw, comparison.consensus.awayWin) 
                ? 'Home Win' 
                : comparison.consensus.awayWin > Math.max(comparison.consensus.draw, comparison.consensus.homeWin)
                ? 'Away Win'
                : 'Draw'}
            </strong> is most likely
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ModelComparison;