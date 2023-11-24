///<reference types="cypress" />

import meUser from '/cypress/fixtures/meUser.json'
import { getRandomNumber } from '../support/utils';


function loginMe() {

    cy.get('.navbar').should('be.visible').as('appHeader');

    cy.get('@appHeader').find('a[href$="/login"]').click();
    cy.url().should('include', '/#/login');
    
    cy.get('.auth-page').should('be.visible').as('loginPage');
    cy.get('@loginPage').find('h1').should('have.text', 'Sign in');
    cy.get('@loginPage').find('form').should('be.visible').as('loginForm');

    cy.get('@loginForm').find('input[ng-model$=email]').type(meUser.email);
    cy.get('@loginForm').find('[ng-model$=password]').type(meUser.password);
    cy.get('@loginForm').find('button[type=submit]').click();

    cy.get('.navbar').should('contain.text', meUser.username);
};

describe('Sign up', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.navbar').should('be.visible').as('appHeader');
    });

    it('should do register user', () => {

        cy.get('@appHeader').find('a[href$="/register"]').click();
        cy.url().should('include', '/#/register');

        cy.get('.auth-page').as('registerPage');
        cy.get('@registerPage').find('h1').should('have.text', 'Sign up');
        cy.get('@registerPage').find('form').should('be.visible').as('registerForm');

        const rnd = getRandomNumber(1000, 9999);
        const username = 'max_' + rnd;
        const email = username + '@maxmail.ru';

        cy.get('@registerForm').find('input[ng-model$=username]').type(username);
        cy.get('@registerForm').find('input[ng-model$=email]').type(email);
        cy.get('@registerForm').find('input[ng-model$=password]').type(meUser.password);
        cy.get('@registerForm').find('button[type=submit]').click();

        cy.get('.navbar').should('contain.text', username);
    });

    it('should do login user', () => {

        loginMe();

    });

    it('should do logout user', () => {

        loginMe();

        cy.get('@appHeader').find('a[href$="/settings"]').click();
        cy.url().should('include', '#/settings');

        cy.get('.settings-page').as('settingsPage');

        cy.get('@settingsPage').find('h1').should('have.text', 'Your Settings');
        cy.get('@settingsPage').find('button[ng-click*=logout]').click();

        cy.get('@appHeader').should('not.contain.text', meUser.username);

    });

});