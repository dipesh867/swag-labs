import { test,expect } from "../Fixtures/CustomFixture";

test.describe("Cart Section",{tag:"@cart"},()=>{
    test("add item in Cart",async({page})=>{
        await page.goto("https://www.saucedemo.com/")
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill("secret_sauce");
        await page.locator('[data-test="login-button"]').click();
        const cart=await page.locator('[data-test="shopping-cart-link"]');
        await page.locator("#add-to-cart-sauce-labs-backpack").click()
        let cart_count=await page.locator('[data-test="shopping-cart-link"]').innerText();
        console.log(cart_count);
        await cart.click();
        await expect(page).toHaveURL(/cart.html/)
        const cart_page_count=await page.locator("//div[@class='cart_item']").count();
        console.log(cart_page_count)
    })
})