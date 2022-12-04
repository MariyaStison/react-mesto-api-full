import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card(props) {

  const user = React.useContext(CurrentUserContext);
  const isOwn = props.item.owner === user._id;
  const cardDeleteButtonClassName = (
    `btn btn_type_delete ${isOwn ? '' : 'btn_hidden'}`
  );
  const isLiked = props.item.likes.some((like) => like === user._id);
  const cardLikeButtonClassName = (
    `btn btn_type_like ${isLiked ? 'btn_active' : 'btn_inactive'}`
  );

  function handleClick() {
    props.onCardClick(props.item);
  }

  function onCardLike() {
    props.onCardLike(props.item);
  }

  function onCardDelete() {
    props.onCardDelete(props.item);
  }

  return (
    <li className="elemnt">
      <img src={props.item.link} className="elemnt__img" alt={props.item.name} onClick={handleClick} />
      <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить" onClick={onCardDelete} />
      <div className="elemnt__bottom-site">
        <h2 className="elemnt__title">{props.item.name}</h2>
        <div className="elemnt__like-block">
          <button type="button" className={cardLikeButtonClassName} aria-label="Поставить Лайк" onClick={onCardLike} />
          <div className="elemnt__like-counter">{props.item.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

export default Card;