import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFutbol, FaChartLine, FaTrophy, FaArrowRight, FaBolt, FaShieldAlt, FaRocket, FaClock, FaFire } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getRealUpcomingMatches, addPredictions } from '../services/realMatchesService';
import './Home.css';

function Home() {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [filter, setFilter] = useState('all');
  const [leagueFilter, setLeagueFilter] = useState('all');

  useEffect(() => {
    loadMatches();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [matches, filter, leagueFilter]);

  const loadMatches = () => {
    const { matches: realMatches } = getRealUpcomingMatches();
    const matchesWithPredictions = addPredictions(realMatches);
    setMatches(matchesWithPredictions);
  };

  const applyFilters = () => {
    let filtered = [...matches];
    
    if (filter === 'live') {
      filtered = filtered.filter(m => m.isLive);
    } else if (filter === 'today') {
      const today = new Date().toDateString();
      filtered = filtered.filter(m => new Date(m.timestamp).toDateString() === today);
    } else if (filter === 'upcoming') {
      const now = Date.now();
      filtered = filtered.filter(m => m.timestamp > now && !m.isLive);
    }
    
    if (leagueFilter !== 'all') {
      filtered = filtered.filter(m => m.league.toLowerCase().includes(leagueFilter.toLowerCase()));
    }
    
    setFilteredMatches(filtered);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 75) return 'success';
    if (confidence >= 65) return 'warning';
    return 'danger';
  };

  const leagues = ['all', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section-new">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <Badge className="hero-badge-new">
                <FaBolt /> Powered by AI
              </Badge>
              <h1 className="hero-title-new">
                Predict Football Matches with
                <span className="hero-gradient"> Advanced AI</span>
              </h1>
              <p className="hero-text-new">
                Get instant predictions for thousands of matches across all major leagues. 
                Our AI analyzes team form, statistics, and historical data to give you the edge.
              </p>
              <div className="hero-buttons">
                <Link to="/predictions">
                  <Button className="btn-hero-main">
                    Start Predicting <FaArrowRight className="ms-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button className="btn-hero-outline">
                    How It Works
                  </Button>
                </Link>
              </div>
              
              <div className="hero-stats-new">
                <div className="stat-box-new">
                  <div className="stat-icon-new"><FaTrophy /></div>
                  <div>
                    <div className="stat-num-new">68%</div>
                    <div className="stat-text-new">Accuracy</div>
                  </div>
                </div>
                <div className="stat-box-new">
                  <div className="stat-icon-new"><FaFutbol /></div>
                  <div>
                    <div className="stat-num-new">{matches.length}</div>
                    <div className="stat-text-new">Matches</div>
                  </div>
                </div>
                <div className="stat-box-new">
                  <div className="stat-icon-new"><FaShieldAlt /></div>
                  <div>
                    <div className="stat-num-new">15+</div>
                    <div className="stat-text-new">Leagues</div>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="hero-visual-new">
                <div className="floating-orb orb-1"></div>
                <div className="floating-orb orb-2"></div>
                <div className="hero-card-main">
                  <FaChartLine className="hero-main-icon" />
                  <div className="pulse-ring"></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Banner */}
      <section className="features-banner">
        <Container>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="feature-item-new">
                <FaBolt className="feature-icon-new" />
                <h4>Instant Results</h4>
                <p>Get predictions in seconds</p>
              </div>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="feature-item-new">
                <FaShieldAlt className="feature-icon-new" />
                <h4>70%+ Accuracy</h4>
                <p>Proven track record</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-item-new">
                <FaRocket className="feature-icon-new" />
                <h4>100% Free</h4>
                <p>No hidden fees ever</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Matches Section */}
      <section className="matches-section-new">
        <Container>
          <div className="section-header-new">
            <div>
              <h2 className="section-title-new">
                <FaFire className="me-3" style={{color: '#ef4444'}} />
                Upcoming Matches
              </h2>
              <p className="section-subtitle-new">
                Top fixtures from Europe's elite leagues
              </p>
            </div>
            <Link to="/predictions" className="view-all-btn">
              View All <FaArrowRight className="ms-2" />
            </Link>
          </div>

          {/* Filters */}
          <Card className="filters-card-new mb-4">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={6} className="mb-3 mb-md-0">
                  <div className="filter-buttons">
                    <Button 
                      className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                      onClick={() => setFilter('all')}
                    >
                      All
                    </Button>
                    <Button 
                      className={`filter-btn ${filter === 'live' ? 'active' : ''}`}
                      onClick={() => setFilter('live')}
                    >
                      <span className="live-indicator"></span>
                      Live
                    </Button>
                    <Button 
                      className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
                      onClick={() => setFilter('today')}
                    >
                      Today
                    </Button>
                    <Button 
                      className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
                      onClick={() => setFilter('upcoming')}
                    >
                      Upcoming
                    </Button>
                  </div>
                </Col>
                <Col md={6}>
                  <Form.Select 
                    className="league-filter-select"
                    value={leagueFilter}
                    onChange={(e) => setLeagueFilter(e.target.value)}
                  >
                    <option value="all">All Leagues</option>
                    {leagues.slice(1).map(league => (
                      <option key={league} value={league}>{league}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row>
            {filteredMatches.map((match) => (
              <Col lg={4} md={6} key={match.id} className="mb-4">
                <Card className="match-card-new">
                  <div className="match-card-header">
                    <Badge className="league-badge-new">
                      {match.league}
                    </Badge>
                    {match.isLive && (
                      <Badge bg="danger" className="live-badge-new">
                        <span className="live-pulse"></span>
                        LIVE
                      </Badge>
                    )}
                  </div>

                  <div className="match-teams-new">
                    <div className="team-new">
                      <img 
                        src={match.homeTeamLogo} 
                        alt={match.homeTeam}
                        className="team-logo-img-new"
                      />
                      <span className="team-name-new">{match.homeTeam}</span>
                    </div>
                    
                    <div className="vs-badge-new">VS</div>
                    
                    <div className="team-new">
                      <img 
                        src={match.awayTeamLogo} 
                        alt={match.awayTeam}
                        className="team-logo-img-new"
                      />
                      <span className="team-name-new">{match.awayTeam}</span>
                    </div>
                  </div>

                  <div className="match-datetime-new">
                    <FaClock className="me-2" />
                    {match.date} at {match.time}
                  </div>

                  <div className="prediction-section-new">
                    <div className="prediction-header-new">
                      <span>AI Prediction</span>
                      <Badge bg={getConfidenceColor(match.confidence)}>
                        {match.confidence}%
                      </Badge>
                    </div>
                    <div className="prediction-result-new">
                      {match.prediction}
                    </div>
                    <div className="confidence-bar-new">
                      <div 
                        className="confidence-fill-new" 
                        style={{width: `${match.confidence}%`}}
                      />
                    </div>
                  </div>

                  <Link to="/predictions" className="match-link-new">
                    <Button className="btn-analyze-new">
                      Full Analysis <FaArrowRight className="ms-2" />
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section-new">
        <Container>
          <Card className="cta-card-new">
            <div className="cta-icon-new">
              <FaTrophy />
            </div>
            <h2 className="cta-title-new">Ready to Make Winning Predictions?</h2>
            <p className="cta-text-new">
              Join thousands of users who trust GameSense for accurate football predictions
            </p>
            <Link to="/predictions">
              <Button className="btn-cta-new">
                Get Started Free <FaArrowRight className="ms-2" />
              </Button>
            </Link>
          </Card>
        </Container>
      </section>
    </div>
  );
}

export default Home;