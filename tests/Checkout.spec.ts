import { test,expect } from "../Fixtures/CustomFixture";

test.describe("Checkout test",{tag:['@checkout']},()=>{
    test("Verify checkout with valid credentials",{tag:"@positive"},async({checkOutPage,page})=>{
        await checkOutPage.fillInformation("Sunny","Baker","1234zip");
        await checkOutPage.continueCheckOut();
        await expect(page).toHaveURL(/checkout-step-two.html/);
    });
    test.describe("Verify checkout functionality with missing credentials",{tag:["@negative","@regression"]},()=>{
        test("Verify checkout with missing firstname",async({page,checkOutPage})=>{
            await checkOutPage.fillInformation("","baker","samplepostal");
            await checkOutPage.continueCheckOut();
            await expect(checkOutPage.errorMessage).toBeVisible();
            await expect(checkOutPage.errorMessage).toContainText("First Name is required");
        })
        test("Verify checkout with missing lastname",async({page,checkOutPage})=>{
            await checkOutPage.fillInformation("sunnny","","samplepostal");
            await checkOutPage.continueCheckOut();
            await expect(checkOutPage.errorMessage).toBeVisible();
            await expect(checkOutPage.errorMessage).toContainText("Last Name is required");
        })
        test("Verify checkout with missing postalcode",async({page,checkOutPage})=>{
            await checkOutPage.fillInformation("sunnny","beaker","");
            await checkOutPage.continueCheckOut();
            await expect(checkOutPage.errorMessage).toBeVisible();
            await expect(checkOutPage.errorMessage).toContainText("Postal Code is required");
        })
    })

    test("Verify cancel checkout functionality",{tag:"@navigation"},async({checkOutPage,page})=>{
        await checkOutPage.cancelCheckOut();
        await expect(page).toHaveURL(/cart.html/);
    });

})