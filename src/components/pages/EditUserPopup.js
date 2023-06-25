import PopupWithForm from "../PopupWithForm";
import InputPopup from "../InputPopup";
import React from "react";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";

function EditUserPopup(props) {

   const cardUserid = props.cardUserid
   const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation({})

   React.useEffect(() => {
      setValues({
         name: cardUserid.name,
         surname: cardUserid.surname === null ? "" : cardUserid.surname,
         job_title: cardUserid.job_title === null ? "" : cardUserid.job_title,
         avatar: cardUserid.avatar,
         work_group: cardUserid.work_group === null ? "" :cardUserid.work_group,
         about: cardUserid.about
      })
   }, [props.isOpen]);

   function handleSubmit(e) {
      e.preventDefault();

      props.onUpdateUser(values,cardUserid._id);

      resetForm()
   }

   return(
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
      id="profile-Admin-name-input"
      minLength="2"
      maxLength="40"
      placeholder="Имя"
      value={values.name}
      onChange={handleChange}
      error={errors.name}
      isValid={isValid}
      />
      <InputPopup
      className="field_name"
      type="text"
      name="surname"
      id="profile-Admin-surname-input"
      minLength="2"
      maxLength="40"
      placeholder="Фамилия"
      value={values.surname}
      onChange={handleChange}
      error={errors.surname}
      isValid={isValid}
      />
      <InputPopup
      className="field_name"
      type="text"
      name="job_title"
      id="profile-Admin-job_title-input"
      minLength="2"
      maxLength="40"
      placeholder="Должность"
      value={values.job_title}
      onChange={handleChange}
      error={errors.job_title}
      isValid={isValid}
      />
      <InputPopup
      className="field_name"
      type="url"
      name="avatar"
      id="profile-Admin-avatar-input"
      placeholder="Фотография url"
      value={values.avatar}
      onChange={handleChange}
      error={errors.avatar}
      isValid={isValid}
      />
      <InputPopup
      className="field_job"
      type="text"
      name="about"
      id="profile-Admin-job-input"
      minLength="2"
      maxLength="200"
      placeholder="Спектр занятости"
      value={values.about}
      onChange={handleChange}
      error={errors.aboutUser}
      isValid={isValid}
      />
      <InputPopup
      className="field_job"
      type="text"
      name="work_group"
      id="profile-Admin-work_group-input"
      minLength="2"
      maxLength="200"
      placeholder="Группа"
      value={values.work_group}
      onChange={handleChange}
      error={errors.aboutUser}
      isValid={isValid}
      />
      {/*<InputPopup*/}
      {/*className="field_job"*/}
      {/*type="text"*/}
      {/*name="password"*/}
      {/*id="profile-Admin-work_group-input"*/}
      {/*minLength="2"*/}
      {/*maxLength="200"*/}
      {/*placeholder="Группа"*/}
      {/*onChange={handleChange}*/}
      {/*error={errors.aboutUser}*/}
      {/*isValid={isValid}*/}
      {/*/>*/}
      {/*<InputPopup*/}
      {/*className="field_job"*/}
      {/*type="email"*/}
      {/*name="email"*/}
      {/*id="profile-Admin-email-input"*/}
      {/*minLength="2"*/}
      {/*maxLength="200"*/}
      {/*placeholder="Email"*/}
      {/*onChange={handleChange}*/}
      {/*error={errors.email}*/}
      {/*isValid={isValid}*/}
      {/*/>*/}
   </PopupWithForm>
   );
}

export default EditUserPopup;