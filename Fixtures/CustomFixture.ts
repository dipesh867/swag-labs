import {test as base, expect} from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { InventoryPage } from "../Pages/InventoryPage";
import { CartPage } from "../Pages/CartPage";
import { CheckOut } from '../Pages/CheckOut';
import { CheckOutInvoice } from '../Pages/CheckOutInvoice';
import { CompleteCheckOut } from '../Pages/CompleteCheckOut';

type MyFixtures={
    loginPage:LoginPage
    loggedInPage:void
    inventoryPage:InventoryPage
    cartPage:CartPage
    checkOutPage:CheckOut
    checkOutInvoicePage:CheckOutInvoice
    completeCheckOut:CompleteCheckOut
}

export const test=base.extend<MyFixtures>({
    loginPage: async({page},use)=>{
        await use(new LoginPage(page))
    },
    loggedInPage:async({loginPage},use)=>{
        await loginPage.openApplication();
        await loginPage.login("standard_user","secret_sauce")
        await use();
    },
    inventoryPage:async({page,loggedInPage},use)=>{
        await use(new InventoryPage(page));
    },
    cartPage: async  ({page,loggedInPage},use)=>{
        await use(new CartPage(page));
    },
    checkOutPage:async({page,inventoryPage,cartPage},use)=>{
        await inventoryPage.openCart();
        await cartPage.checkOut();
        await expect(page).toHaveURL(/checkout-step-one/);
        await use(new CheckOut(page));
    },
    checkOutInvoicePage: async({page,inventoryPage,cartPage},use)=>{
        await inventoryPage.addToCart("sauce-labs-bolt-t-shirt");
        await inventoryPage.addToCart("sauce-labs-fleece-jacket");
        await inventoryPage.openCart();
        await cartPage.checkOut();

        const checkOut=new CheckOut(page);
        await checkOut.fillInformation("jhon","doe","12345");
        await checkOut.continueCheckOut();
        await expect(page).toHaveURL(/checkout-step-two.html/);
        await use(new CheckOutInvoice(page));
    },
    completeCheckOut:async({page,checkOutInvoicePage},use)=>{
        await use(new CompleteCheckOut(page));
    }
})
export {expect};
