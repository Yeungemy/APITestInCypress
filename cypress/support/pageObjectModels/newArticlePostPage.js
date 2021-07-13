/// <reference types="cypress" />
import { utils } from "../utils";
import { navigateTo } from "./navbar.page";

export class NewArticlePage{
    introduceArticle(){
        const article = {
            "Tittle": 'chance.string()',
            "Topic": 'chance.sentence()',
            "Text": 'chance.paragraph()',
            "Tags": 'chance.word()'
        }

        navigateTo.clickNavBtnByName('New Article');
        cy.get('[placeholder="Article Title"]').type(article.Tittle);
        cy.get('[placeholder="What\'s this article about?"]').type(article.Tittle);
        cy.get('[placeholder="Write your article (in markdown)"]').type(article.Tittle);
        cy.get('[placeholder="Enter tags"]').type(article.Tittle);
        cy.contains('button', 'Publish Article').click({force: true});

        return article;
    }
}

export const publishNewArticle = new NewArticlePage();