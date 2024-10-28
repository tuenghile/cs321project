
// src/App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForumPage from './pages/forumPage'; // Ensure the path is correct

// Components import
import NavigationBar from './components/navigation-bar/NavigationBar';
import HomePage from './pages/homePage';
// import PageHeader from './components/page-header/PageHeader';

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <NavigationBar />
      {/* <PageHeader websiteName="George Mason University" pageName="LOST AND FOUND" /> */}
      <HomePage />
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
