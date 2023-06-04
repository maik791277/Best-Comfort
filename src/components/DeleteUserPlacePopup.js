import Popup from "./Popup";
import React from "react";

function DeleteUserPlacePopup(props) {

   function handleDeleteClick(e) {
      e.preventDefault();

      props.onCardDelet(props.cardUserid._id)
   }

   return (
   <Popup isOpen={props.isOpen} name="delete" onClose={props.onClose} popupContainer={'popup__container'} popupContainerAdd={"popup__form_popup-delete"}>
      <h2 className="popup__title">Вы уверены</h2>
      <button className={`popup__button`} type="button" onClick={handleDeleteClick}>Да</button>
   </Popup>
   );
}

export default DeleteUserPlacePopup;