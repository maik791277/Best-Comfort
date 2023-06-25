import React from "react";
import Popup from "./Popup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function DeletePlacePopup(props) {

   const currentUser = React.useContext(CurrentUserContext)

   function handleDeleteClick(e) {
      e.preventDefault();

      props.onCardDelet(currentUser._id, props.idCard._id)
   }

   return (
   <Popup isOpen={props.isOpen} name="delete" onClose={props.onClose} popupContainer={'popup__container'} popupContainerAdd={"popup__form_popup-delete"}>
      <h2 className="popup__title">Вы уверены</h2>
      <button className={`popup__button`} type="button" onClick={handleDeleteClick}>Да</button>
   </Popup>
   );
}

export default DeletePlacePopup