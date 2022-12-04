import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/api';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import avatarPath from '../images/profile__avatar.jpg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmAvatar from './DeleteConfirmPopUp';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTips from './InfoTooltip';
import successImgPath from '../images/success-img.svg';
import failImgPath from '../images/fail-img.svg';
import { auth, login, logout, tokenCheck } from '../utils/auth';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTipsPopupOpen, setIsInfoTipsPopupOpen] = React.useState(false);
  const [infoTipsTitle, setInfoTipsTitle] = React.useState('');
  const [infoTipsImgPath, setInfoTipsImgPath] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({ name: 'Жак-Ив Кусто', about: 'Исследователь морей', avatar: avatarPath, _id: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirmPopUpOpen, setConfirmPopUpOpen] = React.useState(false);
  const [selectedCardToDelete, setSelectedCardToDelete] = React.useState(null);
  const history = useHistory();
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmPopUpOpen || selectedCard;

  React.useEffect(() => {
      tokenCheck()
        .then((res) => {
          setEmail(res.email);
          setIsLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          console.log(`Произошла ошибка при проверке токена: ` + err);
        })
  }, []);

  React.useEffect(() => {
    if (!isInfoTipsPopupOpen && isRegistered) {
      history.push('/sign-in')
    }
  }, [isInfoTipsPopupOpen])

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    } else {
      history.push('/sign-in');
    }
  }, [isLoggedIn, history])

  React.useEffect(() => {
    if (isLoggedIn) {
    api.getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Произошла ошибка при загрузки данных пользователя: ` + err);
      })
  }}, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards.data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка при загрузки данных: ` + err);
      })
  }},
    [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(item) {
    setSelectedCard(item);
  }

  function closeAllPopups() {
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    isConfirmPopUpOpen && setConfirmPopUpOpen(false);
    isInfoTipsPopupOpen && setIsInfoTipsPopupOpen(false);
    (selectedCard != null) && setSelectedCard(null);
    (selectedCardToDelete != null) && setSelectedCardToDelete(null);
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api.patchUserData({
      name,
      about
    })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка при сохранении данных пользователя: ` + err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api.patchAvatar(link)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();;
      })
      .catch((err) => {
        console.log(`Произошла ошибка при сохранении аватара пользователя: ` + err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Произошла ошибка при изменении статуса лайка: ` + err);
      })
  }

  function handleCardDelete(card) {
    setConfirmPopUpOpen(true);
    setSelectedCardToDelete(card);
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api.postNewCard({
      name: newCard.name,
      link: newCard.link
    })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка при добавлении карточки: ` + err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleComfirmDelete() {
    setIsLoading(true);
    api.deleteCard(selectedCardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCardToDelete._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка при удалении карточки: ` + err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleRegister(email, password) {
    setIsLoading(true);
    auth(email, password)
      .then(() => {
        setInfoTipsTitle("Вы успешно зарегистрировались!");
        setInfoTipsImgPath(successImgPath);
        setIsInfoTipsPopupOpen(true);
        setIsRegistered(true);
      })
      .catch((err) => {
        setInfoTipsTitle("Что-то пошло не так! Попробуйте еще раз.");
        setInfoTipsImgPath(failImgPath);
        setIsInfoTipsPopupOpen(true);
        setIsRegistered(false);
        console.log(`Произошла ошибка при регистрации: ` +  err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    login(email, password)
      .then((res) => {
        setEmail(email);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(`Произошла ошибка при проверке токена: ` + err);
        setInfoTipsTitle("Что-то пошло не так! Попробуйте еще раз.");
        setInfoTipsImgPath(failImgPath);
        setIsInfoTipsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleExit() {
    logout()
      .then(res => {
       setIsLoggedIn(false);
      })
      .catch((err) => {
        console.log(`Произошла ошибка при выходе: ` + err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={isLoggedIn} email={email} onExit={handleExit} />

        <Switch>
        <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />

            <Footer />
          </ProtectedRoute>
          
          <Route path="/sign-up">
            <Register
              isLoading={isLoading}
              submitText="Зарегистрироваться"
              submitLoadingText="Регистрация..."
              onSubmit={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Login
              isLoading={isLoading}
              submitText="Войти"
              submitLoadingText="Вход..."
              onSubmit={handleLogin} />
          </Route>
        </Switch>
        
        <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading} />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isLoading} />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading} />

            <DeleteConfirmAvatar
              card={selectedCardToDelete}
              isOpen={isConfirmPopUpOpen}
              onClose={closeAllPopups}
              onConfirm={handleComfirmDelete}
              isLoading={isLoading} />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            
            <InfoTips
              name="info"
              isOpen={isInfoTipsPopupOpen}
              title={infoTipsTitle}
              img={infoTipsImgPath}
              onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
