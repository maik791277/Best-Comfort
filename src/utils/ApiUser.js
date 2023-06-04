// export const BASE_URL = 'http://127.0.0.1:5000'

function checkResponse(res) {
   return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

export const authorize = (email, password) => {
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiaHVodUB5YW5kZXguY29tIiwibmFtZSI6IiIsInJvbGUiOiJhZG1pbiJ9.PKlg3ytJZ8txxIZq6oiTbR6DNxwH7GQCaqMIgeZKx0Y");

   let raw = JSON.stringify({
      "password": password,
      "email": email
   });

   let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
   };
   return fetch(`http://localhost:5000/signin`, requestOptions)
   .then(res => checkResponse(res))
};


export const usersMe = (idUser) => {
   let myHeaders = new Headers();
   myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiaHVodUB5YW5kZXguY29tIiwibmFtZSI6IiIsInJvbGUiOiJhZG1pbiJ9.PKlg3ytJZ8txxIZq6oiTbR6DNxwH7GQCaqMIgeZKx0Y");

   let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
   };
   return fetch(`http://127.0.0.1:5000/users/${idUser}`, requestOptions)
   .then(res => checkResponse(res));
}


export const createUserInformation = (data, idUser) => {
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiaHVodUB5YW5kZXguY29tIiwibmFtZSI6IiIsInJvbGUiOiJhZG1pbiJ9.PKlg3ytJZ8txxIZq6oiTbR6DNxwH7GQCaqMIgeZKx0Y");

   let raw = JSON.stringify(data);

   let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
   };

   return fetch(`http://localhost:5000/users/${idUser}`, requestOptions)
   .then(res => checkResponse(res));
}

export const getInitialCards = (idUser) => {
   let myHeaders = new Headers();
   myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiaHVodUB5YW5kZXguY29tIiwibmFtZSI6Ilx1MDQxMlx1MDQzYlx1MDQzMFx1MDQzNFx1MDQzOFx1MDQ0MVx1MDQzYlx1MDQzMFx1MDQzMiBcdTA0MWZcdTA0M2VcdTA0NDJcdTA0NGJcdTA0M2JcdTA0MzhcdTA0NDZcdTA0NGJcdTA0M2QiLCJyb2xlIjoiYWRtaW4ifQ.GEYWrzCOKrwzQDHxKhOg3SD8sW0m3zCUF2H1m09S7_U");

   let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
   };

   return fetch(`http://localhost:5000/users/${idUser}/cards`, requestOptions)
   .then(res => checkResponse(res));
}

export const createCard = (data) => {

}

export const allUsers = () => {
   let myHeaders = new Headers();
   myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiaHVodUB5YW5kZXguY29tIiwibmFtZSI6Ilx1MDQxMlx1MDQzYlx1MDQzMFx1MDQzNFx1MDQzOFx1MDQ0MVx1MDQzYlx1MDQzMFx1MDQzMiBcdTA0MWZcdTA0M2VcdTA0NDJcdTA0NGJcdTA0M2JcdTA0MzhcdTA0NDZcdTA0NGJcdTA0M2QiLCJyb2xlIjoiYWRtaW4ifQ.GEYWrzCOKrwzQDHxKhOg3SD8sW0m3zCUF2H1m09S7_U");

   let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
   };

   return fetch("http://127.0.0.1:5000/users", requestOptions)
   .then(res => checkResponse(res));
}

export  const registeringNewUser = (data) => {
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiaHVodUB5YW5kZXguY29tIiwibmFtZSI6Ilx1MDQxMlx1MDQzYlx1MDQzMFx1MDQzNFx1MDQzOFx1MDQ0MVx1MDQzYlx1MDQzMFx1MDQzMiBcdTA0MWZcdTA0M2VcdTA0NDJcdTA0NGJcdTA0M2JcdTA0MzhcdTA0NDZcdTA0NGJcdTA0M2QiLCJyb2xlIjoiYWRtaW4ifQ.GEYWrzCOKrwzQDHxKhOg3SD8sW0m3zCUF2H1m09S7_U");

   let raw = JSON.stringify(data);

   let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
   };

   return fetch("http://127.0.0.1:5000/signup", requestOptions)
   .then(res => checkResponse(res));
}

export const deleteUser = (idUser) => {
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiaHVodUB5YW5kZXguY29tIiwibmFtZSI6Ilx1MDQxMlx1MDQzYlx1MDQzMFx1MDQzNFx1MDQzOFx1MDQ0MVx1MDQzYlx1MDQzMFx1MDQzMiBcdTA0MWZcdTA0M2VcdTA0NDJcdTA0NGJcdTA0M2JcdTA0MzhcdTA0NDZcdTA0NGJcdTA0M2QiLCJyb2xlIjoiYWRtaW4ifQ.GEYWrzCOKrwzQDHxKhOg3SD8sW0m3zCUF2H1m09S7_U");


   let requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
   };

   return fetch(`http://127.0.0.1:5000/users/${idUser}`, requestOptions)
   .then(res => checkResponse(res));
}