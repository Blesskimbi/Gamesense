import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Predictions from './pages/Predictions';
import Stats from './pages/Stats';
import Account from './pages/Account';
import About from './pages/About';
import AllMatches from './pages/AllMatches';  // ADD THIS

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/all-matches" element={<AllMatches />} />  {/* ADD THIS */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;