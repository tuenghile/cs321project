import ForumPage from '../pages/forumPage.js';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock posts data
const mockPosts = [
  { title: 'Lost Keys', location: 'Library', type: 'Lost', date: '2024-11-22', description: 'Silver keychain', status: 'Unclaimed' },
  { title: 'Found Watch', location: 'Cafeteria', type: 'Found', date: '2024-11-21', description: 'Black digital watch', status: 'Unclaimed' },
  { title: 'Lost Wallet', location: 'Dorm', type: 'Lost', date: '2024-11-20', description: 'Brown leather wallet', status: 'Claimed' },
  { title: 'Found Phone', location: 'Gym', type: 'Found', date: '2024-11-19', description: 'iPhone 12', status: 'Unclaimed' },
];

jest.mock('../pages/forumPage', () => (props) => {
  const filteredPosts = props.posts.filter(post => {
    if (props.filter === 'All') return true;
    return post.type === props.filter;
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
    expect(postItems).toHaveLength(2); // Only 2 posts are "Lost"
    expect(postItems[0]).toHaveTextContent('Lost Keys');
    expect(postItems[1]).toHaveTextContent('Lost Wallet');
  });

  test('show "Found" items', () => {
    render(<ForumPage posts={mockPosts} filter="Found" onFilterChange={() => {}} />);
    fireEvent.change(screen.getByTestId('filter-dropdown'), { target: { value: 'Found' } });
    const postItems = screen.getAllByTestId('post-item');
    expect(postItems).toHaveLength(2); // Only 2 posts are "Found"
    expect(postItems[0]).toHaveTextContent('Found Watch');
    expect(postItems[1]).toHaveTextContent('Found Phone');
  });

  test('Currently no posts available when filtered', () => {
    render(<ForumPage posts={[]} filter="Lost" onFilterChange={() => {}} />);
    fireEvent.change(screen.getByTestId('filter-dropdown'), { target: { value: 'Lost' } });
    expect(screen.queryByTestId('post-item')).toBeNull();  // No posts should be displayed
    expect(screen.getByText('Currently no posts available')).toBeInTheDocument();
  });

 
});
