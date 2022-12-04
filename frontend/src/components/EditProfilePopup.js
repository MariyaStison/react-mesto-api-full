import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      submitText="Сохранить"
      submitLoadingText="Сохранение..."
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        id="name-input"
        placeholder="Имя"
        name="name"
        required
        className="input input_type_name"
        minLength="2"
        maxLength="40"
        onChange={handleChangeName} />
      <span className='input-error name-input-error'></span>
      <input
        type="text"
        value={description}
        id="about-input"
        placeholder="О себе"
        name="about"
        className="input input_type_about"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription} />
      <span className='input-error about-input-error'></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;