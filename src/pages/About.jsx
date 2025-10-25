import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { FaInfoCircle, FaShieldAlt, FaChartLine, FaCode, FaBolt, FaRocket, FaDatabase, FaCog } from 'react-icons/fa';
import './About.css';

function About() {
  const features = [
    {
      icon: FaChartLine,
      title: 'Data-Driven',
      description: 'Predictions based on real statistics, historical data, and advanced algorithms.',
      color: 'primary'
    },
    {
      icon: FaShieldAlt,
      title: 'Transparent',
      description: 'Clear reasoning behind every prediction with confidence scores.',
      color: 'success'
    },
    {
      icon: FaBolt,
      title: 'Instant Results',
      description: 'Get predictions in seconds with our lightning-fast engine.',
      color: 'warning'
    },
    {
      icon: FaRocket,
      title: '100% Free',
      description: 'No hidden costs, no premium features, just pure predictions.',
      color: 'info'
    }
  ];

  const techStack = {
    frontend: [
      { name: 'React 18', description: 'Modern UI library' },
      { name: 'React Router', description: 'Client-side routing' },
      { name: 'Bootstrap 5', description: 'Responsive design' },
      { name: 'Recharts', description: 'Data visualization' }
    ],
    backend: [
      { name: 'Supabase', description: 'Database & Auth' },
      { name: 'Football-Data API', description: 'Live match data' },
      { name: 'Custom Engine', description: 'Prediction algorithm' },
      { name: 'Vercel', description: 'Hosting platform' }
    ]
  };

  const howItWorks = [
    {
      step: 1,
      title: 'Data Collection',
      description: 'System gathers team statistics, recent form, head-to-head records, and venue data.',
      icon: FaDatabase
    },
    {
      step: 2,
      title: 'Algorithm Analysis',
      description: 'Rule-based engine applies weighted scoring across multiple factors.',
      icon: FaCog
    },
    {
      step: 3,
      title: 'Prediction Generation',
      description: 'Probabilities calculated and converted to actionable predictions.',
      icon: FaBolt
    },
    {
      step: 4,
      title: 'Continuous Learning',
      description: 'Track accuracy and refine models based on actual results.',
      icon: FaRocket
    }
  ];

  return (
    <div className="about-page">
      <Container>
        {/* Header */}
        <div className="page-header">
          <Badge className="header-badge">
            <FaInfoCircle className="me-2" />
            About the Project
          </Badge>
          <h1 className="page-title">
            Built for Accuracy,
            <span className="gradient-text"> Designed for Simplicity</span>
          </h1>
          <p className="page-subtitle">
            GameSense combines advanced algorithms with real-time data to deliver
            accurate football predictions for informed decision-making.
          </p>
        </div>

        {/* What is GameSense */}
        <Card className="intro-card mb-5">
          <Card.Body>
            <h2 className="section-title">What is GameSense?</h2>
            <p className="intro-text">
              GameSense is a <strong>free, full-stack prediction platform</strong> that uses advanced
              algorithms to analyze football matches and provide instant predictions with confidence scores.
            </p>
            <p className="intro-text">
              Our system analyzes multiple factors including <strong>team form</strong>, <strong>historical performance</strong>,
              <strong> home advantage</strong>, <strong>goal statistics</strong>, and <strong>head-to-head records</strong> to
              generate accurate predictions for match outcomes, over/under goals, and both teams to score scenarios.
            </p>
          </Card.Body>
        </Card>

        {/* Features Grid */}
        <div className="features-section mb-5">
          <h2 className="section-title text-center mb-4">Why Choose GameSense?</h2>
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="feature-card-about">
                  <Card.Body className="text-center">
                    <div className={`feature-icon-wrapper-about ${feature.color}`}>
                      <feature.icon className="feature-icon-about" />
                    </div>
                    <h4 className="feature-title-about">{feature.title}</h4>
                    <p className="feature-text-about">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* How It Works */}
        <Card className="how-it-works-card mb-5">
          <Card.Header>
            <h2 className="section-title mb-0">How Our Prediction Engine Works</h2>
          </Card.Header>
          <Card.Body>
            <Row>
              {howItWorks.map((item) => (
                <Col md={6} lg={3} key={item.step} className="mb-4">
                  <div className="process-step">
                    <div className="step-number">{item.step}</div>
                    <div className="step-icon-wrapper">
                      <item.icon className="step-icon" />
                    </div>
                    <h5 className="step-title">{item.title}</h5>
                    <p className="step-description">{item.description}</p>
                  </div>
                </Col>
              ))}
            </Row>

            <div className="methodology-section mt-4">
              <h5 className="methodology-title">Current Methodology</h5>
              <p className="methodology-text">
                <strong>Phase 1: Rule-Based System</strong> - Our current engine uses a sophisticated
                rule-based algorithm that considers home advantage, recent form (last 5-10 matches),
                goal statistics, head-to-head data, and team strength metrics.
              </p>
              <p className="methodology-text">
                <strong>Phase 2: Machine Learning (Coming Soon)</strong> - We're training ML models
                including Logistic Regression, Random Forest, and Neural Networks on historical
                data to improve accuracy even further.
              </p>
            </div>
          </Card.Body>
        </Card>

        {/* Technology Stack */}
        <Card className="tech-stack-card mb-5">
          <Card.Header>
            <div className="d-flex align-items-center gap-3">
              <FaCode className="header-icon-large" />
              <div>
                <h2 className="section-title mb-0">Technology Stack</h2>
                <p className="text-muted mb-0">Built with modern, reliable technologies</p>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6} className="mb-4">
                <div className="tech-category">
                  <h5 className="tech-category-title">
                    <FaRocket className="me-2" />
                    Frontend
                  </h5>
                  <ul className="tech-list">
                    {techStack.frontend.map((tech, index) => (
                      <li key={index} className="tech-item">
                        <div className="tech-name">{tech.name}</div>
                        <div className="tech-description">{tech.description}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              <Col md={6} className="mb-4">
                <div className="tech-category">
                  <h5 className="tech-category-title">
                    <FaDatabase className="me-2" />
                    Backend & Data
                  </h5>
                  <ul className="tech-list">
                    {techStack.backend.map((tech, index) => (
                      <li key={index} className="tech-item">
                        <div className="tech-name">{tech.name}</div>
                        <div className="tech-description">{tech.description}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Disclaimer */}
        <Alert variant="warning" className="disclaimer-alert">
          <Alert.Heading className="d-flex align-items-center gap-2">
            <FaShieldAlt size={24} />
            Important Disclaimer
          </Alert.Heading>
          <hr />
          <p className="mb-2">
            <strong>GameSense predictions are for informational and educational purposes only.</strong>
          </p>
          <ul className="disclaimer-list">
            <li>Our predictions are probabilistic estimates, not guarantees</li>
            <li>Past performance does not guarantee future results</li>
            <li>Always gamble responsibly and within your means</li>
            <li>We do not encourage or promote gambling</li>
            <li>This tool should be used for entertainment and analysis only</li>
            <li>Seek professional help if you have gambling-related problems</li>
          </ul>
        </Alert>
      </Container>
    </div>
  );
}

export default About;