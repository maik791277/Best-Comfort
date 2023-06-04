import Popup from "./Popup";
import React from "react";

function PopupWithForm(props) {


   return(
   <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose} popupContainer={'popup__container'} popupContainerAdd={props.popupContainerForm}>
      <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
         <h2 className="popup__title">{props.title}</h2>
         {props.children}
         <button className={`popup__button ${!props.isValid ? 'popup__button_type_error' : ''}`} type="submit">{props.nameButton}</button>
      </form>
   </Popup>
   );
}
// popup__button_type_error это класс для деактивация кнопки сабмит на будущие

export default PopupWithForm;

