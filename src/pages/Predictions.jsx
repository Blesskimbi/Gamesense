import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge, Tabs, Tab } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaFutbol, FaChartLine, FaBolt, FaCheckCircle, FaTrophy, FaFire, FaBrain, FaDollarSign } from 'react-icons/fa';
import enhancedPredictionEngine from '../services/enhancedPredictionEngine';
import FormChart from '../components/prediction/FormChart';
import TeamRadarChart from '../components/prediction/RadarChart';
import MomentumBar from '../components/prediction/MomentumBar';
import ModelComparison from '../components/prediction/ModelComparison';
import ValueBets from '../components/prediction/ValueBets';
import HeadToHeadTimeline from '../components/prediction/HeadToHeadTimeline';
import './Predictions.css';
import '../components/prediction/PredictionComponents.css';

function Predictions() {
  const location = useLocation();
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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
    setPrediction(null);

    try {
      console.log('🚀 Generating enhanced prediction...');
      const result = await enhancedPredictionEngine.generatePrediction(homeTeam, awayTeam);
      console.log('✅ Prediction complete:', result);
      setPrediction(result);
      setActiveTab('overview');
    } catch (err) {
      console.error('❌ Prediction error:', err);
      setError('Failed to generate prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 75) return 'success';
    if (confidence >= 65) return 'warning';
    return 'danger';
  };

  return (
    <Container>
      <div className="text-center mb-5">
        <Badge className="header-badge-predict mb-3">
          <FaBrain className="me-2" />
          Enhanced AI Engine
        </Badge>
        <h1 className="display-5 fw-bold">
          <FaChartLine className="me-3" />
          Advanced Match Predictor
        </h1>
        <p className="text-muted">
          AI-powered predictions with xG, sentiment analysis, and value bet detection
        </p>
      </div>

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="prediction-input-card sticky-top" style={{top: '100px'}}>
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
                <h6>
                  <FaFire className="text-warning me-2" />
                  What We Analyze:
                </h6>
                <ul className="mb-0">
                  <li>Expected Goals (xG) & xA</li>
                  <li>Last 10 matches (weighted)</li>
                  <li>Head-to-head history</li>
                  <li>Injuries & suspensions</li>
                  <li>Team sentiment & morale</li>
                  <li>Corners, cards & possession</li>
                  <li>Value bet opportunities</li>
                  <li>Multiple AI model comparison</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8} className="mb-4">
          {prediction ? (
            <div className="prediction-results-container">
              {/* Main Prediction Card */}
              <Card className="result-card mb-4">
                <Card.Body className="text-center">
                  <div className="result-icon-wrapper">
                    <FaTrophy className="result-icon" />
                  </div>
                  <h2 className="prediction-winner">{prediction.winner}</h2>
                  <Badge bg={getConfidenceColor(prediction.confidence)} className="confidence-badge-large">
                    {prediction.confidence}% Confidence
                  </Badge>
                  <p className="mt-3 text-muted">
                    {prediction.homeTeam} vs {prediction.awayTeam}
                  </p>
                  
                  <div className="expected-goals mt-4">
                    <Row>
                      <Col xs={5} className="text-end">
                        <div className="xg-value text-success">{prediction.expectedGoals.home}</div>
                        <div className="xg-label">xG Home</div>
                      </Col>
                      <Col xs={2} className="d-flex align-items-center justify-content-center">
                        <div className="xg-divider">vs</div>
                      </Col>
                      <Col xs={5} className="text-start">
                        <div className="xg-value text-danger">{prediction.expectedGoals.away}</div>
                        <div className="xg-label">xG Away</div>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>

              {/* Tabbed Content */}
              <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="prediction-tabs mb-4">
                <Tab eventKey="overview" title="📊 Overview">
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

                  {/* Momentum */}
                  <MomentumBar 
                    homeTeam={prediction.homeTeam}
                    awayTeam={prediction.awayTeam}
                    homeMomentum={prediction.stats.homeStats.momentum}
                    awayMomentum={prediction.stats.awayStats.momentum}
                  />

                  {/* Advanced Markets */}
                  <Card className="mb-4">
                    <Card.Header>
                      <h6 className="mb-0">📊 Advanced Markets</h6>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6} className="mb-3">
                          <div className="market-box">
                            <div className="market-label">Over/Under {prediction.markets.overUnder.line}</div>
                            <div className="market-value">{prediction.markets.overUnder.recommendation}</div>
                            <small className="text-muted">{prediction.markets.overUnder.over}% probability</small>
                          </div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="market-box">
                            <div className="market-label">Both Teams Score</div>
                            <div className="market-value">{prediction.markets.btts.recommendation}</div>
                            <small className="text-muted">{prediction.markets.btts.yes}% probability</small>
                          </div>
                        </Col>
                        <Col md={4} className="mb-3">
                          <div className="market-box">
                            <div className="market-label">Corners</div>
                            <div className="market-value">O{prediction.markets.corners.line}</div>
                            <small className="text-muted">Total: ~{prediction.markets.corners.total}</small>
                          </div>
                        </Col>
                        <Col md={4} className="mb-3">
                          <div className="market-box">
                            <div className="market-label">Cards</div>
                            <div className="market-value">O{prediction.markets.cards.line}</div>
                            <small className="text-muted">Total: ~{prediction.markets.cards.total}</small>
                          </div>
                        </Col>
                        <Col md={4} className="mb-3">
                          <div className="market-box">
                            <div className="market-label">Top Score</div>
                            <div className="market-value">{prediction.markets.correctScore[0].score}</div>
                            <small className="text-muted">{prediction.markets.correctScore[0].probability}% chance</small>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab>

                <Tab eventKey="analysis" title="🔍 Deep Analysis">
                  {/* AI Reasoning */}
                  <Card className="mb-4">
                    <Card.Header>
                      <h6 className="mb-0">
                        <FaBrain className="text-success me-2" />
                        AI Reasoning & Key Factors
                      </h6>
                    </Card.Header>
                    <Card.Body>
                      {prediction.reasoning.map((reason, index) => (
                        <div key={index} className="reasoning-item">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div className="d-flex align-items-start">
                              <FaCheckCircle className="text-success me-2 mt-1" />
                              <div>
                                <strong>{reason.factor}</strong>
                                <p className="mb-0 text-muted mt-1">{reason.description}</p>
                              </div>
                            </div>
                            <Badge bg={reason.impact === 'High' ? 'success' : reason.impact === 'Medium' ? 'warning' : 'secondary'}>
                              {reason.impact}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>

                  {/* Team Stats Comparison */}
                  <Card className="mb-4">
                    <Card.Header>
                      <h6 className="mb-0">📈 Team Statistics</h6>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <h6 className="text-success mb-3">{prediction.homeTeam}</h6>
                          <ul className="team-stats-list">
                            <li><strong>xG per game:</strong> {prediction.stats.homeStats.xG}</li>
                            <li><strong>Possession:</strong> {prediction.stats.homeStats.possession}%</li>
                            <li><strong>Pass Accuracy:</strong> {prediction.stats.homeStats.passAccuracy}%</li>
                            <li><strong>Shots per game:</strong> {prediction.stats.homeStats.shotsPerGame}</li>
                            <li><strong>Clean sheets:</strong> {prediction.stats.homeStats.cleanSheets}</li>
                            <li><strong>Team Rating:</strong> {prediction.stats.homeStats.rating}/100</li>
                          </ul>
                        </Col>
                        <Col md={6}>
                          <h6 className="text-danger mb-3">{prediction.awayTeam}</h6>
                          <ul className="team-stats-list">
                            <li><strong>xG per game:</strong> {prediction.stats.awayStats.xG}</li>
                            <li><strong>Possession:</strong> {prediction.stats.awayStats.possession}%</li>
                            <li><strong>Pass Accuracy:</strong> {prediction.stats.awayStats.passAccuracy}%</li>
                            <li><strong>Shots per game:</strong> {prediction.stats.awayStats.shotsPerGame}</li>
                            <li><strong>Clean sheets:</strong> {prediction.stats.awayStats.cleanSheets}</li>
                            <li><strong>Team Rating:</strong> {prediction.stats.awayStats.rating}/100</li>
                          </ul>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

                  {/* Injuries & Sentiment */}
                  <Row>
                    <Col md={6} className="mb-4">
                      <Card>
                        <Card.Header>
                          <h6 className="mb-0">🏥 Injuries & Suspensions</h6>
                        </Card.Header>
                        <Card.Body>
                          <div className="mb-3">
                            <strong className="text-success">{prediction.homeTeam}:</strong>
                            <Badge bg={prediction.injuries.home.impact === 'High' ? 'danger' : 'warning'} className="ms-2">
                              {prediction.injuries.home.impact} Impact
                            </Badge>
                            <p className="text-muted mt-2">
                              {prediction.injuries.home.keyPlayersOut} key player(s) unavailable
                            </p>
                          </div>
                          <div>
                            <strong className="text-danger">{prediction.awayTeam}:</strong>
                            <Badge bg={prediction.injuries.away.impact === 'High' ? 'danger' : 'warning'} className="ms-2">
                              {prediction.injuries.away.impact} Impact
                            </Badge>
                            <p className="text-muted mt-2">
                              {prediction.injuries.away.keyPlayersOut} key player(s) unavailable
                            </p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                      <Card>
                        <Card.Header>
                          <h6 className="mb-0">💭 Team Sentiment</h6>
                        </Card.Header>
                        <Card.Body>
                          <div className="mb-3">
                            <strong className="text-success">{prediction.homeTeam}:</strong>
                            <div className="sentiment-bar mt-2">
                              <div className="sentiment-fill" style={{width: `${prediction.sentiment.home.score}%`}}></div>
                            </div>
                            <small className="text-muted">{prediction.sentiment.home.score}/100 - {prediction.sentiment.home.trend}</small>
                          </div>
                          <div>
                            <strong className="text-danger">{prediction.awayTeam}:</strong>
                            <div className="sentiment-bar mt-2">
                              <div className="sentiment-fill away" style={{width: `${prediction.sentiment.away.score}%`}}></div>
                            </div>
                            <small className="text-muted">{prediction.sentiment.away.score}/100 - {prediction.sentiment.away.trend}</small>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab>

                <Tab eventKey="visualizations" title="📊 Visualizations">
                  <FormChart 
                    homeData={prediction.visualizations.formChart.home}
                    awayData={prediction.visualizations.formChart.away}
                    homeTeam={prediction.homeTeam}
                    awayTeam={prediction.awayTeam}
                  />
                  
                  <TeamRadarChart 
                    homeData={prediction.visualizations.radarChart.home}
                    awayData={prediction.visualizations.radarChart.away}
                    homeTeam={prediction.homeTeam}
                    awayTeam={prediction.awayTeam}
                  />
                </Tab>

                <Tab eventKey="h2h" title="🏆 Head-to-Head">
                  <HeadToHeadTimeline 
                    h2hData={prediction.headToHead}
                    homeTeam={prediction.homeTeam}
                    awayTeam={prediction.awayTeam}
                  />
                </Tab>

                <Tab eventKey="models" title="🤖 AI Comparison">
                  <ModelComparison comparison={prediction.modelComparison} />
                </Tab>

                <Tab eventKey="value" title="💰 Value Bets">
                  <ValueBets valueBets={prediction.valueBets} />
                </Tab>
              </Tabs>

              {/* Pro Tip */}
              <Alert variant="success" className="pro-tip-alert">
                <strong>💡 Pro Tip:</strong> Our AI recommends combining {prediction.winner} + 
                {prediction.markets.overUnder.recommendation} + {prediction.markets.btts.recommendation} 
                for this match. {prediction.valueBets && prediction.valueBets.length > 0 && 
                `We've also detected ${prediction.valueBets.length} value bet opportunity!`}
              </Alert>
            </div>
          ) : (
            <Card className="empty-prediction-card">
              <Card.Body className="text-center py-5">
                <FaChartLine className="empty-icon" />
                <h4 className="mt-4">Ready for Advanced Analysis</h4>
                <p className="text-muted">
                  Enter both team names and click "Generate AI Prediction" to see:
                </p>
                <Row className="mt-4">
                  <Col md={6} className="mb-3">
                    <div className="feature-preview">
                      <FaBrain className="feature-icon text-success" />
                      <h6>Deep Learning Analysis</h6>
                      <p>xG, xA, possession & momentum</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="feature-preview">
                      <FaFire className="feature-icon text-warning" />
                      <h6>Sentiment Analysis</h6>
                      <p>Team mood & morale index</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="feature-preview">
                      <FaChartLine className="feature-icon text-primary" />
                      <h6>Interactive Charts</h6>
                      <p>Form trends & radar comparison</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="feature-preview">
                      <FaDollarSign className="feature-icon text-success" />
                      <h6>Value Bet Detection</h6>
                      <p>Find betting opportunities</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Predictions;