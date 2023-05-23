/// <reference types="cypress" />

describe('GoPay', () => {
    beforeEach(() => {
        cy.visit('https://demo.midtrans.com/');
    });

    it('should be able make purchase using gopay', () => {
        //Click on the Buy Now button
        cy.contains('BUY NOW').click();

        cy.contains('Shopping Cart').should('be.visible');

        //Fill in the custommer details
        cy.get('input[data-reactid=".0.0.1.0.3.0.0.0.1.0"]').clear();
        cy.get('input[data-reactid=".0.0.1.0.3.0.0.0.1.0"]').type('Jhon Doe');

        cy.get('input[data-reactid=".0.0.1.0.3.0.0.1.1.0"]').clear();
        cy.get('input[data-reactid=".0.0.1.0.3.0.0.1.1.0"]').type('JhonDoe@gmail.com');

        cy.get('input[data-reactid=".0.0.1.0.3.0.0.2.1.0"]').clear();
        cy.get('input[data-reactid=".0.0.1.0.3.0.0.2.1.0"]').type('081322135152');

        cy.get('input[data-reactid=".0.0.1.0.3.0.0.0.1.0"]').should('have.value', 'Jhon Doe');
        cy.get('input[data-reactid=".0.0.1.0.3.0.0.1.1.0"]').should('have.value', 'JhonDoe@gmail.com');
        cy.get('input[data-reactid=".0.0.1.0.3.0.0.2.1.0"]').should('have.value', '081322135152');

        //Click button Checkout
        cy.contains('CHECKOUT').click();
        cy.get('iframe#snap-midtrans', { timeout: 10000 })
        .should('be.visible')
        .then(($iframe) => {
            const iframeDocument = $iframe.contents().find('body');
        
            cy.wrap(iframeDocument)
              .should('contain', 'DEMO STORE');
        
            // Click button Bank transfer
            cy.wrap(iframeDocument)
              .contains('GoPay')
              .click();
        
            // Assert elements within the iframe after clicking the Bank transfer button
            cy.wrap(iframeDocument)
            .find('img.qr-image')
            .should('be.visible')
            .should(($img) => {
                const src = $img.attr('src');
                expect(src).to.not.be.empty;
            });;
  
        });
    })
});