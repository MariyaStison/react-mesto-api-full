
const fetchData = {
    baseUrl: 'http://api.mesto.msti.nomoredomains.club',
    headers: {
      'Content-Type': 'application/json'
    }
  }

function  getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }  

export function auth(email, password) {
    
    return fetch(`${fetchData.baseUrl}/signup`, {
        method: 'POST',    
        headers: fetchData.headers,
        body: JSON.stringify({
            password: password,
            email: email
        })
        })
        .then(res => {
          return getResponseData(res);
        })
}

export function login(email, password) {

    return fetch(`${fetchData.baseUrl}/signin`, {
        method: 'POST',    
        headers: fetchData.headers,
        credentials: 'include',
        body: JSON.stringify({
            password: password,
            email: email
        })
        })
        .then(res => {
          return getResponseData(res);
        })
}

export function tokenCheck() {

  return fetch(`${fetchData.baseUrl}/users/me`, {
        method: 'GET',    
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        })
        
        .then(res => {
          return getResponseData(res);
        })
}

export function logout() {

  return fetch(`${fetchData.baseUrl}/logout`, {
      method: 'GET',    
      headers: fetchData.headers,
      credentials: 'include',
      })
      .then(res => {
        return getResponseData(res);
      })
}
