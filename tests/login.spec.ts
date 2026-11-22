import {test,expect, chromium, type Browser, type Page} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Verify successful login',async()=>{

    // //open application
    // await page.goto('https://www.saucedemo.com/');

    // //enter usename & password
    // await page.getByPlaceholder('Username').fill('standard_user');
    // await page.getByPlaceholder('Password').fill('secret_sauce');

    // //click login
    // await page.getByRole('button',{name:'Login'}).click();

//create Login page object
const browser:Browser=await chromium.launch({headless :false,channel:'chrome'});
    const page:Page=await browser.newPage();
const loginPage=new LoginPage(page);

//Navigate to application
await loginPage.navigate();

//login using reusable method

await loginPage.login(
    'standard_user',
    'secret_sauce'
);


    //verify URl
await expect(page).toHaveURL(
  'https://www.saucedemo.com/inventory.html'
);

    //verify products heading

    await expect(page.locator('.title')).toHaveText('Products');

await page.waitForTimeout(5000);

});
test('Verify invalid login using POM', async () => {
    const browser:Browser=await chromium.launch({headless :false,channel:'chrome'});
    const page:Page=await browser.newPage()
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('invalid_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage)
        .toContainText('Username and password do not match');

        await page.waitForTimeout(5000);
});