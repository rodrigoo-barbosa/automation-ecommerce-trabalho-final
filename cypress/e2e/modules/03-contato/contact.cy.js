/// <reference types="cypress" />

describe('Página - Contact Us', () => {

      beforeEach(() => {
        cy.visit('https://www.automationexercise.com/');
        cy.get('body').should('be.visible');
        cy.contains('AutomationExercise').should('be.visible');
    });

    it('Deve submeter o formulário "Contact Us Form" com upload de arquivo', () => {
        cy.get('a[href="/contact_us"]').click();

        cy.get('input[data-qa="name"]').type('Rodrigo Barbosa');
        cy.get('input[data-qa="email"]').type('teste@test.com');
        cy.get('input[data-qa="subject"]').type('Teste');
        cy.get('textarea[data-qa="message"]').type('Teste');

        //Exemplo do professor
        //cy.fixture('example.json').as('arquivo')
        //cy.get('input[type=file]').selectFile('@arquivo);

        //Upload de arquivo
        cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/file-upload.json');
        cy.get('input[data-qa="submit-button"]').click();
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
        cy.contains('.btn.btn-success', 'Home').click();
        cy.on('window:confirm', () => true);
        cy.url().should('eq', 'https://www.automationexercise.com/');
        
    })

    it('Deve verificar a inscrição na página inicial', () => {

        const timestamp = new Date().getTime();
        const email = `test${timestamp}@email.com`;

        cy.get('input[id="susbscribe_email"]').type(email);
        cy.get('#subscribe').click();
        cy.contains('You have been successfully subscribed!').should('be.visible');

    })
    
})