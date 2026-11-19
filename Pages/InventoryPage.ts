import { Locator, Page } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async addToCart(slug: string) {
        await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
    }

    async removeFromCart(slug: string) {
        await this.page.locator(`[data-test="remove-${slug}"]`).click();
    }

    async openCart() {
        await this.cartLink.click();
    }
}