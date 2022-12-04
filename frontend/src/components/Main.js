import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const user = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__content">
          <img src={user.avatar} alt="Аватарка" className="profile__avatar" />
          <button type="button" className="btn btn_type_edit-avatar" aria-label="Обновить аватар" onClick={props.onEditAvatar} />
          <div className="profile__info">
            <h1 className="profile__title">{user.name}</h1>
            <button type="button" className="btn btn_type_edit" aria-label="Редактировать профиль" onClick={props.onEditProfile} />
            <p className="profile__subtitle">{user.about}</p>
          </div>
        </div>
        <button type="button" className="btn btn_type_add" aria-label="Добавить" onClick={props.onAddPlace} />
      </section>
      <section>
        <ul className="elemets">
          {props.cards.map((card) => {
            return (
              <Card item={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;