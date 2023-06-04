import PopupWithForm from "./PopupWithForm";
import InputPopup from "./InputPopup";
import React from "react";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function AddPlacePopup(props) {

   const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation({})

   function handleSubmit(e) {
      e.preventDefault();

      props.onUpdateCard({
         name: values.name,
         link: values.link,
      });

      resetForm()
      setValues({
         name: '',
         link: ''
      })
   }

   return (
   <PopupWithForm
      name="user-card"
      title="Новое место"
      nameButton={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
   >
      <InputPopup
         className="field_name"
         type="text"
         name="name"
         id="card-name-input"
         minLength="2"
         maxLength="30"
         placeholder="Название"
         value={values.name}
         onChange={handleChange}
         error={errors.name}
         isValid={isValid}
      />
      <InputPopup
         className="field_job"
         type="url"
         name="link"
         id="card-job-input"
         placeholder="Ссылка на картинку"
         value={values.link}
         onChange={handleChange}
         error={errors.link}
         isValid={isValid}
      />
   </PopupWithForm>
   );
}

export default AddPlacePopup;
