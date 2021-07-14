/// <reference types="cypress" />

describe('API Call Verification', () => {
    beforeEach(() => {
        cy.loginToApplication();
    });

    it('API post', () => {
        const newArticle = {
            "article": {
                "tagList": [],
                "title": "It is Wednesday",
                "description": "The weather is very nice",
                "body": "It is really good time for learning Cypress API Testing"
            }
        },

        postArticleUrl = 'https://conduit.productionready.io/api/articles/';

        //login by API call
        cy.get('@token').then(token => {

            //post an artical by api call
            cy.request({
                url: postArticleUrl,
                headers: {'Authorization': 'Token ' + token},
                body: newArticle,
                method: 'POST'
            }).then(response => {
                expect(response.status).to.equal(200);
                expect(response.body.article.title).to.equal(newArticle.article.title);
            });
        });
    });
});