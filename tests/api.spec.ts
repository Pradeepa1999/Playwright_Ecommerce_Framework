import { test, expect } from '../fixtures/api-fixtures';

test('Verify API GET request', async ({ request }) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(1);
    expect(responseBody.userId).toBe(1);
});

test('Verify API POST request', async ({ request }) => {

    // 1. Prepare request body
    const requestBody = {
        title: 'Playwright API Testing',
        body: 'Learning POST request using Playwright',
        userId: 1
    };

    // 2. Send POST request
    const response = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
            data: requestBody
        }
    );

    // 3. Verify status code
    expect(response.status()).toBe(201);

    // 4. Read response
    const responseBody = await response.json();

    // 5. Verify response data
    expect(responseBody.title).toBe(requestBody.title);
    expect(responseBody.body).toBe(requestBody.body);
    expect(responseBody.userId).toBe(requestBody.userId);

    console.log('POST API Response:', responseBody);
});
 test ('Verify API PUT Request', async({request})=>{


    // 1. Prepare updated request body
    const requestBody = {
        id: 1,
        title: 'Updated Playwright Testing',
        body: 'Learning PUT API testing',
        userId: 1
    };

    // 2. Send PUT request
    const response = await request.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data: requestBody
        }
    );

    // 3. Verify status code
    expect(response.status()).toBe(200);

    // 4. Read response body
    const responseBody = await response.json();

    // 5. Verify updated data
    expect(responseBody.id).toBe(1);
    expect(responseBody.title).toBe('Updated Playwright Testing');
    expect(responseBody.body).toBe('Learning PUT API testing');
    expect(responseBody.userId).toBe(1);

    console.log('PUT API Response:', responseBody);
});
 test ('Verify API PATCH Request', async({request})=>{


    // 1. Prepare updated request body
    const requestBody = {
        
        title: 'Updated Title Using Patch',
    
    };

    // 2. Send Patch request
    const response = await request.patch(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data: requestBody
        }
    );

    // 3. Verify status code
    expect(response.status()).toBe(200);

    // 4. Read response body
    const responseBody = await response.json();

    // 5. Verify updated data
    
    expect(responseBody.title).toBe('Updated Title Using Patch');


    console.log('PATCH API Response:', responseBody);
});

test('Verify API DELETE request', async ({ request }) => {

    // 1. Send DELETE request
    const response = await request.delete(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    // 2. Verify status code
    expect(response.status()).toBe(200);

    console.log('DELETE API Status:', response.status());
});


// test('Bearer Token Authentication', async ({ request }) => {

//   // Step 1: Login API
//   const loginResponse = await request.post(
//     'https://dummyjson.com/auth/login',
//     {
//       data: {
//         username: 'emilys',
//         password: 'emilyspass'
//       }
//     }
//   );

//   expect(loginResponse.status()).toBe(200);

//   // Step 2: Get Bearer Token
//   const loginData = await loginResponse.json();
//   const token = loginData.accessToken;

//   console.log('Bearer Token:', token);

//   // Step 3: Use Bearer Token
//   const userResponse = await request.get(
//     'https://dummyjson.com/auth/me',
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   expect(userResponse.status()).toBe(200);

//   const userData = await userResponse.json();

//   console.log('Authenticated User:', userData.username);
// });


test('Bearer Token Authentication using Fixture', async ({ request, authToken }) => {

    // Use the token provided by fixture
    const userResponse = await request.get(
        'https://dummyjson.com/auth/me',
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
    );

    // Verify API response
    expect(userResponse.status()).toBe(200);

    const userData = await userResponse.json();

    expect(userData.username).toBe('emilys');

    console.log('Authenticated User:', userData.username);
});


 