import React from "react";
import PopupWithForm from "./PopupWithForm";


function InfoTooltip(props) {

   function handleSubmit() {

   }

   return (
   <PopupWithForm
   name="user-title"
   isOpen={props.isOpen}
   onClose={props.onClose}
   onSubmit={handleSubmit}>
      <div className="info-tooltip">
         <img src={props.image}/>
         <h2 className="info-tooltip__title">{props.text}</h2>
      </div>
   </PopupWithForm>
   );
}

export default InfoTooltip;