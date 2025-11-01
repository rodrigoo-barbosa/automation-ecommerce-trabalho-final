/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/');
        cy.get('body').should('be.visible');
        cy.contains('AutomationExercise').should('be.visible');
    });

   
    function registerNewUser() {
        const timestamp = new Date().getTime();
        const mail = `test${timestamp}@email.com`;
        const password = faker.internet.password();
        const fullName = faker.person.fullName();

        
        cy.get('a[href="/login"]').click();
        cy.contains('New User Signup!').should('be.visible');
        cy.get('input[data-qa="signup-name"]').type(fullName);
        cy.get('input[data-qa="signup-email"]').type(mail);
        cy.get('[data-qa="signup-button"]').click();
        cy.contains('Enter Account Information').should('be.visible');

       
        cy.get('input[type="radio"]').first().check();
        cy.get('input[data-qa="name"]').type(fullName);
        cy.get('input[data-qa="password"]').type(password);
        cy.get('select[data-qa="days"]').select(faker.number.int({ min: 1, max: 28 }).toString());
        cy.get('select[data-qa="months"]').select(faker.date.month());
        cy.get('select[data-qa="years"]').select(
            faker.date.birthdate({ min: 18, max: 80, mode: 'age' }).getFullYear().toString()
        );

        cy.get('input[id="newsletter"]').check();
        cy.get('input[id="optin"]').check();
        
        cy.get('input[data-qa="first_name"]').type(faker.person.firstName());
        cy.get('input[data-qa="last_name"]').type(faker.person.lastName());
        cy.get('input[data-qa="company"]').type(faker.company.name());
        cy.get('input[data-qa="address"]').type(faker.location.streetAddress());
        cy.get('input[data-qa="address2"]').type(faker.location.secondaryAddress());
        cy.get('select[data-qa="country"]').select('Canada');
        cy.get('input[data-qa="state"]').type(faker.location.state());
        cy.get('input[data-qa="city"]').type(faker.location.city());
        cy.get('input[data-qa="zipcode"]').type(faker.location.zipCode());
        cy.get('input[data-qa="mobile_number"]').type(faker.phone.number());
        
        cy.get('button[data-qa="create-account"]').click();
        cy.contains('Account Created!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();        
        return { mail, password, fullName };
    }

    it('Deve realizar logout do usuário e retornar para página inicial', () => {
        const user = registerNewUser();
        cy.get('a[href="/logout"]').should('be.visible').click();
        cy.contains('Login to your account').should('be.visible');
    });
});