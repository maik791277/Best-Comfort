import React from "react";
import Popup from "./Popup";

function DeletePlacePopup(props) {



   function handleDeleteClick(e) {
      e.preventDefault();

      props.onCardDelet(props.idCard)
   }

   return (
   <Popup isOpen={props.isOpen} name="delete" onClose={props.onClose} popupContainer={'popup__container'} popupContainerAdd={"popup__form_popup-delete"}>
      <h2 className="popup__title">Вы уверены</h2>
      <button className={`popup__button`} type="button" onClick={handleDeleteClick}>Да</button>
   </Popup>
   );
}

export default DeletePlacePopup