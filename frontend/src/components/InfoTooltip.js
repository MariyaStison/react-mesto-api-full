function InfoTips(props) {

    const className = `popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`;

    return (
        <div className={className}>
            <div className="popup__container popup__container_type_info">
                <button
                    type="button"
                    className="btn btn_type_close"
                    aria-label="Закрыть"
                    onClick={props.onClose} />
                <img src={props.img} alt={props.title} className="popup__info-img"></img>
                <h2 className="popup__title popup__title_type_info">{props.title}</h2>
            </div>
        </div>
    )
}

export default InfoTips;
