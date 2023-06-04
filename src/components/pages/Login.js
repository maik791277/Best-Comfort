import React, {useState} from "react";
import InputPopup from "../InputPopup";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";

function Login(props) {


   const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation({})

   function handleSubmit(e) {
      e.preventDefault()

      const {email, password} = values;
      props.authorize(email, password)
   }

   return (
   <>
      <main className="content">
         <form className="authentication" name={props.name} onSubmit={handleSubmit}>
            <h2 className="authentication__title">Вход</h2>
            <InputPopup
            className="login_email"
            NewclassName="popup__input_black"
            type="email"
            name="email"
            id="login_email-input"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            value={useState.value}
            onChange={handleChange}
            error={errors.email}
            isValid={isValid}
            />
            <InputPopup
            className="login_password"
            NewclassName="popup__input_black"
            type="password"
            name="password"
            id="login_password-input"
            minLength="2"
            maxLength="40"
            placeholder="Пароль"
            value={useState.value}
            onChange={handleChange}
            error={errors.password}
            isValid={isValid}
            />
            <button className={`authentication__button ${!isValid ? 'popup__button_type_error' : ''}`} type="submit" >Войти</button>
         </form>
      </main>
   </>
   );
}

export default Login;