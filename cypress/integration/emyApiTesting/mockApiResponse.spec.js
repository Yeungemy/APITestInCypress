/// <reference types="cypress" />
describe('Mock API Response', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/tags', {fixture: 'tags.json'});
        cy.loginToApplication();
    });

    it('Should give tags with routing object', () => {
        cy.get('.tag-list')
        .should('contain', 'test')
        .should('contain', 'butt')
        .should('contain', 'dragons')
    });

    it('Should feed mock work', () => {
        cy.intercept('GET', '**/articles/feed*', {articles: [], articlesCount: 0});
        cy.intercept('GET', '**/articles*', {fixture: 'articles.json'});

        cy.contains('Global Feed').click();
        cy.get('app-favorite-button button').then(favorateCounts => {
            cy.wrap(favorateCounts).eq(0).should('contain', '1');
            cy.wrap(favorateCounts).eq(1).should('contain', '5');
        });

        cy.fixture('articles').then(file => {
            // const articleLink = file.articles[1].slug;
            // cy.intercept('POST', '**/articles/' + articleLink + '/favorite', file);
            cy.intercept('POST', '**/articles/**/favorite', file);
        });

        cy.get('app-favorite-button button').eq(1).click().should('contain', 6);
    });
});