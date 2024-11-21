
// src/App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ForumPage from './pages/forumPage';
import "./pages/css/variables.css";

// Components import
import NavigationBar from './components/navigation-bar/NavigationBar';
import HomePage from './pages/homePage';
import LoginPage from './pages/login';
import CreateAccount from './pages/createAccount';
import SettingsPage from './pages/settingsPage';
import EditProfilePage from './pages/editProfilePage';
import CampusLogs from './pages/campusLogs';
import UpdateLogs from './pages/updateLogs';
import AdminSettingsPage from './pages/adminSettingsPage';

function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try{
        //returns an array of json
        const response = await fetch("http://localhost:3002/item/all");
        if (response.ok){
          setPosts(await response.json()); 
        }
        else { 
          throw Error();
        }
      }
      catch(error){//TODO: handle server error
        
      }
    }
    getAllPosts();
  }, []);

  async function setSearchQuery(){
    try{
      //returns an array of json
      const response = await fetch("http://localhost:3002/item/recent");
      if (response.ok){
        setPosts(await response.json()); 
      }
      else { 
        throw Error();
      }
    }
    catch(error){//TODO: handle server error
      
    }
  }

  const addPost = (post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  return (
    <Router>
      <NavigationBar onSearch={setSearchQuery}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/campus-logs" element={<CampusLogs posts={posts} />} />
        <Route path="/update-logs" element={<UpdateLogs addPost={addPost} />} />
        <Route path="/admin-settings" element={<AdminSettingsPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;

