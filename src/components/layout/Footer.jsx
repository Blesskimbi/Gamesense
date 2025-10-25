import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaEnvelope, FaFutbol } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="custom-footer">
      <Container>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="footer-brand">
              <FaFutbol className="footer-logo" />
              <h4 className="footer-title">
                Game<span className="accent">Sense</span>
              </h4>
            </div>
            <p className="footer-description">
              Smart football predictions powered by advanced algorithms and real-time data analysis.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>
          
          <div className="col-md-2 col-6 mb-4">
            <h6 className="footer-heading">Product</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/predictions">Predictions</Link></li>
              <li><Link to="/stats">Statistics</Link></li>
            </ul>
          </div>
          
          <div className="col-md-2 col-6 mb-4">
            <h6 className="footer-heading">Company</h6>
            <ul className="footer-links">
              <li><Link to="/about">About</Link></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          
          <div className="col-md-2 col-6 mb-4">
            <h6 className="footer-heading">Resources</h6>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          
          <div className="col-md-2 col-6 mb-4">
            <h6 className="footer-heading">Legal</h6>
            <ul className="footer-links">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <hr className="footer-divider" />
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; 2025 GameSense. Built with React & Supabase.
          </p>
          <p className="disclaimer-text">
            <strong>Disclaimer:</strong> Predictions are for informational purposes only. Always gamble responsibly.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;