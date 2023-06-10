// export const BASE_URL = 'http://127.0.0.1:5000'

function checkResponse(res) {
   return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}


export const tokenVerification = (jwt) => {
   let myHeaders = new Headers();
   myHeaders.append("Authorization", jwt);

   let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
   };

   return fetch("http://127.0.0.1:5000/validate", requestOptions)
   .then(res => checkResponse(res))
}

export const authorize = (email, password) => {
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

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


export const usersMe = (idUser, jwt) => {
   let myHeaders = new Headers();
   myHeaders.append("Authorization", jwt);

   let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
   };
   return fetch(`http://127.0.0.1:5000/users/${idUser}`, requestOptions)
   .then(res => checkResponse(res));
}


export const createUserInformation = (data, idUser, jwt) => {
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   myHeaders.append("Authorization", jwt);

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

export const getInitialCards = (idUser, jwt) => {
   let myHeaders = new Headers();
   myHeaders.append("Authorization", jwt);

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

export const allUsers = (jwt) => {
   let myHeaders = new Headers();
   myHeaders.append("Authorization", jwt);

   let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
   };

   return fetch("http://127.0.0.1:5000/users", requestOptions)
   .then(res => checkResponse(res));
}

export  const registeringNewUser = (data, jwt) => {
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   myHeaders.append("Authorization", jwt);

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

export const deleteUser = (idUser, jwt) => {
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   myHeaders.append("Authorization", jwt);


   let requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
   };

   return fetch(`http://127.0.0.1:5000/users/${idUser}`, requestOptions)
   .then(res => checkResponse(res));
}









