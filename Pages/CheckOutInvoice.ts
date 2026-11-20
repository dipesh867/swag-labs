import { Page, Locator } from '@playwright/test';

export class CheckOutInvoice{
    readonly page:Page;
    readonly itemPrice:Locator;
    readonly itemTotalPrice:Locator;
    readonly tax:Locator;
    readonly total:Locator;
    readonly cancel:Locator;
    readonly finish:Locator;

    constructor(page:Page){
        this.page=page
        this.itemPrice=page.locator("//div[@data-test='inventory-item-price']");
        this.itemTotalPrice=page.locator("//div[@data-test='subtotal-label']");
        this.tax=page.locator("//div[@data-test='tax-label']");
        this.total=page.locator("//div[@data-test='total-label']");
        this.cancel=page.getByRole('button',{name:"Cancel"});
        this.finish=page.getByRole('button',{name:"Finish"});
    }

    async clickCancel(){
        await this.cancel.click();
    }

    async clickFinish(){
        await this.finish.click();
    }
}