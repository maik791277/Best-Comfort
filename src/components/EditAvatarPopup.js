import PopupWithForm from "./PopupWithForm";
import InputPopup from "./InputPopup";
import React from "react";
import {useFormAndValidation} from "../hooks/useFormAndValidation";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {

   const currentUser = React.useContext(CurrentUserContext)

   const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation({})

   function handleSubmit(e) {
      e.preventDefault();

      props.onUpdateAvatar({
         avatar: values.link
      }, currentUser._id);

      resetForm()
      setValues({
         link: ''
      })
   }

   return (
   <PopupWithForm
      name="image-user"
      popupContainerForm="popup__form_image-user"
      title="Обновить аватар"
      nameButton={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
   >
         <InputPopup
            className="field_job"
            type="url"
            name="link"
            id="input-image-user"
            placeholder="Ссылка на картинку"
            value={values.link}
            onChange={handleChange}
            error={errors.link}
            isValid={isValid}
         />
   </PopupWithForm>
   );
}

export default EditAvatarPopup;