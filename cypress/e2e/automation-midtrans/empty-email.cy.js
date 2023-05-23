/// <reference types="cypress" />

describe('Empty Data', () => {
    beforeEach(() => {
        cy.visit('https://demo.midtrans.com/'); 
    });

    it('Empty Email', () => {
        //Click buy button
        cy.contains('BUY NOW').click();

        cy.contains('Shopping Cart').should('be.visible');

        cy.get('input[data-reactid=".0.0.1.0.3.0.0.1.1.0"]').clear();

        //Click button Checkout
        cy.contains('CHECKOUT').click();

        cy.contains('Sorry, something went wrong.').should('be.visible');
        cy.contains('Please retry your purchase.').should('be.visible');
    });
});