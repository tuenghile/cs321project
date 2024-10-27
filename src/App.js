
// src/App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ForumPage from './components/forumPage'; // Ensure the path is correct

// Components import
import NavigationBar from './components/navigation-bar/NavigationBar';

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <NavigationBar />

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
