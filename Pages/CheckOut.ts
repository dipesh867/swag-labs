import { Locator,Page } from "@playwright/test";

export class CheckOut{
    readonly page:Page;
    readonly firstName:Locator;
    readonly lastName:Locator;
    readonly zipCode:Locator;
    readonly continue:Locator;
    readonly cancel:Locator;
    readonly errorMessage:Locator;

    constructor(page:Page){
        this.page=page
        this.firstName=page.locator("#first-name");
        this.lastName=page.locator("#last-name");
        this.zipCode=page.locator("#postal-code");
        this.continue=page.locator("//input[@name='continue']");
        this.cancel=page.locator("//button[@name='cancel']");
        this.errorMessage=page.locator("[data-test='error']")
    }

    async fillInformation(firstName:string,lastName:string,zipCode:string){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);

    }
    async continueCheckOut(){
        await this.continue.click();
    }
    
    async cancelCheckOut(){
        await this.cancel.click();
    }

}