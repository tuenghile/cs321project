/* eslint-disable no-undef */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PageFooter from './PageFooter';

describe('<PageFooter /> Responsive Design', () => {
  const viewports = [
    { size: 'mobile', width: 375, height: 667 }, // Mobile
    { size: 'tablet', width: 768, height: 1024 }, // Tablet
    { size: 'desktop-small', width: 1024, height: 768 }, // Small Desktop
    { size: 'desktop-large', width: 1440, height: 900 }, // Large Desktop
  ];

  viewports.forEach(({ size, width, height }) => {
    it(`Should render correctly on ${size} (${width}x${height})`, () => {
      cy.viewport(width, height);
      
      cy.mount(
        <MemoryRouter>
          <PageFooter />
        </MemoryRouter>
      );

      // Check the footer container exists
      cy.get('[data-testid="footer"]').should('exist');

      if (width <= 599) { // Mobile
        cy.get('[data-testid="content-container"]').should('have.css', 'flex-direction', 'column');
        cy.get('[data-testid="right-footer"]').should('have.css', 'text-align', 'center');
        cy.get('[data-testid="horizontal-line"]').should('be.visible').and('have.css', 'width', '300px');
        cy.get('[data-testid="hide-line"]').should('be.visible');
      } else if (width >= 600 && width <= 810) {// Tablet
        cy.get('[data-testid="content-container"]').should('have.css', 'flex-direction', 'column');
        cy.get('[data-testid="content-container"]').should('have.css', 'align-items', 'center');
        cy.get('[data-testid="content-container"]').should('have.css', 'justify-content', 'center'); // Adjust as per your CSS
        cy.get('[data-testid="horizontal-line"]').should('be.visible').and('have.css', 'width', '600px');
        cy.get('[data-testid="hide-line"]').should('be.visible');
      } else if (width >= 811 && width <= 1700) { // Small desktop-
        cy.get('[data-testid="content-container"]').should('have.css', 'flex-direction', 'row');
        cy.get('[data-testid="horizontal-line"]').should('be.visible').and('have.css', 'width', width > 1000 ? '1000px' : '800px');
        cy.get('[data-testid="hide-line"]').should('not.be.visible'); // Correct expectation for hide line
      } else { // Large desktop
        cy.get('[data-testid="content-container"]').should('have.css', 'flex-direction', 'row');
        cy.get('[data-testid="horizontal-line"]').should('be.visible').and('have.css', 'width', '1000px');
        cy.get('[data-testid="hide-line"]').should('not.be.visible');
      }
    });
  });
});
