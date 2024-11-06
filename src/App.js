
// src/App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForumPage from './pages/forumPage'; // Ensure the path is correct

// Components import
import NavigationBar from './components/navigation-bar/NavigationBar';
import HomePage from './pages/homePage';
import LoginPage from './pages/login';
import CreateAccount from './pages/createAccount';
// import PageHeader from './components/page-header/PageHeader';

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <NavigationBar />
      {/* <PageHeader websiteName="George Mason University" pageName="LOST AND FOUND" /> */}
      {/* Main Content */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Placeholder for home page */}
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        {/* Add routes here for more pages */}
      </Routes>
    </Router>
  );
}

export default App;
