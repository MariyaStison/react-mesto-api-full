import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: placeName,
      link: placeLink
    })
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      submitText="Сохранить"
      submitLoadingText="Сохранение..."
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        type="text"
        id="title-input"
        placeholder="Название"
        name="name"
        required
        className="input input_type_name"
        minLength="2"
        maxLength="30"
        onChange={handleChangePlaceName} />
      <span className='input-error title-input-error'></span>
      <input
        type="url"
        id="link-input"
        placeholder="Ссылка на картинку"
        name="link"
        required
        className="input input_type_about"
        onChange={handleChangePlaceLink} />
      <span className='input-error link-input-error'></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;