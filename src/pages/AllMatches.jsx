import { Container, Row, Col, Card, Table, Badge, Button, Form, Spinner, Alert, Tabs, Tab } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUpcomingMatches } from '../services/sportsApi';
import { FaFutbol, FaCalendar, FaClock } from 'react-icons/fa';
import './AllMatches.css';

function AllMatches() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [leagueFilter, setLeagueFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('table');

  const topLeagues = [
    'Premier League',
    'La Liga',
    'Bundesliga',
    'Serie A',
    'Ligue 1',
    'UEFA Champions League',
    'UEFA Europa League'
  ];

  useEffect(() => {
    loadMatches();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [matches, statusFilter, leagueFilter, searchTerm]);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const response = await getUpcomingMatches();
      
      if (response.matches && response.matches.length > 0) {
        const formattedMatches = response.matches.map(match => {
          const matchDate = new Date(match.utcDate);
          return {
            id: match.id,
            homeTeam: match.homeTeam.name,
            awayTeam: match.awayTeam.name,
            homeTeamLogo: match.homeTeam.crest,
            awayTeamLogo: match.awayTeam.crest,
            league: match.competition.name,
            date: matchDate.toLocaleDateString(),
            time: matchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            status: match.status,
            isLive: match.status === 'IN_PLAY',
            homeScore: match.score?.fullTime?.home || 0,
            awayScore: match.score?.fullTime?.away || 0,
            timestamp: matchDate.getTime()
          };
        }).sort((a, b) => a.timestamp - b.timestamp);
        
        setMatches(formattedMatches);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Unable to load matches');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...matches];

    if (statusFilter === 'live') {
      filtered = filtered.filter(m => m.isLive);
    } else if (statusFilter === 'today') {
      const today = new Date().toDateString();
      filtered = filtered.filter(m => new Date(m.timestamp).toDateString() === today);
    } else if (statusFilter === 'upcoming') {
      filtered = filtered.filter(m => m.timestamp > Date.now() && !m.isLive);
    }

    if (leagueFilter !== 'all') {
      filtered = filtered.filter(m => m.league === leagueFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.awayTeam.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMatches(filtered);
  };

  const handlePredict = (match) => {
    navigate('/predictions', { 
      state: { 
        homeTeam: match.homeTeam, 
        awayTeam: match.awayTeam 
      } 
    });
  };

  const getStatusBadge = (match) => {
    if (match.isLive) {
      return <Badge bg="danger" className="pulse-badge">LIVE</Badge>;
    } else if (match.status === 'FINISHED') {
      return <Badge bg="secondary">FT</Badge>;
    } else {
      return <Badge bg="success">Scheduled</Badge>;
    }
  };

  return (
    <div className="all-matches-page">
      <Container fluid>
        <div className="page-header-matches">
          <h1>
            <FaFutbol className="me-3" />
            All Matches
          </h1>
          <p>Complete fixture list with live scores and schedules</p>
        </div>

        <Card className="filters-card-matches mb-4">
          <Card.Body>
            <Row>
              <Col md={3} className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Matches</option>
                  <option value="live">Live Now</option>
                  <option value="today">Today</option>
                  <option value="upcoming">Upcoming</option>
                </Form.Select>
              </Col>

              <Col md={4} className="mb-3">
                <Form.Label>League</Form.Label>
                <Form.Select 
                  value={leagueFilter}
                  onChange={(e) => setLeagueFilter(e.target.value)}
                >
                  <option value="all">All Leagues</option>
                  {topLeagues.map(league => (
                    <option key={league} value={league}>{league}</option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={5} className="mb-3">
                <Form.Label>Search Teams</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search for teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
            </Row>

            <div className="filter-stats">
              <Badge bg="primary" className="me-2">
                Total: {matches.length}
              </Badge>
              <Badge bg="success" className="me-2">
                Filtered: {filteredMatches.length}
              </Badge>
              {filteredMatches.filter(m => m.isLive).length > 0 && (
                <Badge bg="danger">
                  Live: {filteredMatches.filter(m => m.isLive).length}
                </Badge>
              )}
            </div>
          </Card.Body>
        </Card>

        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
          <Tab eventKey="table" title="Table View">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading matches...</p>
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <Card className="matches-table-card">
                <Table responsive hover className="matches-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>League</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Home Team</th>
                      <th>Score</th>
                      <th>Away Team</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMatches.map((match) => (
                      <tr key={match.id} className={match.isLive ? 'live-row' : ''}>
                        <td>{getStatusBadge(match)}</td>
                        <td>
                          <small className="text-muted">{match.league}</small>
                        </td>
                        <td>
                          <FaCalendar className="me-2 text-muted" />
                          {match.date}
                        </td>
                        <td>
                          <FaClock className="me-2 text-muted" />
                          {match.time}
                        </td>
                        <td>
                          <div className="team-cell">
                            <img src={match.homeTeamLogo} alt="" className="team-logo-small" />
                            <strong>{match.homeTeam}</strong>
                          </div>
                        </td>
                        <td>
                          {match.isLive || match.status === 'FINISHED' ? (
                            <Badge bg="dark" className="score-badge">
                              {match.homeScore} - {match.awayScore}
                            </Badge>
                          ) : (
                            <span className="text-muted">vs</span>
                          )}
                        </td>
                        <td>
                          <div className="team-cell">
                            <img src={match.awayTeamLogo} alt="" className="team-logo-small" />
                            <strong>{match.awayTeam}</strong>
                          </div>
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => handlePredict(match)}
                          >
                            Predict
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            )}
          </Tab>

          <Tab eventKey="grid" title="Grid View">
            <Row>
              {filteredMatches.map((match) => (
                <Col lg={4} md={6} key={match.id} className="mb-4">
                  <Card className="match-card-grid">
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-3">
                        <Badge bg="secondary">{match.league}</Badge>
                        {getStatusBadge(match)}
                      </div>
                      <div className="match-teams-grid">
                        <div className="team-grid">
                          <img src={match.homeTeamLogo} alt="" />
                          <span>{match.homeTeam}</span>
                        </div>
                        <div className="score-grid">
                          {match.isLive || match.status === 'FINISHED' ? (
                            <h3>{match.homeScore} - {match.awayScore}</h3>
                          ) : (
                            <h3>VS</h3>
                          )}
                        </div>
                        <div className="team-grid">
                          <img src={match.awayTeamLogo} alt="" />
                          <span>{match.awayTeam}</span>
                        </div>
                      </div>
                      <div className="match-info-grid">
                        <FaCalendar className="me-2" />
                        {match.date} • {match.time}
                      </div>
                      <Button 
                        variant="primary" 
                        className="w-100 mt-3"
                        onClick={() => handlePredict(match)}
                      >
                        Get Prediction
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default AllMatches;