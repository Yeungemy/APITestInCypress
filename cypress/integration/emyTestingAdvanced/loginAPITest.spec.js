/// <reference types="cypress" />
import { publishNewArticle } from '../../support/pageObjectModels/newArticlePostPage'

describe('login to application', () => {
    let assertedArticle;

    before(() => {
        cy.loginToApplication();
        assertedArticle = publishNewArticle.introduceArticle();
    });

    it('Should login successfully', () => {

    });
});