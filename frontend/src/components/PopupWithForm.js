function PopupWithForm({
  name,
  title,
  submitText,
  submitLoadingText,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
  children
}) {
  const className = `popup popup_type_${name} ${isOpen && 'popup_opened'}`;

  const btnClassName = `btn btn_type_submit ${isLoading && "btn_inactive"}`;

  return (
    <div className={className}>
      <div className="popup__container">
        <button
          type="button"
          className="btn btn_type_close"
          aria-label="Закрыть"
          onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          className="popup__form"
          onSubmit={onSubmit}>
          {children}
          <input
            type="submit"
            value={isLoading ? submitLoadingText : submitText}
            className={btnClassName} />
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;