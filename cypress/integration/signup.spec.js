///<reference types="cypress" />
import meUser from '/cypress/fixtures/meUser.json'
import { getRandomNumber } from '../support/utils';

describe('Sign up', () => {

    function loginMe() {
        cy.get('.navbar a[href$="/login"]').click();
        cy.url().should('include', '/#/login');

        cy.get('.auth-page h1').should('have.text', 'Sign in');
        cy.get('.auth-page form').should('be.visible');

        cy.get('.auth-page form input[ng-model$=email]').type(meUser.email);
        cy.get('.auth-page form input[ng-model$=password]').type(meUser.password);
        cy.get('.auth-page form button[type=submit]').click();

        cy.get('.navbar').should('contain.text', meUser.username);
    };

    beforeEach(() => {
        cy.visit('/');
    });

    it('should do register user', () => {

        cy.get('.navbar a[href$="/register"]').click();
        cy.url().should('include', '/#/register');

        const username = 'max_' + getRandomNumber(1000, 9999);
        const email = username + '@maxmail.ru';

        cy.get('.auth-page h1').should('have.text', 'Sign up');
        cy.get('.auth-page form').should('be.visible');
        cy.get('.auth-page form input[ng-model$=username]').type(username);
        cy.get('.auth-page form input[ng-model$=email]').type(email);
        cy.get('.auth-page form input[ng-model$=password]').type(meUser.password);
        cy.get('.auth-page form button[type=submit]').click();

        cy.get('.navbar').should('contain.text', username);
    });

    it('should do login user', () => {
        loginMe();
    });

    it('should do logout user', () => {
        loginMe();
        // for logout
        cy.get('.navbar a[href$="/settings"]').click();
        cy.get('.settings-page h1').should('have.text', 'Your Settings');
        cy.get('.settings-page button[ng-click*=logout]').click();

        cy.get('.navbar').should('not.contain.text', meUser.username);
    });

});