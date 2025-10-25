import { Container, Row, Col, Card, Form, Button, Badge, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { FaFutbol, FaChartLine, FaBolt, FaCheckCircle } from 'react-icons/fa';
import './Predictions.css';

function Predictions() {
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    venue: 'home',
    homeForm: '',
    awayForm: '',
    homeGoals: '',
    awayGoals: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const mockPrediction = {
        result: 'Home Win',
        confidence: 72,
        probabilities: {
          homeWin: 72,
          draw: 18,
          awayWin: 10
        },
        overUnder: 'Over 2.5',
        btts: 'Yes',
        exactScore: '2-1',
        reasoning: [
          'Strong home advantage detected (+15% win probability)',
          'Home team has superior recent form (4W 1D vs 2W 2L 1D)',
          'Historical head-to-head favors home team (60% win rate)',
          'Home team averages more goals per game (2.3 vs 1.8)'
        ]
      };
      setPrediction(mockPrediction);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setPrediction(null);
    setFormData({
      homeTeam: '',
      awayTeam: '',
      venue: 'home',
      homeForm: '',
      awayForm: '',
      homeGoals: '',
      awayGoals: ''
    });
  };

  return (
    <div className="predictions-page">
      <Container>
        <div className="page-header">
          <div className="header-content">
            <Badge className="header-badge">
              <FaBolt className="me-2" />
              AI-Powered
            </Badge>
            <h1 className="page-title">
              Match Prediction Engine
            </h1>
            <p className="page-subtitle">
              Enter match details and get instant AI-powered predictions with confidence scores
            </p>
          </div>
        </div>

        <Row>
          <Col lg={6} className="mb-4">
            <Card className="prediction-form-card">
              <Card.Header>
                <div className="card-header-content">
                  <FaFutbol className="header-icon" />
                  <div>
                    <h5 className="card-title-custom">Match Details</h5>
                    <p className="card-subtitle-custom">Fill in the information below</p>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <div className="form-section">
                    <h6 className="form-section-title">Teams</h6>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Home Team</Form.Label>
                      <Form.Control
                        type="text"
                        name="homeTeam"
                        value={formData.homeTeam}
                        onChange={handleChange}
                        placeholder="e.g., Manchester United"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Away Team</Form.Label>
                      <Form.Control
                        type="text"
                        name="awayTeam"
                        value={formData.awayTeam}
                        onChange={handleChange}
                        placeholder="e.g., Liverpool"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Match Venue</Form.Label>
                      <Form.Select
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                      >
                        <option value="home">Home</option>
                        <option value="away">Away</option>
                        <option value="neutral">Neutral Ground</option>
                      </Form.Select>
                    </Form.Group>
                  </div>

                  <div className="form-section">
                    <h6 className="form-section-title">Recent Form</h6>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Home Team Form</Form.Label>
                          <Form.Control
                            type="text"
                            name="homeForm"
                            value={formData.homeForm}
                            onChange={handleChange}
                            placeholder="WWDLW"
                            maxLength="5"
                          />
                          <Form.Text>Last 5 matches (W/D/L)</Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Away Team Form</Form.Label>
                          <Form.Control
                            type="text"
                            name="awayForm"
                            value={formData.awayForm}
                            onChange={handleChange}
                            placeholder="WDLWL"
                            maxLength="5"
                          />
                          <Form.Text>Last 5 matches (W/D/L)</Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  <div className="form-section">
                    <h6 className="form-section-title">Goal Statistics</h6>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Home Avg Goals/Game</Form.Label>
                          <Form.Control
                            type="number"
                            step="0.1"
                            name="homeGoals"
                            value={formData.homeGoals}
                            onChange={handleChange}
                            placeholder="2.3"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Away Avg Goals/Game</Form.Label>
                          <Form.Control
                            type="number"
                            step="0.1"
                            name="awayGoals"
                            value={formData.awayGoals}
                            onChange={handleChange}
                            placeholder="1.8"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  <div className="form-actions">
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-predict"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            className="me-2"
                          />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FaBolt className="me-2" />
                          Generate Prediction
                        </>
                      )}
                    </Button>
                    
                    {prediction && (
                      <Button
                        variant="outline-secondary"
                        onClick={handleReset}
                        className="btn-reset"
                      >
                        Reset Form
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-4">
            {prediction ? (
              <Card className="results-card">
                <Card.Header>
                  <div className="card-header-content">
                    <FaChartLine className="header-icon success" />
                    <div>
                      <h5 className="card-title-custom">Prediction Results</h5>
                      <p className="card-subtitle-custom">AI Analysis Complete</p>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="main-prediction">
                    <div className="prediction-icon">
                      <FaCheckCircle />
                    </div>
                    <h2 className="prediction-result">{prediction.result}</h2>
                    <div className="confidence-badge">
                      {prediction.confidence}% Confidence
                    </div>
                  </div>

                  <div className="probabilities-section">
                    <h6 className="section-heading">Win Probabilities</h6>
                    
                    <div className="probability-item">
                      <div className="probability-header">
                        <span className="probability-label">Home Win</span>
                        <span className="probability-value">{prediction.probabilities.homeWin}%</span>
                      </div>
                      <div className="probability-bar">
                        <div 
                          className="probability-fill home-win" 
                          style={{width: `${prediction.probabilities.homeWin}%`}}
                        ></div>
                      </div>
                    </div>

                    <div className="probability-item">
                      <div className="probability-header">
                        <span className="probability-label">Draw</span>
                        <span className="probability-value">{prediction.probabilities.draw}%</span>
                      </div>
                      <div className="probability-bar">
                        <div 
                          className="probability-fill draw" 
                          style={{width: `${prediction.probabilities.draw}%`}}
                        ></div>
                      </div>
                    </div>

                    <div className="probability-item">
                      <div className="probability-header">
                        <span className="probability-label">Away Win</span>
                        <span className="probability-value">{prediction.probabilities.awayWin}%</span>
                      </div>
                      <div className="probability-bar">
                        <div 
                          className="probability-fill away-win" 
                          style={{width: `${prediction.probabilities.awayWin}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="additional-predictions">
                    <h6 className="section-heading">Additional Markets</h6>
                    <Row>
                      <Col md={4} className="mb-3">
                        <div className="market-card">
                          <div className="market-label">Over/Under</div>
                          <div className="market-value">{prediction.overUnder}</div>
                        </div>
                      </Col>
                      <Col md={4} className="mb-3">
                        <div className="market-card">
                          <div className="market-label">BTTS</div>
                          <div className="market-value">{prediction.btts}</div>
                        </div>
                      </Col>
                      <Col md={4} className="mb-3">
                        <div className="market-card">
                          <div className="market-label">Likely Score</div>
                          <div className="market-value">{prediction.exactScore}</div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="reasoning-section">
                    <h6 className="section-heading">Key Insights</h6>
                    <ul className="reasoning-list">
                      {prediction.reasoning.map((reason, index) => (
                        <li key={index} className="reasoning-item">
                          <FaCheckCircle className="check-icon" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="btn-save-prediction">
                    Save Prediction
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Card className="empty-state-card">
                <Card.Body className="text-center">
                  <div className="empty-state-icon">
                    <FaFutbol />
                  </div>
                  <h4 className="empty-state-title">Ready to Predict</h4>
                  <p className="empty-state-text">
                    Fill in the match details on the left and click 
                    "Generate Prediction" to see AI-powered analysis
                  </p>
                  <div className="empty-state-features">
                    <div className="feature-item">
                      <FaBolt className="feature-icon-small" />
                      <span>Instant Results</span>
                    </div>
                    <div className="feature-item">
                      <FaChartLine className="feature-icon-small" />
                      <span>70%+ Accuracy</span>
                    </div>
                    <div className="feature-item">
                      <FaCheckCircle className="feature-icon-small" />
                      <span>Detailed Analysis</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Predictions;