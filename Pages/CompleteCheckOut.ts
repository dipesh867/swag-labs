import { Page, Locator } from '@playwright/test';

export class CompleteCheckOut{
    readonly page:Page
    readonly backHome:Locator

    constructor(page:Page){
        this.page=page
        this.backHome=page.getByRole('button',{name:"Back Home"})
    }
}