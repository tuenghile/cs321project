// CampusLogs.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/page-header/PageHeader';
import PageFooter from '../components/PageFooter/PageFooter';
import LogPost from '../components/log-post/logPost';

import './css/campusLogs.css';

const CampusLogs = ({ posts = [] }) => {
  const [filter, setFilter] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFilterChange = (status) => {
    setFilter(status);
    setShowDropdown(false); // Close dropdown after selection
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const filteredPosts = (Array.isArray(posts) ? posts : []).filter(
    (post) => filter === 'All' || post.status === filter
  );

  return (
    <div>
      <PageHeader pageName="Campus Logs" />
      <div className="campus-logs-container">
        <div className="logs-header">
          <Link to="/update-logs">
            <button className="update-logs-button">Update Logs</button>
          </Link>
          <div className="filter-dropdown">
            <button onClick={toggleDropdown} className="filter-button">
              Filter: {filter} ▼
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
          {filteredPosts.map((post, index) => (
            <LogPost
              key={index}
              itemName={post.itemName}
              date={post.date}
              location={post.location}
              title={post.title}
              description={post.description}
            />
          ))}
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

export default CampusLogs;


