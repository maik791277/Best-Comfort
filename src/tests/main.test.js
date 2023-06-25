
test('Signup API Test', async () => {
   const url = 'http://127.0.0.1:5000/signup';
   const data = {
      password: '791277',
      email: 'potuliysinaa@bk.ru',
   };

   const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
   });

   expect(response.status).toBe(200);

   const jsonResponse = await response.json();
   expect(jsonResponse).toEqual(expect.objectContaining({
      data: expect.objectContaining({
         _id: expect.any(Number),
         email: 'potuliysinaa@bk.ru',
      }),
   }));
});

test('Signin API Test', async () => {
   const url = 'http://127.0.0.1:5000/signin';
   const data = {
      password: '123123',
      email: 'huhu@yandex.com',
   };

   const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
   });

   expect(response.status).toBe(200);

   const jsonResponse = await response.json();
   expect(jsonResponse.token).toBeDefined();
   expect(typeof jsonResponse.token).toBe('string');
});


test('Validate Token API Test', async () => {
   const url = 'http://127.0.0.1:5000/validate';
   const headers = {
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiaHVodUB5YW5kZXguY29tIiwibmFtZSI6IiIsInJvbGUiOiJ1c2VyIn0.VyR1JS78MBBUknEeN2D32XrL4uDzLphUqnnTR1iCzoE',
      'Content-Type': 'application/json',
   };

   const response = await fetch(url, {
      method: 'POST',
      headers: headers,
   });

   expect(response.status).toBe(200);

   const jsonResponse = await response.json();
   expect(jsonResponse).toEqual(expect.objectContaining({
      message: 'Token is valid',
      user_id: 1,
   }));
});


test('Delete User API Test', async () => {
   const url = 'http://127.0.0.1:5000/users/62';
   const headers = new Headers();
   headers.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoicG90aWxpQGJrLnJ1IiwibmFtZSI6Ilx1MDQxMlx1MDQzYlx1MDQzMFx1MDQzNCIsInJvbGUiOiJhZG1pbiJ9.xYteENny-LeFe5TLbCwizbhXWlPdp7S22ZqvAgl78Mk");

   const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
      redirect: 'follow'
   });

   expect(response.status).toBe(200);

   const jsonResponse = await response.json();
   console.log(jsonResponse);
});

test('Delete Card API Test', async () => {
   const url = 'http://127.0.0.1:5000/users/1/cards/63';
   const headers = new Headers();
   headers.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoicG90aWxpQGJrLnJ1IiwibmFtZSI6Ilx1MDQxMlx1MDQzYlx1MDQzMFx1MDQzNCIsInJvbGUiOiJhZG1pbiJ9.xYteENny-LeFe5TLbCwizbhXWlPdp7S22ZqvAgl78Mk");

   const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
   });

   expect(response.status).toBe(200);

   const jsonResponse = await response.json();
   console.log(jsonResponse);
});

test('Edit user API Test', async () => {
   const url = 'http://127.0.0.1:5000/users/1';
   const data = {
      avatar: 'https://w.forfun.com/fetch/4a/4af0bcc2b0c34fd573eca9f1be9ab245.jpeg'
   };

   const myHeaders = new Headers();
   myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoicG90aWxpQGJrLnJ1IiwibmFtZSI6Ilx1MDQxMlx1MDQzYlx1MDQzMFx1MDQzNCIsInJvbGUiOiJhZG1pbiJ9.xYteENny-LeFe5TLbCwizbhXWlPdp7S22ZqvAgl78Mk");
   myHeaders.append("Content-Type", "application/json");

   const response = await fetch(url, {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
   });

   expect(response.status).toBe(200);

   const jsonResponse = await response.text();
   expect(jsonResponse).toEqual(expect.any(String));
   console.log(jsonResponse);
});

test('Users API Test', async () => {
   const url = 'http://127.0.0.1:5000/users';
   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoicG90aWxpQGJrLnJ1IiwibmFtZSI6Ilx1MDQxMlx1MDQzYlx1MDQzMFx1MDQzNCIsInJvbGUiOiJhZG1pbiJ9.xYteENny-LeFe5TLbCwizbhXWlPdp7S22ZqvAgl78Mk';

   const response = await fetch(url, {
      method: 'GET',
      headers: {
         'Authorization': token,
      },
   });

   expect(response.status).toBe(200);

   const jsonResponse = await response.json();
   expect(jsonResponse).toEqual(expect.objectContaining([]));
});

test('User API Test', async () => {
   const url = 'http://127.0.0.1:5000/users/1';
   const headers = new Headers();
   headers.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoicG90aWxpQGJrLnJ1IiwibmFtZSI6Ilx1MDQxMlx1MDQzYlx1MDQzMFx1MDQzNCIsInJvbGUiOiJhZG1pbiJ9.xYteENny-LeFe5TLbCwizbhXWlPdp7S22ZqvAgl78Mk");

   const requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
   };

   const response = await fetch(url, requestOptions);

   expect(response.status).toBe(200);

   const jsonResponse = await response.json();
   expect(jsonResponse).toEqual(expect.objectContaining([]));
});

test('Fetch User Cards API Test', async () => {
   const url = 'http://127.0.0.1:5000/users/1/cards';
   const headers = new Headers();
   headers.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoicG90aWxpQGJrLnJ1IiwibmFtZSI6Ilx1MDQxMlx1MDQzYlx1MDQzMFx1MDQzNCIsInJvbGUiOiJhZG1pbiJ9.xYteENny-LeFe5TLbCwizbhXWlPdp7S22ZqvAgl78Mk");

   const response = await fetch(url, {
      method: 'GET',
      headers: headers,
   });

   expect(response.status).toBe(200);

   const jsonResponse = await response.json();
   expect(jsonResponse).toEqual(expect.objectContaining([]));
});

test('Delete Card Image API Test', async () => {
   const url = 'http://127.0.0.1:5000/users/1/cards/29/images/157';

   const myHeaders = new Headers();
   myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoicG90aWxpQGJrLnJ1IiwibmFtZSI6Ilx1MDQxMlx1MDQzYlx1MDQzMFx1MDQzNCIsInJvbGUiOiJhZG1pbiJ9.xYteENny-LeFe5TLbCwizbhXWlPdp7S22ZqvAgl78Mk");

   const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
   };

   const response = await fetch(url, requestOptions);

   expect(response.status).toBe(200);

   const result = await response.text();
   console.log(result);
});




