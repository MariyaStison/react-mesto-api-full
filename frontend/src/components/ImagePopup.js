function ImagePopup(props) {
  return (
    <div className={`popup popup_type_view ${props.card && 'popup_opened'}`}>
      <div className="popup__container-view">
        <button type="button" className="btn btn_type_close btn_type_close-view" aria-label="Закрыть" onClick={props.onClose} />
        <img src={props.card?.link} className="popup__img" alt={props.card?.name} />
        <h2 className="popup__img-title">{props.card?.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;