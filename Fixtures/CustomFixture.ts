import {test as base, expect} from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { InventoryPage } from "../Pages/InventoryPage";
import { CartPage } from "../Pages/CartPage";

type MyFixtures={
    loginPage:LoginPage
    loggedInPage:void
    inventoryPage:InventoryPage
    cartPage:CartPage
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
    }
})

export {expect};
