import PopupWithForm from "./PopupWithForm";
import InputPopup from "./InputPopup";
import React from "react";
import somethingIsWrong from "../images/something-wrong.png"
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function EditUserPsswordPopup(props) {

   const cardUserid = props.cardUserid
   const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation({})

   React.useEffect(() => {
      setValues({
         password: "",
         confirmPassword: "",
      })
   }, [props.isOpen]);

   function handleSubmit(e) {
      e.preventDefault();

      if (values.password !== values.confirmPassword) {
         props.popupRegister({
            textPopup: 'Что-то пошло не так! Пароли не совпадают.',
            imagePopup: somethingIsWrong
         })

         props.isInfoTooltip(true)

      }else {
         props.onUpdateUser({
            password: values.password
         },cardUserid._id);
      }
      resetForm()
   }


   return(
   <PopupWithForm
   name="image-user"
   popupContainerForm="popup__form_image-user"
   title="Смена пароля"
   nameButton={'Сохранить'}
   isOpen={props.isOpen}
   onClose={props.onClose}
   onSubmit={handleSubmit}
   isValid={isValid}
   >
      <InputPopup
      className="field_job"
      type="password"
      name="password"
      id="input-image-user"
      placeholder="Новый пароль"
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
      value={values.confirmPassword}
      onChange={handleChange}
      error={errors.confirmPassword}
      isValid={isValid}
      />
   </PopupWithForm>
   );
}

export default EditUserPsswordPopup;