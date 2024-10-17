
// src/App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ForumPage from './components/forumPage'; // Ensure the path is correct

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="brand-logo">
            Lost & Found
          </Link>
        </div>
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/forum">View Posts</Link>
          </li>
          <li className="navbar-item">
            <Link to="/logs">Check Logs</Link> 
          </li>
        </ul>

        {/* Search Bar */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search with keywords"
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </nav>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} /> {/* Placeholder for home page */}
        <Route path="/forum" element={<ForumPage />} />
        {/* Add routes here for more pages */}
      </Routes>
    </Router>
  );
}

export default App;
