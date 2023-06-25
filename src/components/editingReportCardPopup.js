import InputPopup from "./InputPopup";
import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function EditingReportCardPopup(props) {

   const currentUser = React.useContext(CurrentUserContext)
   const dataCard = props.dataCard

   const {values, handleChange, handleImageChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation({})

   React.useEffect(() => {
      setValues({
         name: dataCard.name,
         organization: dataCard.organization,
         address: dataCard.address,
         description: dataCard.description

      })
   }, [props.isOpen]);

   function handleSubmit(e) {
      e.preventDefault();

      props.onUpdateCard({
         name: values.name,
         organization: values.organization,
         address: values.address,
         description: values.description
      }, currentUser._id, values.file, ()=>{
         setValues({
            name: '',
            organization: '',
            address: '',
            description: '',
         })
         values.file.target.value = ""
      },dataCard._id);


      resetForm()
   }

   const container = {
      position: 'relative',
   }

   return (
   <PopupWithForm
   name="user-card"
   title="Редактирование отчёта"
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
      placeholder="Название отчёта"
      value={values.name}
      onChange={handleChange}
      error={errors.name}
      isValid={isValid}
      />
      <InputPopup
      className="field_organization"
      type="text"
      name="organization"
      id="card-organization-input"
      minLength="2"
      maxLength="30"
      placeholder="Организация"
      value={values.organization}
      onChange={handleChange}
      error={errors.organization}
      isValid={isValid}
      />
      <InputPopup
      className="field_address"
      type="text"
      name="address"
      id="card-address-input"
      minLength="2"
      maxLength="30"
      placeholder="Организация"
      value={values.address}
      onChange={handleChange}
      error={errors.address}
      isValid={isValid}
      />
      <textarea
      name="description"
      value={values.description}
      id="card-organization-input"
      placeholder="Описание работы на объекте"
      onChange={handleChange}
      className={`popup__input popup__input_description}`}
      />
      <InputPopup
      className="field_job"
      type="file"
      name="file"
      id="card-job-input"
      placeholder="Ссылка на картинку"
      //value={values.link}
      onChange={handleImageChange}
      error={errors.file}
      isValid={isValid}
      />
   </PopupWithForm>
   );
}

export default EditingReportCardPopup;