/// <reference types="cypress" />
import { publishNewArticle } from '../../support/pageObjectModels/newArticlePostPage'

describe('Publish an article', () => {
    let assertedArticle;

    before(() => {
        cy.loginToApplication();
    });

    it('Should publish an article successfully', () => {
        cy.server();
        cy.route('POST', '**/articles').as('postArticles');

        assertedArticle = publishNewArticle.introduceArticle();
        cy.wait('@postArticles');

        cy.get('@postArticles').then(xhr => {
            console.log(xhr);
            expect(xhr.status).to.equal(200);
            expect(xhr.request.body.article.body).to.equal(assertedArticle.body);
            expect(xhr.response.body.article.description).to.equal(assertedArticle.description);
        });
    });
});