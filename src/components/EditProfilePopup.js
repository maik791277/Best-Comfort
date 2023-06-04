import PopupWithForm from "./PopupWithForm";
import InputPopup from "./InputPopup";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function EditProfilePopup(props) {

   const currentUser = React.useContext(CurrentUserContext)

   const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation({})

   React.useEffect(() => {
      setValues({
         name: currentUser.name,
         aboutUser: currentUser.about
      })
   }, [props.isOpen]);

   function handleSubmit(e) {
      e.preventDefault();

      props.onUpdateUser({
         name: values.name,
         about: values.aboutUser,
      }, currentUser._id);

      resetForm()
   }

   return (
   <PopupWithForm
      name="user-title"
      title="Редактировать профиль"
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
            id="profile-name-input"
            minLength="2"
            maxLength="40"
            placeholder="Имя фамилия"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            isValid={isValid}
         />
         <InputPopup
            className="field_job"
            type="text"
            name="aboutUser"
            id="profile-job-input"
            minLength="2"
            maxLength="200"
            placeholder="Кем работаете"
            value={values.aboutUser}
            onChange={handleChange}
            error={errors.aboutUser}
            isValid={isValid}
         />
   </PopupWithForm>
   );
}

export default EditProfilePopup;