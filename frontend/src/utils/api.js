class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
      this._credentials = options.credentials;
    }

    //Приватный метод для проебразования и проверке ответа от сервера
    _getResponseData(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
      }
      return res.json();
    }
    

    //Метод для получения информации о пользователе
    getUserData() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
        credentials: this._credentials
        })
            .then(res => {
              return this._getResponseData(res);
            })
    }
    
    //Метод для получения данных карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            credentials: this._credentials
            })
              .then(res => {
                return this._getResponseData(res);
              })
    }
  
    //Метод для загрузки данных пользователя на сервер
    patchUserData(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',    
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
            })
            .then(res => {
              return this._getResponseData(res);
            })
    }

    //Метод для добавления новой карточки
    postNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',    
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
            })
            .then(res => {
              return this._getResponseData(res);
            })
    }

     //Метод для удаления карточки
    deleteCard(card_id) {
        return fetch(`${this._baseUrl}/cards/${card_id}`, {
            method: 'DELETE',    
            headers: this._headers,
            credentials: this._credentials
            })
            .then(res => {
              return this._getResponseData(res);
            })
    }

    //Метод для редактирования аватара
    patchAvatar(data)  {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',    
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify({
                avatar: data.link
              })
            })
            .then(res => {
              return this._getResponseData(res);
            })
    }
   

    //Метод для илайка и дизлайка
    changeLikeCardStatus(card_id, isLiked) {
      if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${card_id}/likes`, {
          method: 'PUT',    
          headers: this._headers,
          credentials: this._credentials
          })
          .then(res => {
            return this._getResponseData(res);
          })
      } else {
        return fetch(`${this._baseUrl}/cards/${card_id}/likes`, {
          method: 'DELETE',    
          headers: this._headers,
          credentials: this._credentials
          })
          .then(res => {
            return this._getResponseData(res);
          })
      }  
  }
}

const api = new Api({
  baseUrl: 'http://api.mesto.msti.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'
});

export default api;