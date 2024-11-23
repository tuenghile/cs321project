import React, { useState, useEffect } from 'react';
import PageHeader from '../components/page-header/PageHeader';
import PageFooter from '../components/PageFooter/PageFooter';
import LogPost from '../components/log-post/logPost';

import './css/campusLogs.css';

const CampusLogs = () => {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFilterChange = (status) => {
    setFilter(status);
    setShowDropdown(false); // Close dropdown after selection
    updatePostsResults();
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const getAllPosts = async () => {
      try{
        //returns an array of json
        const response = await fetch("http://localhost:3002/item/all");
        if (response.ok){
          setCurrentPosts(await response.json()); 
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

  const filteredPosts = (Array.isArray(currentPosts) ? currentPosts : []).filter((currentPosts) => {
    // console.log(`Filtering post with status: ${currentPosts.status}, Current filter: ${filter}`);
    return filter === 'All' || currentPosts.status === filter;
  });

  const updatePostsResults = async () => {
    try{
      //returns an array of json
      const response = await fetch("http://localhost:3002/item/all");
      if (response.ok){
        setCurrentPosts(await response.json());
      }
      else { 
        throw Error();
      }
    }
    catch(error){//TODO: handle server error
      console.error(error);
    }
  }

  return (
    <div id="campus-logs">
      <PageHeader
        pageName="Inventory Logs"
        pageDescription={"Browse the items currently stored in GMU's two Lost and Found locations."}
      />
      <div className="campus-logs-container">
        <div className="logs-header">
          <div className="filter-dropdown">
            <button onClick={toggleDropdown} className="filter-button">
              Filter: {filter}
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <div onClick={() => handleFilterChange('All')} className="dropdown-item">
                  All
                </div>
                <div onClick={() => handleFilterChange('Claimed')} className="dropdown-item">
                  Claimed
                </div>
                <div onClick={() => handleFilterChange('Unclaimed')} className="dropdown-item">
                  Unclaimed
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="posts-container">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <LogPost
                key={index}
                id={post._id}
                itemName={post.itemName}
                date={post.date}
                location={post.location}
                title={post.title}
                description={post.description}
                status={post.status}
              />
            ))
          ) : (
            <div className="no-posts-message">No posts available</div>
          )}
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

export default CampusLogs;