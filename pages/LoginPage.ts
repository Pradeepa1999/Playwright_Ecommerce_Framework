import {Page,Locator} from '@playwright/test';

export class LoginPage{

    //Declare the Locators

    readonly username:Locator;
    readonly password:Locator;
    readonly loginButton:Locator;
    readonly errorMessage:Locator;

    //constructor

    constructor(private page:Page){
        this.username=page.getByPlaceholder('Username');
        this.password=page.getByPlaceholder('Password');
        this.loginButton=page.getByRole('button',{name:'Login'});
        this.errorMessage=page.locator('[data-test="error"]');

    }

    //navigate to the application

    async navigate():Promise<void>{
        await this.page.goto('/');

    }
    //Reusable Login method

    async login(

        username: string,
        password: string

    ):Promise<void>{
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    


}