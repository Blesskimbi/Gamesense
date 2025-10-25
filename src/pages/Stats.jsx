import { Container, Row, Col, Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import { FaChartBar, FaTrophy, FaCheckCircle, FaTimesCircle, FaBolt, FaFire } from 'react-icons/fa';
import './Stats.css';

function Stats() {
  const overallStats = [
    { label: 'Total Predictions', value: '234', icon: FaTrophy, color: 'warning' },
    { label: 'Correct Predictions', value: '159', icon: FaCheckCircle, color: 'success' },
    { label: 'Incorrect', value: '75', icon: FaTimesCircle, color: 'danger' },
    { label: 'Overall Accuracy', value: '68%', icon: FaChartBar, color: 'primary' }
  ];

  const accuracyData = [
    { market: 'Match Result', total: 234, correct: 159, accuracy: 68, trend: '+5%' },
    { market: 'Over/Under 2.5', total: 234, correct: 167, accuracy: 71, trend: '+3%' },
    { market: 'Both Teams Score', total: 234, correct: 154, accuracy: 66, trend: '-2%' },
    { market: 'Exact Score', total: 234, correct: 47, accuracy: 20, trend: '+1%' }
  ];

  const recentPredictions = [
    {
      id: 1,
      match: 'Man United vs Liverpool',
      prediction: 'Draw',
      result: 'Draw',
      correct: true,
      confidence: 65,
      date: '2025-10-24'
    },
    {
      id: 2,
      match: 'Barcelona vs Real Madrid',
      prediction: 'Home Win',
      result: 'Away Win',
      correct: false,
      confidence: 72,
      date: '2025-10-23'
    },
    {
      id: 3,
      match: 'Bayern vs Dortmund',
      prediction: 'Home Win',
      result: 'Home Win',
      correct: true,
      confidence: 68,
      date: '2025-10-22'
    },
    {
      id: 4,
      match: 'PSG vs Marseille',
      prediction: 'Home Win',
      result: 'Home Win',
      correct: true,
      confidence: 81,
      date: '2025-10-21'
    }
  ];

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 70) return 'success';
    if (accuracy >= 60) return 'warning';
    return 'danger';
  };

  const getAccuracyStatus = (accuracy) => {
    if (accuracy >= 70) return 'Excellent';
    if (accuracy >= 60) return 'Good';
    return 'Needs Work';
  };

  return (
    <div className="stats-page">
      <Container>
        <div className="page-header">
          <div className="header-content">
            <Badge className="header-badge">
              <FaFire className="me-2" />
              Performance Analytics
            </Badge>
            <h1 className="page-title">
              Prediction Statistics
            </h1>
            <p className="page-subtitle">
              Track accuracy, analyze performance, and improve prediction models
            </p>
          </div>
        </div>

        {/* Overall Stats Grid */}
        <Row className="stats-grid mb-5">
          {overallStats.map((stat, index) => (
            <Col lg={3} md={6} key={index} className="mb-4">
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon-wrapper" data-color={stat.color}>
                    <stat.icon className="stat-icon" />
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Accuracy by Market */}
        <Card className="accuracy-card mb-5">
          <Card.Header>
            <div className="card-header-content">
              <FaChartBar className="header-icon" />
              <div>
                <h5 className="card-title-custom">Accuracy by Market Type</h5>
                <p className="card-subtitle-custom">Performance breakdown across different prediction markets</p>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table className="accuracy-table" hover>
                <thead>
                  <tr>
                    <th>Market Type</th>
                    <th>Total</th>
                    <th>Correct</th>
                    <th>Accuracy Rate</th>
                    <th>Trend</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {accuracyData.map((item, index) => (
                    <tr key={index}>
                      <td className="market-name">{item.market}</td>
                      <td className="data-cell">{item.total}</td>
                      <td className="data-cell">{item.correct}</td>
                      <td>
                        <div className="accuracy-display">
                          <div className="accuracy-bar-container">
                            <ProgressBar 
                              now={item.accuracy} 
                              variant={getAccuracyColor(item.accuracy)}
                              className="custom-progress"
                            />
                          </div>
                          <span className="accuracy-percentage">{item.accuracy}%</span>
                        </div>
                      </td>
                      <td>
                        <Badge 
                          bg={item.trend.startsWith('+') ? 'success' : 'danger'}
                          className="trend-badge"
                        >
                          {item.trend}
                        </Badge>
                      </td>
                      <td>
                        <Badge 
                          bg={getAccuracyColor(item.accuracy)}
                          className="status-badge"
                        >
                          {getAccuracyStatus(item.accuracy)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Recent Predictions */}
        <Card className="recent-predictions-card">
          <Card.Header>
            <div className="card-header-content">
              <FaBolt className="header-icon" />
              <div>
                <h5 className="card-title-custom">Recent Predictions</h5>
                <p className="card-subtitle-custom">Your latest prediction results</p>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table className="predictions-table" hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Match</th>
                    <th>Prediction</th>
                    <th>Actual Result</th>
                    <th>Confidence</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPredictions.map((pred) => (
                    <tr key={pred.id} className={pred.correct ? 'correct-row' : 'incorrect-row'}>
                      <td className="date-cell">{pred.date}</td>
                      <td className="match-cell">{pred.match}</td>
                      <td className="prediction-cell">{pred.prediction}</td>
                      <td className="result-cell">{pred.result}</td>
                      <td>
                        <div className="confidence-display">
                          <ProgressBar 
                            now={pred.confidence} 
                            variant="info"
                            className="confidence-bar"
                          />
                          <span className="confidence-text">{pred.confidence}%</span>
                        </div>
                      </td>
                      <td>
                        {pred.correct ? (
                          <Badge bg="success" className="result-badge">
                            <FaCheckCircle className="me-1" />
                            Correct
                          </Badge>
                        ) : (
                          <Badge bg="danger" className="result-badge">
                            <FaTimesCircle className="me-1" />
                            Incorrect
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Stats;