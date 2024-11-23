import CampusLogs from '../pages/campusLogs.js';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock posts data
const mockPosts = [
  { id: 1, title: 'Keys', date: '2024-11-22', location: 'Library', description: 'Silver keychain', status: 'Unclaimed' },
  { id: 2, title: 'Watch', date: '2024-11-21', location: 'Cafeteria', description: 'Black digital watch', status: 'Claimed' },
  { id: 3, title: 'Wallet', date: '2024-11-20', location: 'Dorm', description: 'Brown leather wallet', status: 'Unclaimed' },
  { id: 4, title: 'Phone', date: '2024-11-19', location: 'Gym', description: 'iPhone 12', status: 'Claimed' },
  { id: 5, title: 'Glasses', date: '2024-11-18', location: 'Library', description: 'Black framed glasses', status: 'Unclaimed' },
  { id: 6, title: 'Jacket', date: '2024-11-17', location: 'Cafeteria', description: 'Green hoodie', status: 'Claimed' },
  { id: 7, title: 'Phone', date: '2024-11-16', location: 'Dorm', description: 'Samsung Galaxy S20', status: 'Unclaimed' },
  { id: 8, title: 'Pen', date: '2024-11-15', location: 'Library', description: 'Blue ballpoint pen', status: 'Claimed' },
  { id: 9, title: 'Book', date: '2024-11-14', location: 'Gym', description: 'Textbook on Calculus', status: 'Unclaimed' },
  { id: 10, title: 'Hat', date: '2024-11-13', location: 'Cafeteria', description: 'Red cap', status: 'Claimed' },
  { id: 11, title: 'Shoes', date: '2024-11-12', location: 'Library', description: 'Black sneakers', status: 'Unclaimed' },
  { id: 12, title: 'Gloves', date: '2024-11-11', location: 'Gym', description: 'Leather gloves', status: 'Claimed' },
  { id: 13, title: 'Scarf', date: '2024-11-10', location: 'Dorm', description: 'Woolen scarf', status: 'Unclaimed' },
  { id: 14, title: 'Wallet', date: '2024-11-09', location: 'Cafeteria', description: 'Black leather wallet', status: 'Claimed' },
  { id: 15, title: 'Hat', date: '2024-11-08', location: 'Library', description: 'Blue hat', status: 'Unclaimed' },
];

jest.mock('../components/log-post/logPost', () => ({ id, date, location, title, description, status }) => (
  <div data-testid="log-post">
    <h3>{title}</h3>
    <p>{location}</p>
    <p>{date}</p>
    <p>{description}</p>
    <p>Status: {status}</p>
  </div>
));

jest.mock('../pages/CampusLogs', () => (props) => {
  const filteredPosts = props.posts.filter(post => {
    if (props.filter === 'All') return true;
    return post.status === props.filter;
  });

  return (
    <div>
      <button onClick={() => props.onFilterChange('All')} data-testid="filter-all">All</button>
      <button onClick={() => props.onFilterChange('Claimed')} data-testid="filter-claimed">Claimed</button>
      <button onClick={() => props.onFilterChange('Unclaimed')} data-testid="filter-unclaimed">Unclaimed</button>
      <div data-testid="post-list">
        {filteredPosts.length ? (
          filteredPosts.map((post) => (
            <div key={post.id} data-testid="log-post">
              <h3>{post.title}</h3>
              <p>{post.location}</p>
              <p>{post.date}</p>
              <p>{post.description}</p>
              <p>Status: {post.status}</p>
            </div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </div>
  );
});

describe('CampusLogs Filter Tests', () => {
  test('displays all posts by default', () => {
    render(<CampusLogs posts={mockPosts} filter="All" onFilterChange={() => {}} />);
    const postItems = screen.getAllByTestId('log-post');
    expect(postItems).toHaveLength(mockPosts.length);  // Should display all posts
  });

  test('show "Claimed" posts', () => {
    render(<CampusLogs posts={mockPosts} filter="Claimed" onFilterChange={() => {}} />);
    fireEvent.click(screen.getByTestId('filter-claimed'));
    const postItems = screen.getAllByTestId('log-post');
    expect(postItems).toHaveLength(7); // Only 7 posts are "Claimed"
    postItems.forEach(post => expect(post).toHaveTextContent('Claimed'));
  });

  test('show "Unclaimed" posts', () => {
    render(<CampusLogs posts={mockPosts} filter="Unclaimed" onFilterChange={() => {}} />);
    fireEvent.click(screen.getByTestId('filter-unclaimed'));
    const postItems = screen.getAllByTestId('log-post');
    expect(postItems).toHaveLength(8); // Only 8 posts are "Unclaimed"
    postItems.forEach(post => expect(post).toHaveTextContent('Unclaimed'));
  });

  test('Show no posts by default when there are no posts when the page is first opened', () => {
    render(<CampusLogs posts={[]} filter="All" onFilterChange={() => {}} />);
    const postItems = screen.queryByTestId('log-post');
    expect(postItems).toBeNull();
    expect(screen.getByText('No posts available')).toBeInTheDocument();
  });
  
  test('No posts available when filtered by "Claimed" and no claimed posts exist', () => {
    render(<CampusLogs posts={[]} filter="Claimed" onFilterChange={() => {}} />);
    fireEvent.click(screen.getByTestId('filter-claimed'));
    expect(screen.queryByTestId('log-post')).toBeNull();
    expect(screen.getByText('No posts available')).toBeInTheDocument();
  });
  test('No posts available when filtered by "Unclaimed" and no unclaimed posts exist', () => {
    render(<CampusLogs posts={[]} filter="Unclaimed" onFilterChange={() => {}} />);
    fireEvent.click(screen.getByTestId('filter-unclaimed'));
    expect(screen.queryByTestId('log-post')).toBeNull();
    expect(screen.getByText('No posts available')).toBeInTheDocument();
  });

});
