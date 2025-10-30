import { Card, ProgressBar } from 'react-bootstrap';
import { FaFire } from 'react-icons/fa';
import './MomentumBar.css';

function MomentumBar({ homeTeam, awayTeam, homeMomentum, awayMomentum }) {
  const total = parseFloat(homeMomentum) + parseFloat(awayMomentum);
  const homePercent = (parseFloat(homeMomentum) / total) * 100;
  const awayPercent = (parseFloat(awayMomentum) / total) * 100;

  return (
    <Card className="momentum-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="momentum-label">
            <FaFire className="text-success me-2" />
            <span className="fw-bold">{homeTeam}</span>
          </div>
          <h6 className="mb-0">⚡ Team Momentum</h6>
          <div className="momentum-label">
            <span className="fw-bold">{awayTeam}</span>
            <FaFire className="text-danger ms-2" />
          </div>
        </div>

        <div className="momentum-bars">
          <div className="momentum-bar-wrapper">
            <div className="momentum-value-home">{homeMomentum}/10</div>
            <ProgressBar 
              now={homePercent} 
              variant="success"
              className="momentum-progress home-momentum"
            />
          </div>
          <div className="momentum-vs">VS</div>
          <div className="momentum-bar-wrapper">
            <ProgressBar 
              now={awayPercent} 
              variant="danger"
              className="momentum-progress away-momentum"
            />
            <div className="momentum-value-away">{awayMomentum}/10</div>
          </div>
        </div>

        <div className="momentum-description mt-3 text-center">
          <small className="text-muted">
            {homePercent > awayPercent + 10 
              ? `${homeTeam} showing stronger momentum` 
              : awayPercent > homePercent + 10 
              ? `${awayTeam} showing stronger momentum`
              : 'Both teams evenly matched in momentum'}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MomentumBar;