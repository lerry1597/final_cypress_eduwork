/// <reference types="cypress" />

describe('akulaku', () => {
    beforeEach(() => {
        cy.visit('https://demo.midtrans.com/');
    });

    it('should be able make purchase using akulaku', () => {
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
        
            // Scroll to "Akulaku Paylater"
            cy.wrap(iframeDocument)
            .contains('Akulaku PayLater')
            .scrollIntoView()
            .click();
        
            // Assert elements within the iframe after clicking the Bank transfer button
            cy.wrap(iframeDocument)
            .contains('How to pay')
            .click();

            cy.wrap(iframeDocument)
            .contains('Pay now')
            .should('be.visible');
        });

        // Assuming the new URL is obtained from the redirected page
        const newUrl = 'https://simulator.sandbox.midtrans.com/akulaku/ui/login?appId=82728746&refNo=d110b0a9-3ff8-4ca9-bb3a-d970d29b5152&sign=1iJSeMb5ErTeN0Gu_v4ChR-8Iql5oSpG_disLhKSklmAAeY4QQ6RPUwn6Knk0egQQogcjZgF8bjjCgt_jzKEEw&lang=id';
        // Visit the new URL
        cy.visit(newUrl);

        cy.contains('Akulaku', { timeout: 5000 }).should('exist');

        cy.get('#phoneNumber').type('08133333333');
        cy.contains('Next').click();

        cy.contains('Transaction Details', { timeout: 5000 }).should('exist');

        cy.get('.btn').click();

        cy.contains('Transaction is Successful').should('exist');

    })
});