import { expect, test } from "../Fixtures/CustomFixture";

test.describe("Invoice",{tag:"@invoice"},()=>{
    test("Verify cancel functionality",{tag:"@regression"},async({page,checkOutInvoicePage})=>{
        await checkOutInvoicePage.clickCancel();
        await expect(page).toHaveURL(/inventory.html/);
    })

    test("Verify Finish functionality",async({checkOutInvoicePage,page})=>{
        await checkOutInvoicePage.clickFinish();
        await expect(page).toHaveURL(/checkout-complete.html/);
    })

    test("Validate sum of price",async({checkOutInvoicePage})=>{
        
        const prices:string[]= await checkOutInvoicePage.itemPrice.allInnerTexts();
        console.log(prices);
        let total_price_sum:number=0;
        for(const i of prices){
            total_price_sum+=Number(i.split("$")[1])
        }
        console.log(total_price_sum)
        const item_total=await checkOutInvoicePage.itemTotalPrice.innerText();
        const item_total_price:number=Number(item_total.split("$")[1]);
        await expect(total_price_sum).toBeCloseTo(item_total_price);
    })

    test("Validate the tax addition",async({checkOutInvoicePage})=>{
        const item_total=Number((await checkOutInvoicePage.itemTotalPrice.innerText()).split("$")[1])
        const tax=Number((await checkOutInvoicePage.tax.innerText()).split("$")[1])
        const total=Number((await checkOutInvoicePage.total.innerText()).split("$")[1])
        await expect(item_total+tax).toBe(total);
    })
})