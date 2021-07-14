/// <reference types="cypress" />
import { publishNewArticle } from '../../support/pageObjectModels/newArticlePostPage'

describe('Publish an article', () => {
    let assertedArticle;

    beforeEach(() => {
        cy.intercept('GET', '**/tags', {fixture: 'tags.json'});
        cy.loginToApplication();
    });

    it('test user interact with the browser', () => {
        cy.intercept('POST', '**/articles').as('postArticles');

        assertedArticle = publishNewArticle.introduceArticle();
        cy.wait('@postArticles');

        cy.get('@postArticles').then(xhr => {
            console.log(xhr);
            expect(xhr.response.statusCode).to.equal(200);
            expect(xhr.request.body.article.body).to.equal(assertedArticle.body);
            expect(xhr.response.body.article.description).to.equal(assertedArticle.description);
        });
    });

    it('test user interact with the browser', () => {
        const newDes = 'This is a new description',
            newBody = 'This is a new article body';

        //interact with server
        cy.intercept('POST', '**/articles', (req) => {
            req.body.article.description = newDes;
            
            req.reply(res => {
                expect(res.body.article.body).to.equal(assertedArticle.body);
                res.body.article.body = newBody
                expect(res.body.article.body).to.equal(newBody);
            });
        })
        .as('postArticles');

        assertedArticle = publishNewArticle.introduceArticle();
        cy.wait('@postArticles');

        cy.get('@postArticles').then(xhr => {
            console.log(xhr);
            expect(xhr.response.statusCode).to.equal(200);
            expect(xhr.request.body.article.body).to.equal(assertedArticle.body);
            expect(xhr.response.body.article.description).not.to.equal(assertedArticle.description);
            expect(xhr.response.body.article.description).to.equal(newDes);
        });
    });
});