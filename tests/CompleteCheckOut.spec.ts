import { expect, test } from "../Fixtures/CustomFixture";

test.describe("Complete Checkout",{tag:"@checkout"},()=>{
    test("Back Home functionality",async({page,completeCheckOut})=>{
        await completeCheckOut.backHome.click();
        await expect(page).toHaveURL(/inventory.html/);
    })
})