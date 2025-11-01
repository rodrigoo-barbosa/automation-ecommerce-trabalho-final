/// <reference types="cypress" />

describe('Products Page', () => {

      beforeEach(() => {
        cy.visit('https://www.automationexercise.com/');
        cy.get('body').should('be.visible');
        cy.contains('AutomationExercise').should('be.visible');
    });

    it('Deve verificar todos os produtos e seus detalhes', () => {
           
        cy.get('a[href="/products"]').click();          
        cy.url().should('include', '/products');
        cy.contains(/All Products|ALL PRODUCTS/i).should('be.visible');

            //Importa a lista de produtos da folder fixture
            cy.fixture('products-list').then((expectedProducts) => {
            cy.get('div.features_items').within(() => {
                expectedProducts.forEach(name => {
                cy.contains(name, { matchCase: false }).should('be.visible');
                });
            });

    cy.get('a[href="/product_details/1"]').click(); 

    cy.location('pathname').should('eq', '/product_details/1');

        
        cy.contains('Blue Top').should('be.visible');
        cy.contains('Category').should('be.visible');
        cy.contains('Availability').should('be.visible');
        cy.contains('Condition').should('be.visible');
        cy.contains('Brand').should('be.visible');
        cy.contains('Quantity').should('be.visible');
        }) 
    })
    
    it('Deve realizar a busca de um produto', () => {
           
        cy.get('a[href="/products"]').click();          
        cy.url().should('include', '/products');
        cy.contains(/All Products|ALL PRODUCTS/i).should('be.visible');   

        cy.fixture('products-list').then((products) => {            
            const product = products[Math.floor(Math.random() * products.length)];
            cy.get('#search_product').clear().type(product);
            cy.get('#submit_search').click();

            cy.contains(product, { matchCase: false }).should('be.visible');
        });
            
    });
})
