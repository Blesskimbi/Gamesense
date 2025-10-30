import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge, Tabs, Tab } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaFutbol, FaChartLine, FaBolt, FaCheckCircle, FaTrophy, FaRobot, FaHeartbeat, FaNewspaper } from 'react-icons/fa';
import enhancedPredictionEngine from '../services/enhancedPredictionEngine';
import FormChart from '../components/prediction/FormChart';
import TeamRadarChart from '../components/prediction/RadarChart';
import MomentumBar from '../components/prediction/MomentumBar';
import ModelComparison from '../components/prediction/ModelComparison';
import ValueBets from '../components/prediction/ValueBets';
import HeadToHeadTimeline from '../components/prediction/HeadToHeadTimeline';
import '../components/prediction/PredictionComponents.css';
import './Predictions.css';

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

    try {
      console.log('🚀 Starting enhanced prediction...');
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

  const handleReset = () => {
    setPrediction(null);
    setHomeTeam('');
    setAwayTeam('');
    setError(null);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 75) return 'success';
    if (confidence >= 65) return 'warning';
    return 'danger';
  };

  return (
    <Container fluid className="predictions-page-enhanced">
      <div className="text-center mb-5">
        <Badge className="hero-badge-pred">
          <FaRobot className="me-2" />
          Enhanced AI Engine
        </Badge>
        <h1 className="display-5 fw-bold mt-3">
          <FaChartLine className="me-3" />
          Professional Match Predictor
        </h1>
        <p className="text-muted">
          Advanced analytics powered by xG, sentiment analysis, and multiple AI models
        </p>
      </div>

      <Row>
        {/* Left Sidebar - Input Form */}
        <Col lg={3} className="mb-4">
          <Card className="prediction-input-card sticky-sidebar">
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
                  className="w-100 btn-predict-submit mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
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
                    className="w-100"
                    onClick={handleReset}
                  >
                    Reset Form
                  </Button>
                )}
              </Form>

              <div className="info-box mt-4">
                <h6>🎯 Advanced Features:</h6>
                <ul className="feature-list">
                  <li><FaChartLine className="me-2" />Expected Goals (xG)</li>
                  <li><FaHeartbeat className="me-2" />Injury Impact</li>
                  <li><FaNewspaper className="me-2" />Team Sentiment</li>
                  <li><FaTrophy className="me-2" />Head-to-Head</li>
                  <li><FaRobot className="me-2" />Multi-Model AI</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content Area */}
        <Col lg={9} className="mb-4">
          {loading ? (
            <Card className="loading-card">
              <Card.Body className="text-center py-5">
                <Spinner animation="border" variant="primary" style={{width: '4rem', height: '4rem'}} />
                <h4 className="mt-4">Analyzing Match...</h4>
                <p className="text-muted">Processing 50+ data points across multiple models</p>
                <div className="loading-steps mt-4">
                  <div className="loading-step">✓ Fetching team statistics</div>
                  <div className="loading-step">✓ Analyzing recent form</div>
                  <div className="loading-step">⏳ Calculating xG & xA</div>
                  <div className="loading-step">⏳ Running AI models</div>
                </div>
              </Card.Body>
            </Card>
          ) : prediction ? (
            <div className="prediction-results-enhanced">
              {/* Main Result Card */}
              <Card className="main-result-card mb-4">
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <div className="result-header">
                        <div className="result-icon-wrapper-enhanced">
                          <FaTrophy className="result-icon-enhanced" />
                        </div>
                        <div>
                          <h2 className="prediction-winner-enhanced">{prediction.winner}</h2>
                          <Badge bg={getConfidenceColor(prediction.confidence)} className="confidence-badge-xl">
                            {prediction.confidence}% Confidence
                          </Badge>
                        </div>
                      </div>
                      <p className="match-title-enhanced mt-3">
                        {prediction.homeTeam} vs {prediction.awayTeam}
                      </p>
                    </Col>
                    <Col md={4} className="text-center">
                      <div className="xg-display">
                        <h6 className="text-muted mb-3">Expected Goals (xG)</h6>
                        <div className="xg-values">
                          <div className="xg-value home">
                            <div className="xg-number">{prediction.expectedGoals.home}</div>
                            <div className="xg-label">{prediction.homeTeam}</div>
                          </div>
                          <div className="xg-vs">vs</div>
                          <div className="xg-value away">
                            <div className="xg-number">{prediction.expectedGoals.away}</div>
                            <div className="xg-label">{prediction.awayTeam}</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Tabbed Content */}
              <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="prediction-tabs mb-4">
                {/* Overview Tab */}
                <Tab eventKey="overview" title="📊 Overview">
                  <Row>
                    <Col lg={12} className="mb-4">
                      <Card className="probabilities-card">
                        <Card.Header>
                          <h6 className="mb-0">Win Probabilities</h6>
                        </Card.Header>
                        <Card.Body>
                          <div className="probability-item-enhanced">
                            <div className="d-flex justify-content-between mb-2">
                              <span className="fw-bold">{prediction.homeTeam} Win</span>
                              <span className="text-success fw-bold">{prediction.probabilities.homeWin}%</span>
                            </div>
                            <div className="probability-bar-enhanced">
                              <div 
                                className="probability-fill-enhanced home-fill" 
                                style={{width: `${prediction.probabilities.homeWin}%`}}
                              />
                            </div>
                          </div>

                          <div className="probability-item-enhanced">
                            <div className="d-flex justify-content-between mb-2">
                              <span className="fw-bold">Draw</span>
                              <span className="text-warning fw-bold">{prediction.probabilities.draw}%</span>
                            </div>
                            <div className="probability-bar-enhanced">
                              <div 
                                className="probability-fill-enhanced draw-fill" 
                                style={{width: `${prediction.probabilities.draw}%`}}
                              />
                            </div>
                          </div>

                          <div className="probability-item-enhanced">
                            <div className="d-flex justify-content-between mb-2">
                              <span className="fw-bold">{prediction.awayTeam} Win</span>
                              <span className="text-danger fw-bold">{prediction.probabilities.awayWin}%</span>
                            </div>
                            <div className="probability-bar-enhanced">
                              <div 
                                className="probability-fill-enhanced away-fill" 
                                style={{width: `${prediction.probabilities.awayWin}%`}}
                              />
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col lg={12}>
                      <MomentumBar 
                        homeTeam={prediction.homeTeam}
                        awayTeam={prediction.awayTeam}
                        homeMomentum={prediction.stats.homeStats.momentum}
                        awayMomentum={prediction.stats.awayStats.momentum}
                      />
                    </Col>
                  </Row>
                </Tab>

                {/* Analysis Tab */}
                <Tab eventKey="analysis" title="🔍 Deep Analysis">
                  <Row>
                    <Col lg={6} className="mb-4">
                      <FormChart 
                        homeData={prediction.visualizations.formChart.home}
                        awayData={prediction.visualizations.formChart.away}
                        homeTeam={prediction.homeTeam}
                        awayTeam={prediction.awayTeam}
                      />
                    </Col>
                    <Col lg={6} className="mb-4">
                      <TeamRadarChart 
                        homeData={prediction.visualizations.radarChart.home}
                        awayData={prediction.visualizations.radarChart.away}
                        homeTeam={prediction.homeTeam}
                        awayTeam={prediction.awayTeam}
                      />
                    </Col>

                    <Col lg={12}>
                      <Card className="reasoning-card">
                        <Card.Header>
                          <h6 className="mb-0">🧠 AI Reasoning</h6>
                        </Card.Header>
                        <Card.Body>
                          <div className="reasoning-items">
                            {prediction.reasoning.map((reason, index) => (
                              <div key={index} className="reasoning-item-enhanced">
                                <div className="reasoning-header">
                                  <span className="reasoning-factor">{reason.factor}</span>
                                  <Badge bg={
                                    reason.impact === 'High' ? 'danger' : 
                                    reason.impact === 'Medium' ? 'warning' : 
                                    'info'
                                  }>
                                    {reason.impact} Impact
                                  </Badge>
                                </div>
                                <p className="reasoning-description">{reason.description}</p>
                              </div>
                            ))}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab>

                {/* Markets Tab */}
                <Tab eventKey="markets" title="💰 Markets">
                  <Row>
                    <Col lg={12} className="mb-4">
                      <Card className="markets-overview-card">
                        <Card.Header>
                          <h6 className="mb-0">📈 Betting Markets Overview</h6>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                            <Col md={3} className="mb-3">
                              <div className="market-box-enhanced">
                                <div className="market-label">Over/Under {prediction.markets.overUnder.line}</div>
                                <div className="market-value-large">{prediction.markets.overUnder.recommendation}</div>
                                <div className="market-prob">{prediction.markets.overUnder.over}% probability</div>
                              </div>
                            </Col>
                            <Col md={3} className="mb-3">
                              <div className="market-box-enhanced">
                                <div className="market-label">Both Teams Score</div>
                                <div className="market-value-large">{prediction.markets.btts.recommendation}</div>
                                <div className="market-prob">{prediction.markets.btts.yes}% probability</div>
                              </div>
                            </Col>
                            <Col md={3} className="mb-3">
                              <div className="market-box-enhanced">
                                <div className="market-label">Corners</div>
                                <div className="market-value-large">{prediction.markets.corners.over}% Over {prediction.markets.corners.line}</div>
                                <div className="market-prob">Expected: {prediction.markets.corners.total}</div>
                              </div>
                            </Col>
                            <Col md={3} className="mb-3">
                              <div className="market-box-enhanced">
                                <div className="market-label">Cards</div>
                                <div className="market-value-large">{prediction.markets.cards.over}% Over {prediction.markets.cards.line}</div>
                                <div className="market-prob">Expected: {prediction.markets.cards.total}</div>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col lg={12}>
                      <Card className="correct-score-card">
                        <Card.Header>
                          <h6 className="mb-0">🎯 Most Likely Scores</h6>
                        </Card.Header>
                        <Card.Body>
                          <div className="score-grid">
                            {prediction.markets.correctScore.map((score, index) => (
                              <div key={index} className="score-item">
                                <div className="score-value">{score.score}</div>
                                <div className="score-probability">{score.probability}%</div>
                              </div>
                            ))}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab>

                {/* Head to Head Tab */}
                <Tab eventKey="h2h" title="🏆 Head-to-Head">
                  <HeadToHeadTimeline 
                    h2hData={prediction.headToHead}
                    homeTeam={prediction.homeTeam}
                    awayTeam={prediction.awayTeam}
                  />
                </Tab>

                {/* Injuries & Sentiment Tab */}
                <Tab eventKey="injuries" title="⚕️ Team News">
                  <Row>
                    <Col lg={6} className="mb-4">
                      <Card className="injuries-card">
                        <Card.Header>
                          <h6 className="mb-0">🏥 {prediction.homeTeam} - Injuries & Suspensions</h6>
                        </Card.Header>
                        <Card.Body>
                          <Alert variant={
                            prediction.injuries.home.impact === 'High' ? 'danger' :
                            prediction.injuries.home.impact === 'Medium' ? 'warning' : 'info'
                          }>
                            <strong>Impact: {prediction.injuries.home.impact}</strong>
                            <br />
                            {prediction.injuries.home.keyPlayersOut} key player(s) unavailable
                          </Alert>
                          
                          {prediction.injuries.home.details.length > 0 ? (
                            <div className="injury-list">
                              {prediction.injuries.home.details.map((injury, index) => (
                                <div key={index} className="injury-item">
                                  <Badge bg="dark" className="me-2">{injury.position}</Badge>
                                  <Badge bg={injury.importance === 'Key' ? 'danger' : 'secondary'}>
                                    {injury.importance}
                                  </Badge>
                                  <span className="ms-2 text-muted">- {injury.status}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-success mb-0">✓ No significant injury concerns</p>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col lg={6} className="mb-4">
                      <Card className="injuries-card">
                        <Card.Header>
                          <h6 className="mb-0">🏥 {prediction.awayTeam} - Injuries & Suspensions</h6>
                        </Card.Header>
                        <Card.Body>
                          <Alert variant={
                            prediction.injuries.away.impact === 'High' ? 'danger' :
                            prediction.injuries.away.impact === 'Medium' ? 'warning' : 'info'
                          }>
                            <strong>Impact: {prediction.injuries.away.impact}</strong>
                            <br />
                            {prediction.injuries.away.keyPlayersOut} key player(s) unavailable
                          </Alert>
                          
                          {prediction.injuries.away.details.length > 0 ? (
                            <div className="injury-list">
                              {prediction.injuries.away.details.map((injury, index) => (
                                <div key={index} className="injury-item">
                                  <Badge bg="dark" className="me-2">{injury.position}</Badge>
                                  <Badge bg={injury.importance === 'Key' ? 'danger' : 'secondary'}>
                                    {injury.importance}
                                  </Badge>
                                  <span className="ms-2 text-muted">- {injury.status}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-success mb-0">✓ No significant injury concerns</p>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col lg={6} className="mb-4">
                      <Card className="sentiment-card">
                        <Card.Header>
                          <h6 className="mb-0">📰 {prediction.homeTeam} Sentiment</h6>
                        </Card.Header>
                        <Card.Body>
                          <div className="sentiment-score">
                            <div className="sentiment-number">{prediction.sentiment.home.score}</div>
                            <div className="sentiment-label">Mood Score</div>
                          </div>
                          <Badge bg={
                            prediction.sentiment.home.trend === 'Rising' ? 'success' :
                            prediction.sentiment.home.trend === 'Falling' ? 'danger' : 'secondary'
                          } className="mb-3">
                            {prediction.sentiment.home.trend} Trend
                          </Badge>
                          <div className="sentiment-factors">
                            <strong className="d-block mb-2">Key Factors:</strong>
                            {prediction.sentiment.home.factors.map((factor, index) => (
                              <div key={index} className="sentiment-factor">
                                <FaCheckCircle className="text-success me-2" />
                                {factor}
                              </div>
                            ))}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col lg={6} className="mb-4">
                      <Card className="sentiment-card">
                        <Card.Header>
                          <h6 className="mb-0">📰 {prediction.awayTeam} Sentiment</h6>
                        </Card.Header>
                        <Card.Body>
                          <div className="sentiment-score">
                            <div className="sentiment-number">{prediction.sentiment.away.score}</div>
                            <div className="sentiment-label">Mood Score</div>
                          </div>
                          <Badge bg={
                            prediction.sentiment.away.trend === 'Rising' ? 'success' :
                            prediction.sentiment.away.trend === 'Falling' ? 'danger' : 'secondary'
                          } className="mb-3">
                            {prediction.sentiment.away.trend} Trend
                          </Badge>
                          <div className="sentiment-factors">
                            <strong className="d-block mb-2">Key Factors:</strong>
                            {prediction.sentiment.away.factors.map((factor, index) => (
                              <div key={index} className="sentiment-factor">
                                <FaCheckCircle className="text-success me-2" />
                                {factor}
                              </div>
                            ))}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab>

                {/* AI Models Tab */}
                <Tab eventKey="models" title="🤖 AI Models">
                  <ModelComparison comparison={prediction.modelComparison} />
                </Tab>

                {/* Value Bets Tab */}
                <Tab eventKey="value" title="💎 Value Bets">
                  <ValueBets valueBets={prediction.valueBets} />
                </Tab>
              </Tabs>
            </div>
          ) : (
            <Card className="empty-prediction-card-enhanced">
              <Card.Body className="text-center py-5">
                <FaChartLine className="empty-icon-enhanced" />
                <h3 className="mt-4">Ready for Advanced Analysis</h3>
                <p className="text-muted mb-4">
                  Enter team names to generate comprehensive AI-powered predictions with:
                </p>
                <Row className="justify-content-center">
                  <Col md={8}>
                    <div className="features-grid">
                      <div className="feature-item-empty">
                        <FaChartLine className="feature-icon-empty" />
                        <span>Expected Goals (xG)</span>
                      </div>
                      <div className="feature-item-empty">
                        <FaHeartbeat className="feature-icon-empty" />
                        <span>Injury Analysis</span>
                      </div>
                      <div className="feature-item-empty">
                        <FaNewspaper className="feature-icon-empty" />
                        <span>Team Sentiment</span>
                      </div>
                      <div className="feature-item-empty">
                        <FaTrophy className="feature-icon-empty" />
                        <span>H2H History</span>
                      </div>
                      <div className="feature-item-empty">
                        <FaRobot className="feature-icon-empty" />
                        <span>Multi-Model AI</span>
                      </div>
                      <div className="feature-item-empty">
                        <FaBolt className="feature-icon-empty" />
                        <span>Value Bets</span>
                      </div>
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