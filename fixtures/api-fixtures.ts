
// import { test as base, expect } from '@playwright/test';

// type APIFixtures = {
//     authToken: string;
// };

// export const test = base.extend<APIFixtures>({
//     authToken: async ({ request }, use) => {

//         // Step 1: Login API
//         const loginResponse = await request.post(
//             'https://dummyjson.com/auth/login',
//             {
//                 data: {
//                     username: 'emilys',
//                     password: 'emilyspass'
//                 }
//             }
//         );

//         // Step 2: Verify login
//         expect(loginResponse.status()).toBe(200);

//         // Step 3: Extract token
//         const loginData = await loginResponse.json();
//         const token = loginData.accessToken;

//         // Step 4: Verify token exists
//         expect(token).toBeTruthy();

//         // Step 5: Provide token to test
//         await use(token);
//     }
// });

// export { expect };

//hardcoded

// import { test as base, expect } from '@playwright/test';

// type WorkerFixtures = {
//     authToken: string;
// };

// export const test = base.extend<{}, WorkerFixtures>({
//     authToken: [async ({ playwright }, use) => {

//         // Step 1: Create API context
//         const apiContext = await playwright.request.newContext();

//         // Step 2: Login API
//         const loginResponse = await apiContext.post(
//             'https://dummyjson.com/auth/login',
//             {
//                 data: {
//                     username: 'emilys',
//                     password: 'emilyspass'
//                 }
//             }
//         );

//         expect(loginResponse.status()).toBe(200);

//         // Step 3: Extract token
//         const loginData = await loginResponse.json();
//         const token = loginData.accessToken;

//         expect(token).toBeTruthy();

//         // Step 4: Share token with worker tests
//         await use(token);

//         // Step 5: Clean up API context
//         await apiContext.dispose();

//     }, { scope: 'worker' }]
// });

// export { expect };

//replaced with environment variables


import { test as base, expect } from '@playwright/test';

type WorkerFixtures = {
    authToken: string;
};

export const test = base.extend<{}, WorkerFixtures>({
    authToken: [async ({ playwright }, use) => {

        // Read environment variables
        const env = (globalThis as typeof globalThis & {
            process?: { env?: Record<string, string | undefined> };
        }).process?.env;
        const apiUrl = env?.API_URL;
        const username = env?.API_USERNAME;
        const password = env?.API_PASSWORD;

        // Validate environment variables
        if (!apiUrl || !username || !password) {
            throw new Error('Missing API environment variables');
        }

        // Create API context
        const apiContext = await playwright.request.newContext();

        try {
            // Login API
            const loginResponse = await apiContext.post(
                `${apiUrl}/auth/login`,
                {
                    data: {
                        username,
                        password
                    }
                }
            );

            expect(loginResponse.status()).toBe(200);

            // Extract access token
            const loginData = await loginResponse.json();
            const token = loginData.accessToken;

            expect(token).toBeTruthy();

            // Share token with worker tests
            await use(token);

        } finally {
            // Clean up API context
            await apiContext.dispose();
        }

    }, { scope: 'worker' }]
});

export { expect };
