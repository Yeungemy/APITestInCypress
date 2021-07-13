/// <reference types="cypress" />

export class NavbarPage{
    clickNavBtnByName(navItem){
        cy.get('[ng-reflect-router-link="/editor"]').click({force: true});
    }
}

export const navigateTo = new NavbarPage();