import React, {useState} from "react";
import { Link } from "react-router-dom";
import InputPopup from "../InputPopup";
import somethingIsWrong from "../../images/something-wrong.png"
import {useFormAndValidation} from "../../hooks/useFormAndValidation";

function Register(props) {

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
         const {email, password} = values;
         props.register(email, password)

      }
   }

   return (
   <>
      <div className="page">
         <main className="content">
            <form className="authentication" name={props.name} onSubmit={handleSubmit}>
               <h2 className="authentication__title">Регистрация</h2>
               <InputPopup
               className="register_email"
               NewclassName="popup__input_black"
               type="email"
               name="email"
               id="register_email-input"
               minLength="2"
               maxLength="40"
               placeholder="Email"
               value={useState.value}
               onChange={handleChange}
               error={errors.email}
               isValid={isValid}
               />
               <InputPopup
               className="register_password"
               NewclassName="popup__input_black"
               type="password"
               name="password"
               id="register_password-input"
               minLength="2"
               maxLength="40"
               placeholder="Пароль"
               value={useState.value}
               onChange={handleChange}
               error={errors.password}
               isValid={isValid}
               />
               <InputPopup
               className="register_confirmPassword"
               NewclassName="popup__input_black"
               type="password"
               name="confirmPassword"
               id="register_confirmPassword-input"
               minLength="2"
               maxLength="40"
               placeholder="Повторите пароль"
               value={useState.value}
               onChange={handleChange}
               error={errors.confirmPassword}
               isValid={isValid}
               />
               <button className={`authentication__button ${!isValid ? 'popup__button_type_error' : ''}`} type="submit" >Войти</button>
               <h2 className="authentication__text">Уже зарегистрированы? <Link to="/sign-in">Войти</Link></h2>
            </form>
         </main>
      </div>
   </>
   );
}

export default Register;