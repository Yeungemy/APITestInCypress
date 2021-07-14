import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export class GlobalFeedPage{
    navigateToGlobalFeedPage(){
        cy.get('.nav-pills .nav-link').contains('Global Feed').click();
    }

    navigateToArticlePage(articleName){
        cy.contains('.preview-link', articleName).click();
    }

    clickingArticleDeleteBtn(){
        cy.contains('.btn-outline-danger', 'Delete Article').click();
    }

    deleteArticleByName(articleName){
        cy.visit('/articles/feed?limit=10&offset=0');
        this.navigateToGlobalFeedPage();
        this.navigateToArticlePage(articleName);
        this.clickingArticleDeleteBtn();
    }
}
export const globalFeedPage = new GlobalFeedPage();