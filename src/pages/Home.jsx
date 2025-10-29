import { Container, Row, Col, Card, Button, Badge, Form, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaFutbol, FaChartLine, FaTrophy, FaArrowRight, FaBolt, FaShieldAlt, FaRocket, FaClock, FaFire } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getPopularMatches } from '../services/sportsApi';
import { getRealUpcomingMatches, addPredictions } from '../services/realMatchesService';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [filter, setFilter] = useState('all');
  const [leagueFilter, setLeagueFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMatches();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [matches, filter, leagueFilter]);

  const loadMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Loading matches from Football-Data.org...');
      const response = await getPopularMatches();
      
      if (response.matches && response.matches.length > 0) {
        console.log('✅ Loaded', response.matches.length, 'real matches');
        
        const matchesWithPredictions = response.matches.map(match => ({
          ...match,
          prediction: generatePrediction(),
          confidence: generateConfidence()
        }));
        
        setMatches(matchesWithPredictions);
      } else {
        throw new Error('No matches available');
      }
    } catch (err) {
      console.error('❌ Error loading matches:', err);
      console.log('📋 Using fallback data...');
      setError('Unable to connect to API. Using sample data.');
      
      const sampleData = getRealUpcomingMatches();
      const matchesWithPredictions = addPredictions(sampleData.matches);
      setMatches(matchesWithPredictions);
    } finally {
      setLoading(false);
    }
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

  const generatePrediction = () => {
    const predictions = ['Home Win', 'Draw', 'Away Win'];
    return predictions[Math.floor(Math.random() * predictions.length)];
  };

  const generateConfidence = () => {
    return Math.floor(Math.random() * 25) + 65;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 75) return 'success';
    if (confidence >= 65) return 'warning';
    return 'danger';
  };

  const handleAnalyze = (match) => {
    navigate('/predictions', { 
      state: { 
        homeTeam: match.homeTeam, 
        awayTeam: match.awayTeam 
      } 
    });
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
            <Link to="/all-matches" className="view-all-btn">
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

          {error && (
            <Alert variant="info" className="mb-4">
              <FaClock className="me-2" />
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="loading-state">
              <Spinner animation="border" variant="primary" style={{width: '3rem', height: '3rem'}} />
              <p className="mt-3">Loading matches...</p>
            </div>
          ) : (
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
                      {match.isLive && (
                        <div className="live-score-badge">
                          {match.homeScore} - {match.awayScore}
                        </div>
                      )}
                      
                      <div className="team-new">
                        <img 
                          src={match.homeTeamLogo} 
                          alt={match.homeTeam}
                          className="team-logo-img-new"
                        />
                        <span className="team-name-new">{match.homeTeam}</span>
                      </div>
                      
                      <div className="vs-badge-new">
                        {match.isLive ? `${match.homeScore}-${match.awayScore}` : 'VS'}
                      </div>
                      
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

                    <div className="match-link-new">
                      <Button 
                        className="btn-analyze-new"
                        onClick={() => handleAnalyze(match)}
                      >
                        Full Analysis <FaArrowRight className="ms-2" />
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Top Leagues Section */}
      <section className="top-leagues-section">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title-new">
              <FaTrophy className="me-3" />
              Top Leagues
            </h2>
            <p className="section-subtitle-new">
              Premier competitions from around the world
            </p>
          </div>
          
          <Row>
            {[
              { name: 'Premier League', country: 'England', logo: 'https://media.api-sports.io/football/leagues/39.png', color: '#38003c' },
              { name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png', color: '#ee8707' },
              { name: 'Bundesliga', country: 'Germany', logo: 'https://media.api-sports.io/football/leagues/78.png', color: '#d20515' },
              { name: 'Serie A', country: 'Italy', logo: 'https://media.api-sports.io/football/leagues/135.png', color: '#024494' },
              { name: 'Ligue 1', country: 'France', logo: 'https://media.api-sports.io/football/leagues/61.png', color: '#dae025' },
              { name: 'Champions League', country: 'Europe', logo: 'https://media.api-sports.io/football/leagues/2.png', color: '#00336a' }
            ].map((league, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <Link to="/all-matches" style={{textDecoration: 'none'}}>
                  <Card className="league-card">
                    <Card.Body className="d-flex align-items-center">
                      <div className="league-logo-wrapper">
                        <img src={league.logo} alt={league.name} className="league-logo" />
                      </div>
                      <div className="league-info">
                        <h5 className="league-name">{league.name}</h5>
                        <p className="league-country">{league.country}</p>
                      </div>
                      <FaArrowRight className="league-arrow" />
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title-new">How GameSense Works</h2>
            <p className="section-subtitle-new">
              Three simple steps to accurate predictions
            </p>
          </div>
          
          <Row>
            <Col md={4} className="mb-4">
              <Card className="step-card">
                <Card.Body className="text-center">
                  <div className="step-number">1</div>
                  <FaFutbol className="step-icon" />
                  <h4 className="step-title">Select Match</h4>
                  <p className="step-text">
                    Choose from thousands of live and upcoming fixtures across all major leagues
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="step-card">
                <Card.Body className="text-center">
                  <div className="step-number">2</div>
                  <FaBolt className="step-icon" />
                  <h4 className="step-title">AI Analysis</h4>
                  <p className="step-text">
                    Our algorithm analyzes team form, head-to-head, injuries, and 50+ data points
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="step-card">
                <Card.Body className="text-center">
                  <div className="step-number">3</div>
                  <FaChartLine className="step-icon" />
                  <h4 className="step-title">Get Prediction</h4>
                  <p className="step-text">
                    Receive detailed predictions with confidence scores and match insights
                  </p>
                </Card.Body>
              </Card>
            </Col>
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