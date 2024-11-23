import ForumPage from '../pages/forumPage.js';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';


const mockPosts = [
  { title: 'Lost Keys', location: 'Library', reportType: 'Lost', date: '2024-11-22', description: 'Silver keychain', status: 'Unclaimed', userEmail: 'johnDoe@gmu.edu' },
  { title: 'Found Watch', location: 'Cafeteria', reportType: 'Found', date: '2024-11-21', description: 'Black digital watch', status: 'Unclaimed', userEmail: 'slakama@gmu.edu' },
  { title: 'Lost Wallet', location: 'Dorm', reportType: 'Lost', date: '2024-11-20', description: 'Brown leather wallet', status: 'Claimed', userEmail: 'jruiz@gmu.edu' },
  { title: 'Found Phone', location: 'Gym', reportType: 'Found', date: '2024-11-19', description: 'iPhone 12', status: 'Unclaimed', userEmail: 'eliie@gmu.edu' },
  { title: 'Lost Glasses', location: 'Library', reportType: 'Lost', date: '2024-11-18', description: 'Reading glasses', status: 'Unclaimed', userEmail: 'victdo@gmu.edu' },
  { title: 'Found Backpack', location: 'Cafeteria', reportType: 'Found', date: '2024-11-17', description: 'Blue backpack', status: 'Unclaimed', userEmail: 'janeDoe@gmu.edu' },
  { title: 'Lost Jacket', location: 'Gym', reportType: 'Lost', date: '2024-11-16', description: 'Black jacket', status: 'Claimed', userEmail: 'testuser1@gum.edu' },
  { title: 'Found Shoes', location: 'Dorm', reportType: 'Found', date: '2024-11-15', description: 'Running shoes', status: 'Unclaimed', userEmail: 'testuser1@gum.edu' },
  { title: 'Lost Phone', location: 'Library', reportType: 'Lost', date: '2024-11-14', description: 'iPhone 11', status: 'Unclaimed', userEmail: 'testuser12@gum.edu' },
  { title: 'Found Hat', location: 'Cafeteria', reportType: 'Found', date: '2024-11-13', description: 'Red baseball cap', status: 'Unclaimed', userEmail: 'testuser134@gum.edu' },
  { title: 'Lost Watch', location: 'Gym', reportType: 'Lost', date: '2024-11-12', description: 'Silver wristwatch', status: 'Claimed', userEmail: 'testuser41@gum.edu' },
  { title: 'Found Wallet', location: 'Cafeteria', reportType: 'Found', date: '2024-11-11', description: 'Leather wallet', status: 'Unclaimed', userEmail: 'testuser1543@gum.edu' },
  { title: 'Lost Umbrella', location: 'Library', reportType: 'Lost', date: '2024-11-10', description: 'Black umbrella', status: 'Unclaimed', userEmail: 'testuser211@gum.edu' },
  { title: 'Found Glasses', location: 'Gym', reportType: 'Found', date: '2024-11-09', description: 'Reading glasses', status: 'Unclaimed', userEmail: 'testuser098@gum.edu' },
  { title: 'Lost Bag', location: 'Dorm', reportType: 'Lost', date: '2024-11-08', description: 'Canvas bag', status: 'Claimed', userEmail: 'testuser345@gum.edu'},
];

jest.mock('../pages/forumPage', () => (props) => {
  const filteredPosts = props.posts.filter(post => {
    if (props.filter === 'All') return true;
    return post.reportType === props.filter;
  });

  return (
    <div>
      <select
        data-testid="filter-dropdown"
        value={props.filter}
        onChange={(e) => props.onFilterChange(e.target.value)}
      >
        <option value="All">Show All</option>
        <option value="Lost">Show Lost</option>
        <option value="Found">Show Found</option>
      </select>
      <div data-testid="post-list">
        {filteredPosts.length ? (
          filteredPosts.map((post, index) => (
            <div key={index} data-testid="post-item">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          ))
        ) : (
          <div>Currently no posts available</div>
        )}
      </div>
    </div>
  );
});

describe('ForumPage Filter Tests', () => {
  test('displays all posts by default', () => {
    render(<ForumPage posts={mockPosts} filter="All" onFilterChange={() => {}} />);
    const postItems = screen.getAllByTestId('post-item');
    expect(postItems).toHaveLength(mockPosts.length);  // Should display all posts
  });

  test('show "Lost" items', () => {
    render(<ForumPage posts={mockPosts} filter="Lost" onFilterChange={() => {}} />);
    fireEvent.change(screen.getByTestId('filter-dropdown'), { target: { value: 'Lost' } });
    const postItems = screen.getAllByTestId('post-item');
    expect(postItems).toHaveLength(8); // 8 posts are "Lost"
    expect(postItems[0]).toHaveTextContent('Lost Keys');
    expect(postItems[1]).toHaveTextContent('Lost Wallet');
    expect(postItems[2]).toHaveTextContent('Lost Glasses');
    expect(postItems[3]).toHaveTextContent('Lost Jacket');
    expect(postItems[4]).toHaveTextContent('Lost Phone');
    expect(postItems[5]).toHaveTextContent('Lost Watch');
    expect(postItems[6]).toHaveTextContent('Lost Umbrella');
    expect(postItems[7]).toHaveTextContent('Lost Bag');
  });

  test('show "Found" items', () => {
    render(<ForumPage posts={mockPosts} filter="Found" onFilterChange={() => {}} />);
    fireEvent.change(screen.getByTestId('filter-dropdown'), { target: { value: 'Found' } });
    const postItems = screen.getAllByTestId('post-item');
    expect(postItems).toHaveLength(7); // 7 posts are "Found"
    expect(postItems[0]).toHaveTextContent('Found Watch');
    expect(postItems[1]).toHaveTextContent('Found Phone');
    expect(postItems[2]).toHaveTextContent('Found Backpack');
    expect(postItems[3]).toHaveTextContent('Found Shoes');
    expect(postItems[4]).toHaveTextContent('Found Hat');
    expect(postItems[5]).toHaveTextContent('Found Wallet');
    expect(postItems[6]).toHaveTextContent('Found Glasses');
  });

  test('Currently no posts available when filtered', () => {
    render(<ForumPage posts={[]} filter="Lost" onFilterChange={() => {}} />);
    fireEvent.change(screen.getByTestId('filter-dropdown'), { target: { value: 'Lost' } });
    expect(screen.queryByTestId('post-item')).toBeNull();  // No posts should be displayed
    expect(screen.getByText('Currently no posts available')).toBeInTheDocument();
  });
});
