import PopupWithForm from "./PopupWithForm";

function DeleteConfirmAvatar(props) {
 
    function handleSubmit(e) {
        e.preventDefault();
    
        props.onConfirm(props.card)
      } 

    return (
       <PopupWithForm
         name="confirm"
         title="Вы уверенны?"
         submitText="Удалить"
         submitLoadingText="Удаление..."
         isOpen={props.isOpen}
         onClose={props.onClose}
         onSubmit={handleSubmit}
         isLoading={props.isLoading} />
    )
}

export default DeleteConfirmAvatar;