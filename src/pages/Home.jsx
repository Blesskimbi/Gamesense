import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFutbol, FaChartLine, FaTrophy, FaArrowRight, FaBolt, FaShieldAlt, FaRocket } from 'react-icons/fa';
import { useState } from 'react';
import './Home.css';

function Home() {
  const [featuredMatches] = useState([
    {
      id: 1,
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      competition: 'Premier League',
      time: '15:00',
      date: 'Today',
      prediction: 'Draw',
      confidence: 65,
      isLive: true
    },
    {
      id: 2,
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      competition: 'La Liga',
      time: '20:00',
      date: 'Today',
      prediction: 'Home Win',
      confidence: 72,
      isLive: false
    },
    {
      id: 3,
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      competition: 'Bundesliga',
      time: '17:30',
      date: 'Tomorrow',
      prediction: 'Home Win',
      confidence: 68,
      isLive: false
    }
  ]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <div className="hero-badge">
                <FaBolt className="me-2" />
                AI-Powered Predictions
              </div>
              <h1 className="hero-title">
                Build Winning Strategies
                <span className="gradient-text"> in Minutes</span>
              </h1>
              <p className="hero-subtitle">
                Get instant, data-driven football predictions powered by advanced algorithms.
                Analyze matches, track accuracy, and make informed decisions.
              </p>
              <div className="hero-cta">
                <Link to="/predictions">
                  <Button className="btn-hero-primary">
                    Start Predicting <FaArrowRight className="ms-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button className="btn-hero-secondary">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">1,234+</div>
                  <div className="stat-label">Predictions</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">68%</div>
                  <div className="stat-label">Accuracy</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Leagues</div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="hero-visual">
              <div className="floating-card">
                <FaChartLine className="hero-icon" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        {/* Features Section */}
        <div className="features-section">
          <Row>
            <Col md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon-wrapper">
                    <FaBolt className="feature-icon" />
                  </div>
                  <h4 className="feature-title">Instant Analysis</h4>
                  <p className="feature-text">
                    Get predictions in real-time with our lightning-fast algorithm engine.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon-wrapper">
                    <FaShieldAlt className="feature-icon" />
                  </div>
                  <h4 className="feature-title">Data-Driven</h4>
                  <p className="feature-text">
                    Built on historical data and statistical models for maximum accuracy.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon-wrapper">
                    <FaRocket className="feature-icon" />
                  </div>
                  <h4 className="feature-title">100% Free</h4>
                  <p className="feature-text">
                    No hidden costs, no premium features. Just pure predictions.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Featured Matches */}
        <div className="matches-section">
          <div className="section-header">
            <h2 className="section-title">
              <FaFutbol className="me-3" />
              Featured Matches
            </h2>
            <Link to="/predictions" className="view-all-link">
              View All <FaArrowRight className="ms-2" />
            </Link>
          </div>
          
          <Row>
            {featuredMatches.map((match) => (
              <Col lg={4} md={6} key={match.id} className="mb-4">
                <Card className="match-card-modern">
                  <Card.Body>
                    <div className="match-header">
                      <Badge bg="dark" className="competition-badge">
                        {match.competition}
                      </Badge>
                      {match.isLive && (
                        <Badge bg="danger" className="live-badge">
                          <span className="pulse-dot"></span>
                          LIVE
                        </Badge>
                      )}
                    </div>
                    
                    <div className="match-teams">
                      <div className="team">
                        <div className="team-logo">{match.homeTeam.charAt(0)}</div>
                        <span className="team-name">{match.homeTeam}</span>
                      </div>
                      <div className="vs-divider">VS</div>
                      <div className="team">
                        <div className="team-logo">{match.awayTeam.charAt(0)}</div>
                        <span className="team-name">{match.awayTeam}</span>
                      </div>
                    </div>
                    
                    <div className="match-info">
                      <FaFutbol className="me-2" />
                      {match.date} • {match.time}
                    </div>
                    
                    <div className="prediction-box">
                      <div className="prediction-label">AI Prediction</div>
                      <div className="prediction-value">{match.prediction}</div>
                      <div className="confidence-bar">
                        <div 
                          className="confidence-fill" 
                          style={{width: `${match.confidence}%`}}
                        ></div>
                      </div>
                      <div className="confidence-text">{match.confidence}% Confidence</div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="match-footer">
                    <Link to="/predictions">
                      <Button className="btn-view-details">
                        View Analysis <FaArrowRight className="ms-2" />
                      </Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <Card className="cta-card">
            <Card.Body className="text-center">
              <FaTrophy className="cta-icon" />
              <h2 className="cta-title">Ready to Start Winning?</h2>
              <p className="cta-text">
                Join thousands of users making smarter predictions with GameSense.
              </p>
              <Link to="/predictions">
                <Button className="btn-cta">
                  Make Your First Prediction <FaArrowRight className="ms-2" />
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default Home;