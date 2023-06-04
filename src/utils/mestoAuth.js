export const BASE_URL = 'https://auth.nomoreparties.co'

function checkResponse(res) {
   return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

export const register = (email, password) => {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         "password": password,
         "email": email
      })
   })
   .then(res => checkResponse(res));
};