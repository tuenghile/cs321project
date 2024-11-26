/* eslint-disable no-undef */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

describe('<NavigationBar /> Responsive Behavior', () => {
  const viewports = [
    { size: 'iphone-6', width: 375, height: 667 }, // Mobile
    { size: 'ipad-2', width: 768, height: 1024 }, // Tablet
    { size: 'desktop', width: 1280, height: 800 }, // Desktop
  ];

  viewports.forEach(({ size, width, height }) => {
    it(`Should display navigation links correctly on ${size} (${width}x${height})`, () => {
      cy.viewport(width, height);

      cy.mount(
        <MemoryRouter>
          <NavigationBar />
        </MemoryRouter>
      );

      // Check visibility of navigation links and hamburger menu together
      if (width <= 810) { // Small screens
        cy.get('[data-testid="hamburger-menu"]').should('be.visible');
        cy.get('[data-testid="nav-bar-list"]').should('not.be.visible');
      } else { // Larger screens
        cy.get('[data-testid="hamburger-menu"]').should('not.be.visible');
        cy.get('[data-testid="nav-bar-list"]').should('be.visible');
      }
    });
  });
});
