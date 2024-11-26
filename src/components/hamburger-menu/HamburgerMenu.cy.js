/* eslint-disable no-undef */
import { mount } from 'cypress/react'; // Ensure Cypress React support is installed
import HamburgerMenu from './HamburgerMenu';

describe('HamburgerMenu Responsiveness', () => {
  const viewports = [
    { size: 'iphone-6', width: 375, height: 667 }, // Small screen
    { size: 'ipad-2', width: 768, height: 1024 }, // Tablet
    { size: 'desktop', width: 1280, height: 800 }, // Large screen
  ];

  viewports.forEach(({ size, width, height }) => {
    it(`Should test visibility on ${size} (${width}x${height})`, () => {
      cy.viewport(width, height); // Set the viewport size
      mount(<HamburgerMenu />);

      if (width <= 768) {
        // Expect visible on small screens
        cy.get('[data-testid="hamburger-menu"]').should('be.visible');
      } else {
        // Expect hidden on larger screens
        cy.get('[data-testid="hamburger-menu"]').should('not.be.visible');
      }
    });
  });
});
