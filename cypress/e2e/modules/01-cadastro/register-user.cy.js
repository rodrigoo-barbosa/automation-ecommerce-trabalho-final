/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe('Página de Registro de Usuário', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/');
        cy.get('body').should('be.visible');
        cy.contains('AutomationExercise').should('be.visible');
    });

    it('Deve navegar para home page e registrar um usuário', () => {
        const timestamp= new Date().getTime();  //timestamp, vai gerar um numero unico a cada execução do teste para evitar que o email ja tenha sido cadastrado

        cy.get('a[href="/login"]').click();
        cy.contains('New User Signup!').should('be.visible');
        cy.get('input[data-qa="signup-name"]').type(faker.person.fullName());
        cy.get('input[data-qa="signup-email"]').type(`test${timestamp}@email.com`);
        cy.get('[data-qa="signup-button"]').click();    
        cy.contains('Enter Account Information').should('be.visible');  
        
        cy.get('input[type=radio]').check('Mr')
        cy.get('input[data-qa="name"]').type(faker.person.fullName());
        cy.get('input[data-qa="password"]').type(faker.internet.password());
        cy.get('select[data-qa="days"]').select(faker.number.int({ min: 1, max: 28 }).toString());  
        cy.get('select[data-qa="months"]').select(faker.date.month());  
        cy.get('select[data-qa="years"]').select(faker.date.birthdate({ min: 18, max: 80, mode: 'age' }).getFullYear().toString()); 
        

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
    })

    it('Deve não permitir registrar usuário com e-mail existente', () => {
        const timestamp = new Date().getTime();
        const email = `test${timestamp}@email.com`;

   
    cy.get('a[href="/login"]').click();
        cy.contains('New User Signup!').should('be.visible');
        cy.get('input[data-qa="signup-name"]').type(faker.person.fullName());
        cy.get('input[data-qa="signup-email"]').type(email);
        cy.get('[data-qa="signup-button"]').click();

        cy.contains('Enter Account Information').should('be.visible');
        cy.get('input[type=radio]').check('Mr');
        cy.get('input[data-qa="name"]').type(faker.person.fullName());
        cy.get('input[data-qa="password"]').type(faker.internet.password());
        cy.get('select[data-qa="days"]').select('1');
        cy.get('select[data-qa="months"]').select('January');
        cy.get('select[data-qa="years"]').select('1990');
        cy.get('input[data-qa="first_name"]').type(faker.person.firstName());
        cy.get('input[data-qa="last_name"]').type(faker.person.lastName());
        cy.get('input[data-qa="address"]').type(faker.location.streetAddress());
        cy.get('select[data-qa="country"]').select('United States');
        cy.get('input[data-qa="state"]').type(faker.location.state());
        cy.get('input[data-qa="city"]').type(faker.location.city());
        cy.get('input[data-qa="zipcode"]').type(faker.location.zipCode());
        cy.get('input[data-qa="mobile_number"]').type(faker.phone.number());
        cy.get('button[data-qa="create-account"]').click();
        cy.contains('Account Created!').should('be.visible');

        cy.contains('Continue').click();
        cy.contains('Logout').click();

        cy.get('a[href="/login"]').click();
        cy.contains('New User Signup!').should('be.visible');
        cy.get('input[data-qa="signup-name"]').type(faker.person.fullName());
        cy.get('input[data-qa="signup-email"]').type(email);
        cy.get('[data-qa="signup-button"]').click();
        cy.contains('Email Address already exist!').should('be.visible');
    })
})