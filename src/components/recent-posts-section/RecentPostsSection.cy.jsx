/* eslint-disable no-undef */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import RecentPostsSection from './RecentPostsSection';

describe('<RecentPostsSection /> Responsive Grid', () => {
  const viewports = [
    { size: 'iphone-6', width: 375, height: 667 }, // Mobile
    { size: 'ipad-2', width: 768, height: 1024 }, // Tablet
    { size: 'desktop', width: 1280, height: 800 }, // Desktop
  ];

  const dummyPosts = [
    {
      title: 'Lost Wallet',
      location: 'Library',
      description: 'Black leather wallet with ID and credit cards.',
      image: null,
      type: 'lost',
      date: '2024-11-20',
      status: 'open',
      email: 'user1@example.com',
    },
    {
      title: 'Found Keys',
      location: 'Cafeteria',
      description: 'Set of car keys with a blue keychain.',
      image: null,
      type: 'found',
      date: '2024-11-21',
      status: 'resolved',
      email: 'user2@example.com',
    },
    {
      title: 'Lost Phone',
      location: 'Gym',
      description: 'iPhone 13 with a black case and a cracked screen.',
      image: null,
      type: 'lost',
      date: '2024-11-22',
      status: 'open',
      email: 'user3@example.com',
    },
    {
      title: 'Found Glasses',
      location: 'Classroom 101',
      description: 'Pair of reading glasses with a black frame.',
      image: null,
      type: 'found',
      date: '2024-11-23',
      status: 'resolved',
      email: 'user4@example.com',
    },
    {
      title: 'Lost Backpack',
      location: 'Bus Stop',
      description: 'Blue backpack with school supplies and a laptop.',
      image: null,
      type: 'lost',
      date: '2024-11-24',
      status: 'open',
      email: 'user5@example.com',
    },
    {
      title: 'Found Watch',
      location: 'Park',
      description: 'Silver wristwatch with an engraved name on the back.',
      image: null,
      type: 'found',
      date: '2024-11-25',
      status: 'open',
      email: 'user6@example.com',
    },
  ];

  beforeEach(() => {
    // Mock API call
    cy.intercept('GET', 'http://localhost:3002/item/recent', {
      statusCode: 200,
      body: dummyPosts,
    }).as('getRecentPosts');
  });

  viewports.forEach(({ size, width, height }) => {
    it(`Should render correctly on ${size} (${width}x${height})`, () => {
      // Set the viewport size
      cy.viewport(width, height);

      // Mount the component wrapped in a router
      cy.mount(
        <MemoryRouter>
          <RecentPostsSection posts={dummyPosts} />
        </MemoryRouter>
      );

      // Wait for the api call to complete
      cy.wait('@getRecentPosts');

      // Verify the grid container exists
      cy.get('[data-testid="posts-grid"]').should('exist');

      // Dynamically verify grid-template-columns
      cy.get('[data-testid="posts-grid"]')
        .invoke('css', 'grid-template-columns')
        .then((columns) => {
          const columnsArray = columns.split(' ');
          if (width <= 480) {
            expect(columnsArray).to.have.length(1);
          } else if (width <= 768) {
            expect(columnsArray).to.have.length(1);
          } else {
            expect(columnsArray).to.have.length(3);
          }
        });

      // Dynamically verify grid-template-rows
      cy.get('[data-testid="posts-grid"]')
        .invoke('css', 'grid-template-rows')
        .then((rows) => {
          const rowsArray = rows.split(' ');
          expect(rowsArray.length).to.be.gte(1);
          rowsArray.forEach((row) => expect(row).to.match(/^\d+px$/));
        });
    });
  });
});
