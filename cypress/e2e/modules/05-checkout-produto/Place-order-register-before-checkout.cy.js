import { faker } from "@faker-js/faker";

describe('Page Checkout flow - register before checkout', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/');
        cy.get('body').should('be.visible');
        cy.contains('AutomationExercise').should('be.visible');
    });

    it('Deve realizar checkout de produto e deletar conta do usuário', () => {
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
        cy.get('input[data-qa="name"]').clear().type(fullName);
        cy.get('input[data-qa="password"]').type(password);
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
        
        cy.contains(/Account Created!/i).should('be.visible');        
        cy.contains('Continue').click();        
        cy.contains(new RegExp(`Logged in as ${fullName.split(' ')[0]}`, 'i')).should('be.visible');
        
        cy.get('a[href="/products"]').click();
        cy.url().should('include', '/products');        
        cy.contains('Add to cart').first().click({ force: true });        
        cy.contains(/View Cart|Continue/).contains('View Cart').click({ force: true }).then(() => {            
        });
        
        cy.location('pathname').should('include', '/view_cart');        
        cy.contains(/Shopping Cart|Cart/i).should('be.visible');        
        cy.contains('Proceed To Checkout').click({ force: true });        
        cy.contains(/Address Details|ADDRESS DETAILS/i).should('be.visible');
        cy.contains(/Review Your Order|REVIEW ORDER/i).should('be.visible');

                // tenta obter elementos <textarea> cujo atributo name seja "message"
        cy.get('textarea[name="message"]').then(($t) => {
            if ($t.length) {
                cy.get('textarea[name="message"]').type('Entregar na portaria do Prédio');
            } else {
                cy.get('textarea').first().type('Entregar na portaria do Prédio');
            }
        });

        cy.contains('Place Order').click({ force: true });        
        cy.get('input[name="name_on_card"]').type(fullName);
        cy.get('input[name="card_number"]').type('4242424242424242');
        cy.get('input[name="cvc"]').type('123');
        cy.get('input[name="expiry_month"]').type('12');
        cy.get('input[name="expiry_year"]').type('2028');        
        cy.contains(/Pay and Confirm Order|Pay & Confirm Order|Pay and Confirm/).click({ force: true });        
        cy.contains(/Congratulations! Your order has been confirmed!/i, { timeout: 10000 }).should('be.visible');

        cy.get('a[href="/delete_account"]').click({ force: true });        
        cy.contains(/Account Deleted!|ACCOUNT DELETED!/i).should('be.visible');
        cy.contains('Continue').click({ force: true });
    })
})