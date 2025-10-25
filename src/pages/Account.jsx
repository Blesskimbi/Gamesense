import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaSave, FaChartLine, FaTrophy, FaCalendar } from 'react-icons/fa';
import { useState } from 'react';
import './Account.css';

function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="account-page">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <Card className="login-card">
                <Card.Body className="p-5">
                  <div className="login-header">
                    <div className="login-icon">
                      <FaUser />
                    </div>
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Sign in to your GameSense account</p>
                  </div>
                  
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-4">
                      <Form.Label>Email Address</Form.Label>
                      <div className="input-with-icon">
                        <FaEnvelope className="input-icon" />
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          required
                        />
                      </div>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <div className="input-with-icon">
                        <FaLock className="input-icon" />
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          required
                        />
                      </div>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check
                        type="checkbox"
                        label="Remember me"
                        className="remember-checkbox"
                      />
                      <a href="#" className="forgot-link">Forgot password?</a>
                    </div>
                    
                    <Button type="submit" className="btn-login">
                      Sign In
                    </Button>
                  </Form>
                  
                  <div className="login-divider">
                    <span>or</span>
                  </div>
                  
                  <div className="text-center">
                    <p className="signup-text">
                      Don't have an account? <a href="#" className="signup-link">Create one</a>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="account-page">
      <Container>
        <div className="page-header">
          <Badge className="header-badge">
            <FaUser className="me-2" />
            Your Dashboard
          </Badge>
          <h1 className="page-title">My Account</h1>
          <p className="page-subtitle">
            Manage your profile and track your prediction performance
          </p>
        </div>

        <Row>
          {/* Sidebar */}
          <Col lg={4} className="mb-4">
            <Card className="profile-card">
              <Card.Body className="text-center">
                <div className="profile-avatar">
                  <FaUser />
                </div>
                <h3 className="profile-name">John Doe</h3>
                <p className="profile-email">john.doe@example.com</p>
                <Badge bg="success" className="profile-badge">
                  Premium Member
                </Badge>
                
                <div className="profile-stats">
                  <div className="stat-item-profile">
                    <FaChartLine className="stat-icon-profile" />
                    <div className="stat-value-profile">72%</div>
                    <div className="stat-label-profile">Accuracy</div>
                  </div>
                  <div className="stat-divider-profile"></div>
                  <div className="stat-item-profile">
                    <FaTrophy className="stat-icon-profile" />
                    <div className="stat-value-profile">45</div>
                    <div className="stat-label-profile">Predictions</div>
                  </div>
                  <div className="stat-divider-profile"></div>
                  <div className="stat-item-profile">
                    <FaCalendar className="stat-icon-profile" />
                    <div className="stat-value-profile">30d</div>
                    <div className="stat-label-profile">Member</div>
                  </div>
                </div>
                
                <Button variant="outline-danger" className="btn-logout">
                  Sign Out
                </Button>
              </Card.Body>
            </Card>
            
            <Card className="quick-stats-card mt-4">
              <Card.Body>
                <h6 className="card-section-title">Quick Stats</h6>
                <div className="quick-stat-item">
                  <span className="quick-stat-label">Win Rate</span>
                  <span className="quick-stat-value success">65%</span>
                </div>
                <div className="quick-stat-item">
                  <span className="quick-stat-label">Draw Rate</span>
                  <span className="quick-stat-value warning">20%</span>
                </div>
                <div className="quick-stat-item">
                  <span className="quick-stat-label">Loss Rate</span>
                  <span className="quick-stat-value danger">15%</span>
                </div>
                <div className="quick-stat-item">
                  <span className="quick-stat-label">Avg Confidence</span>
                  <span className="quick-stat-value">68%</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col lg={8}>
            {/* Profile Information */}
            <Card className="settings-card mb-4">
              <Card.Header>
                <div className="card-header-content">
                  <FaEnvelope className="header-icon" />
                  <div>
                    <h5 className="card-title-custom">Profile Information</h5>
                    <p className="card-subtitle-custom">Update your personal details</p>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" defaultValue="John" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" defaultValue="Doe" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" defaultValue="john.doe@example.com" />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" defaultValue="johndoe" />
                  </Form.Group>
                  <Button className="btn-save">
                    <FaSave className="me-2" />
                    Save Changes
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Change Password */}
            <Card className="settings-card mb-4">
              <Card.Header>
                <div className="card-header-content">
                  <FaLock className="header-icon" />
                  <div>
                    <h5 className="card-title-custom">Security Settings</h5>
                    <p className="card-subtitle-custom">Update your password</p>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter current password" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm new password" />
                  </Form.Group>
                  <Button className="btn-save">
                    <FaLock className="me-2" />
                    Update Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Preferences */}
            <Card className="settings-card">
              <Card.Header>
                <div className="card-header-content">
                  <FaChartLine className="header-icon" />
                  <div>
                    <h5 className="card-title-custom">Preferences</h5>
                    <p className="card-subtitle-custom">Customize your experience</p>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Email notifications for new predictions"
                      defaultChecked
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Show confidence scores on predictions"
                      defaultChecked
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Auto-save predictions"
                      defaultChecked
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Default League</Form.Label>
                    <Form.Select>
                      <option>All Leagues</option>
                      <option>Premier League</option>
                      <option>La Liga</option>
                      <option>Bundesliga</option>
                      <option>Serie A</option>
                    </Form.Select>
                  </Form.Group>
                  <Button className="btn-save">
                    <FaSave className="me-2" />
                    Save Preferences
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Account;