import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar as BSNavbar, Nav } from 'react-bootstrap';
import { FaFutbol, FaChartLine, FaUser, FaInfoCircle, FaChartBar } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <BSNavbar className="custom-navbar" expand="lg" sticky="top">
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="brand-logo">
          <div className="logo-wrapper">
            <FaFutbol className="logo-icon" />
            <span className="brand-text">
              Game<span className="brand-accent">Sense</span>
            </span>
          </div>
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
        
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`nav-link-custom ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/predictions" 
              className={`nav-link-custom ${isActive('/predictions') ? 'active' : ''}`}
            >
              <FaChartLine className="me-2" />
              Predictions
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/stats" 
              className={`nav-link-custom ${isActive('/stats') ? 'active' : ''}`}
            >
              <FaChartBar className="me-2" />
              Stats
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/about" 
              className={`nav-link-custom ${isActive('/about') ? 'active' : ''}`}
            >
              <FaInfoCircle className="me-2" />
              About
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/account" 
              className="btn-account"
            >
              <FaUser className="me-2" />
              Account
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;