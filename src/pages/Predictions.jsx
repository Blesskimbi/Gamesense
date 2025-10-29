import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaFutbol, FaChartLine, FaBolt, FaCheckCircle, FaTrophy } from 'react-icons/fa';
import './Predictions.css';

function Predictions() {
  const location = useLocation();
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.homeTeam && location.state?.awayTeam) {
      setHomeTeam(location.state.homeTeam);
      setAwayTeam(location.state.awayTeam);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!homeTeam || !awayTeam) {
      setError('Please enter both team names');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call with realistic analysis
    setTimeout(() => {
      const mockPrediction = generateDetailedPrediction(homeTeam, awayTeam);
      setPrediction(mockPrediction);
      setLoading(false);
    }, 2000);
  };

  const generateDetailedPrediction = (home, away) => {
    const homeWinProb = Math.floor(Math.random() * 30) + 45;
    const drawProb = Math.floor(Math.random() * 15) + 20;
    const awayWinProb = 100 - homeWinProb - drawProb;

    const winner = homeWinProb > awayWinProb ? 'Home Win' : awayWinProb > homeWinProb ? 'Away Win' : 'Draw';
    const confidence = Math.max(homeWinProb, drawProb, awayWinProb);

    return {
      homeTeam: home,
      awayTeam: away,
      winner,
      confidence,
      probabilities: {
        homeWin: homeWinProb,
        draw: drawProb,
        awayWin: awayWinProb
      },
      stats: {
        expectedGoalsHome: (Math.random() * 2 + 0.5).toFixed(2),
        expectedGoalsAway: (Math.random() * 2 + 0.5).toFixed(2),
        homeForm: ['W', 'W', 'D', 'L', 'W'].sort(() => Math.random() - 0.5).slice(0, 5),
        awayForm: ['W', 'L', 'D', 'W', 'L'].sort(() => Math.random() - 0.5).slice(0, 5),
        homeGoalsLast10: Math.floor(Math.random() * 15) + 10,
        awayGoalsLast10: Math.floor(Math.random() * 15) + 8,
        homeConcededLast10: Math.floor(Math.random() * 10) + 5,
        awayConcededLast10: Math.floor(Math.random() * 10) + 6
      },
      markets: {
        overUnder: Math.random() > 0.5 ? 'Over 2.5' : 'Under 2.5',
        btts: Math.random() > 0.4 ? 'Yes' : 'No',
        corners: `Over ${Math.floor(Math.random() * 3) + 9}.5`,
        cards: `${Math.floor(Math.random() * 2) + 3}+ Cards`,
        likelyScore: `${Math.floor(Math.random() * 3) + 1}-${Math.floor(Math.random() * 2) + 1}`
      },
      insights: [
        `${home} has strong home advantage with 65% win rate at home`,
        `${away} averages ${(Math.random() * 1.5 + 1).toFixed(1)} goals per away game`,
        `Recent head-to-head shows ${Math.random() > 0.5 ? home : away} dominance`,
        `${home} has kept clean sheets in 40% of home matches`,
        `Expected corners: ${home} ${Math.floor(Math.random() * 3) + 5}, ${away} ${Math.floor(Math.random() * 3) + 3}`
      ]
    };
  };

  const getFormBadge = (result) => {
    if (result === 'W') return <Badge bg="success">W</Badge>;
    if (result === 'D') return <Badge bg="warning">D</Badge>;
    return <Badge bg="danger">L</Badge>;
  };

  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">
          <FaChartLine className="me-3" />
          AI Match Predictor
        </h1>
        <p className="text-muted">
          Enter team names and get instant AI-powered predictions with detailed analysis
        </p>
      </div>

      <Row>
        <Col lg={5} className="mb-4">
          <Card className="prediction-input-card">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <FaFutbol className="me-2" />
                Match Details
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Home Team</Form.Label>
                  <Form.Control
                    type="text"
                    value={homeTeam}
                    onChange={(e) => setHomeTeam(e.target.value)}
                    placeholder="e.g., Manchester United"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Away Team</Form.Label>
                  <Form.Control
                    type="text"
                    value={awayTeam}
                    onChange={(e) => setAwayTeam(e.target.value)}
                    placeholder="e.g., Liverpool"
                    required
                  />
                </Form.Group>

                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 btn-predict-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Analyzing Match...
                    </>
                  ) : (
                    <>
                      <FaBolt className="me-2" />
                      Generate AI Prediction
                    </>
                  )}
                </Button>
              </Form>

              <div className="info-box mt-4">
                <h6>📊 What We Analyze:</h6>
                <ul className="mb-0">
                  <li>Last 10 matches performance</li>
                  <li>Goals scored & conceded</li>
                  <li>Home/Away form</li>
                  <li>Head-to-head history</li>
                  <li>Expected goals (xG)</li>
                  <li>Corners & cards statistics</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7} className="mb-4">
          {prediction ? (
            <div className="prediction-results-container">
              {/* Main Prediction */}
              <Card className="result-card mb-4">
                <Card.Body className="text-center">
                  <div className="result-icon-wrapper">
                    <FaTrophy className="result-icon" />
                  </div>
                  <h2 className="prediction-winner">{prediction.winner}</h2>
                  <Badge bg="success" className="confidence-badge-large">
                    {prediction.confidence}% Confidence
                  </Badge>
                  <p className="mt-3 text-muted">
                    {prediction.homeTeam} vs {prediction.awayTeam}
                  </p>
                </Card.Body>
              </Card>

              {/* Win Probabilities */}
              <Card className="mb-4">
                <Card.Header>
                  <h6 className="mb-0">Win Probabilities</h6>
                </Card.Header>
                <Card.Body>
                  <div className="probability-item-new">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold">{prediction.homeTeam} Win</span>
                      <span className="text-success fw-bold">{prediction.probabilities.homeWin}%</span>
                    </div>
                    <div className="probability-bar-new">
                      <div 
                        className="probability-fill-new home-fill" 
                        style={{width: `${prediction.probabilities.homeWin}%`}}
                      />
                    </div>
                  </div>

                  <div className="probability-item-new">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold">Draw</span>
                      <span className="text-warning fw-bold">{prediction.probabilities.draw}%</span>
                    </div>
                    <div className="probability-bar-new">
                      <div 
                        className="probability-fill-new draw-fill" 
                        style={{width: `${prediction.probabilities.draw}%`}}
                      />
                    </div>
                  </div>

                  <div className="probability-item-new">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold">{prediction.awayTeam} Win</span>
                      <span className="text-danger fw-bold">{prediction.probabilities.awayWin}%</span>
                    </div>
                    <div className="probability-bar-new">
                      <div 
                        className="probability-fill-new away-fill" 
                        style={{width: `${prediction.probabilities.awayWin}%`}}
                      />
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Team Statistics */}
              <Card className="mb-4">
                <Card.Header>
                  <h6 className="mb-0">Team Form (Last 5 Matches)</h6>
                </Card.Header>
                <Card.Body>
                  <div className="team-form-row">
                    <span className="fw-bold">{prediction.homeTeam}:</span>
                    <div className="form-badges">
                      {prediction.stats.homeForm.map((result, i) => (
                        <span key={i}>{getFormBadge(result)}</span>
                      ))}
                    </div>
                  </div>
                  <div className="team-form-row">
                    <span className="fw-bold">{prediction.awayTeam}:</span>
                    <div className="form-badges">
                      {prediction.stats.awayForm.map((result, i) => (
                        <span key={i}>{getFormBadge(result)}</span>
                      ))}
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Advanced Markets */}
              <Card className="mb-4">
                <Card.Header>
                  <h6 className="mb-0">📊 Advanced Markets</h6>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6} className="mb-3">
                      <div className="market-box">
                        <div className="market-label">Over/Under Goals</div>
                        <div className="market-value">{prediction.markets.overUnder}</div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="market-box">
                        <div className="market-label">Both Teams Score</div>
                        <div className="market-value">{prediction.markets.btts}</div>
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <div className="market-box">
                        <div className="market-label">Corners</div>
                        <div className="market-value">{prediction.markets.corners}</div>
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <div className="market-box">
                        <div className="market-label">Cards</div>
                        <div className="market-value">{prediction.markets.cards}</div>
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <div className="market-box">
                        <div className="market-label">Likely Score</div>
                        <div className="market-value">{prediction.markets.likelyScore}</div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Key Insights */}
              <Card>
                <Card.Header>
                  <h6 className="mb-0">🔍 Key Insights</h6>
                </Card.Header>
                <Card.Body>
                  <ul className="insights-list">
                    {prediction.insights.map((insight, i) => (
                      <li key={i}>
                        <FaCheckCircle className="text-success me-2" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                  
                  <Alert variant="info" className="mt-3 mb-0">
                    <strong>💡 Pro Tip:</strong> Consider combining multiple markets for better value. 
                    Our AI suggests {prediction.winner} + {prediction.markets.overUnder} + {prediction.markets.btts}
                  </Alert>
                </Card.Body>
              </Card>
            </div>
          ) : (
            <Card className="empty-prediction-card">
              <Card.Body className="text-center py-5">
                <FaChartLine className="empty-icon" />
                <h4 className="mt-4">Ready to Predict</h4>
                <p className="text-muted">
                  Enter both team names and click "Generate AI Prediction" to see detailed analysis
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Predictions;