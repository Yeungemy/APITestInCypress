/// <reference types="cypress" />
import { utils } from "../utils";
import { navigateTo } from "./navbar.page";

export class NewArticlePage{
    introduceArticle(){
        const article = {
            "tittle": 'chance.string()',
            "description": 'chance.sentence()',
            "body": 'chance.paragraph()',
            "tags": 'chance.word()'
        }

        navigateTo.clickNavBtnByName('New Article');
        cy.get('[placeholder="Article Title"]').type(article.tittle);
        cy.get('[placeholder="What\'s this article about?"]').type(article.description);
        cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
        cy.get('[placeholder="Enter tags"]').type(article.tags);
        cy.contains('button', 'Publish Article').click({force: true});

        return article;
    }
}

export const publishNewArticle = new NewArticlePage();