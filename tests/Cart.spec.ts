import { test, expect } from "../Fixtures/CustomFixture";

test.describe("Cart", { tag: "@cart" }, () => {

    test("add one item updates badge", { tag: ["@smoke", "@positive"] }, async ({ inventoryPage }) => {
        await inventoryPage.addToCart("sauce-labs-backpack");
        await expect(inventoryPage.cartBadge).toHaveText("1");
    });

    test("added item appears in cart", { tag: ["@smoke", "@positive"] }, async ({ inventoryPage, cartPage, page }) => {
        await inventoryPage.addToCart("sauce-labs-backpack");
        await inventoryPage.openCart();

        await expect(page).toHaveURL(/cart.html/);
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.itemNames).toContainText("Sauce Labs Backpack");
    });

    test("add multiple items", { tag: ["@regression", "@positive"] }, async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addToCart("sauce-labs-backpack");
        await inventoryPage.addToCart("sauce-labs-bike-light");
        await expect(inventoryPage.cartBadge).toHaveText("2");

        await inventoryPage.openCart();
        await expect(cartPage.cartItems).toHaveCount(2);
    });

    test("remove item from inventory page", { tag: ["@regression", "@positive"] }, async ({ inventoryPage }) => {
        await inventoryPage.addToCart("sauce-labs-backpack");
        await inventoryPage.removeFromCart("sauce-labs-backpack");
        await expect(inventoryPage.cartBadge).toBeHidden();
    });

    test("remove item from cart page", { tag: ["@regression", "@positive"] }, async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addToCart("sauce-labs-backpack");
        await inventoryPage.openCart();
        await cartPage.removeItem("sauce-labs-backpack");
        await expect(cartPage.cartItems).toHaveCount(0);
    });

    test("empty cart has no badge", { tag: ["@regression"] }, async ({ inventoryPage }) => {
        await expect(inventoryPage.cartBadge).toBeHidden();
    });

    test("verify continue shopping functionality",{tag:["@regression","@navigation"]},async({inventoryPage,cartPage,page})=>{
        await inventoryPage.openCart();
        await cartPage.continueShopping();
        await expect(page).toHaveURL(/inventory.html/);
    })

    test("verify checkout functionality",{tag:["@regression","@checkout"]},async({inventoryPage,cartPage,page})=>{
        await inventoryPage.openCart();
        await cartPage.checkOut();
        await expect(page).toHaveURL(/checkout-step-one.html/);
    })

});