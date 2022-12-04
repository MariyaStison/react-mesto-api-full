import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      link: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitText="Сохранить"
      submitLoadingText="Сохранение..."
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        ref={avatarRef}
        type="url"
        id="avatar-link-input"
        placeholder="Ссылка на новый аватар"
        name="link"
        required
        className="input input_type_name"
      />
      <span className='input-error avatar-link-input-error'></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;