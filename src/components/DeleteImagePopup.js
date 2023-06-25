import Popup from "./Popup";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function DeleteImagePopup(props) {

   const currentUser = React.useContext(CurrentUserContext)

   function handleDeleteClick(e) {
      e.preventDefault();
      props.deleteImage(currentUser._id, props.isCardImageData.idCard, props.isCardImageData.idImage)
   }
   return(
   <>
      <Popup isOpen={props.isOpen} name="delete" onClose={props.onClose} popupContainer={'popup__container'} popupContainerAdd={"popup__form_popup-delete"} popupClass={"popup__container_swiper"}>
         <h2 className="popup__title">Вы уверены</h2>
         <button className={`popup__button`} type="button" onClick={handleDeleteClick}>Да</button>
      </Popup>
   </>
   );
}

export default DeleteImagePopup;