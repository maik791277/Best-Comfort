import {useFormAndValidation} from "../hooks/useFormAndValidation";
import PopupWithForm from "./PopupWithForm";
import InputPopup from "./InputPopup";
import React from "react";
import somethingIsWrong from "../images/something-wrong.png";

function RegisteringNewUserPopup(props) {

   const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation({})

   function handleSubmit(e) {
      e.preventDefault();

      if (values.password !== values.confirmPassword) {
         props.popupRegister({
            textPopup: 'Что-то пошло не так! Пароли не совпадают.',
            imagePopup: somethingIsWrong
         })

         props.isInfoTooltip(true)

      }else {
         props.onUserUp({
            email: values.email,
            password: values.password
         })
      }



      resetForm()
      setValues({
         email: '',
         password: '',
         confirmPassword: ''
      })
   }

   return(
   <PopupWithForm
   name="user-title"
   title="Создания пользователя"
   nameButton={'Сохранить'}
   isOpen={props.isOpen}
   onClose={props.onClose}
   onSubmit={handleSubmit}
   isValid={isValid}
   >
      <InputPopup
      className="field_name"
      type="email"
      name="email"
      id="profile-Admin-registering-email-input"
      minLength="2"
      maxLength="40"
      placeholder="Почта"
      value={values.email}
      onChange={handleChange}
      error={errors.email}
      isValid={isValid}
      />
      <InputPopup
      className="field_name"
      type="password"
      name="password"
      id="profile-Admin-registering-password-input"
      minLength="2"
      maxLength="40"
      placeholder="Пароль"
      value={values.password}
      onChange={handleChange}
      error={errors.password}
      isValid={isValid}
      />
      <InputPopup
      className="field_job"
      type="password"
      name="confirmPassword"
      id="input-image-user"
      placeholder="Повторите пароль"
      value={values.link}
      onChange={handleChange}
      error={errors.link}
      isValid={isValid}
      />
      {/*<InputPopup*/}
      {/*className="field_name"*/}
      {/*type="checkbox"*/}
      {/*name="name"*/}
      {/*id="profile-Admin-name-input"*/}
      {/*minLength="2"*/}
      {/*maxLength="40"*/}
      {/*placeholder="Имя"*/}
      {/*value={values.name}*/}
      {/*onChange={handleChange}*/}
      {/*error={errors.name}*/}
      {/*isValid={isValid}*/}
      {/*/>*/}
   </PopupWithForm>
   );
}

export default RegisteringNewUserPopup;