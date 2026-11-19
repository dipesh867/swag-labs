import { test,expect } from "../Fixtures/CustomFixture";

test.describe("Login",{tag:"@Login"},()=>{
    test("Valid user login",{tag:["@smoke","@positive"]},async({loginPage,page})=>{
        await loginPage.openApplication();
        await loginPage.login("standard_user","secret_sauce");
        await expect(page).toHaveURL(/inventory.html/);
    });

    test("Login with wrong login credentials",{tag:["@regression","@negative"]},async({loginPage,page})=>{
        await loginPage.openApplication();
        await loginPage.login("sample_user","sample_password");
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText("Username and password do not match");
        await expect(page).toHaveURL(/www.saucedemo.com/);
    });

    test.describe("test using missing credentials",{tag:["@negative","@regression"]},()=>{
        test("Login with missing username",async({loginPage,page})=>{
            await loginPage.openApplication();
            await loginPage.login("","secret_sauce");
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toContainText("Username is required");
            await expect(page).toHaveURL(/www.saucedemo.com/);
        });
        test("Login with missing password",async({loginPage,page})=>{
            await loginPage.openApplication();
            await loginPage.login("sample_user","");
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toContainText("Password is required");
            await expect(page).toHaveURL(/www.saucedemo.com/);
        })
    })
})