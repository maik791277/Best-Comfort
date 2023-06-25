import {Link} from "react-router-dom";
import React, {useState} from "react";


function CardUser(props) {

   const currentAllUsers = props.currentAllUsers

   function editUserPopupClick() {
      props.editUserPopupClick(currentAllUsers)
   }

   function deleteUserClick() {
      props.deleteUser(currentAllUsers)
   }
   function informationUser() {
      props.setIdUser(currentAllUsers._id)
   }

   function editUserPsswordPopupClick() {
      props.editUserPsswordPopups(currentAllUsers)
   }




   return(
   <section className="admin-content">
      <div className="user-panel">
         <div className="user-panel__conteiner">
            <div className="user-panel__image">
               <img
               className="profile__avatar"
               src={currentAllUsers.avatar}
               alt="Аватарка"
               />
            </div>
            <div className="user-panel__profile">
               <Link to="/view-user" onClick={informationUser} className="header__button">
                  <h1 className="user-panel__name">{currentAllUsers.name}</h1>
                  <p className="user-panel__job">{currentAllUsers.job_title}</p>
                  <p className="user-panel__job">{currentAllUsers.role}</p>
               </Link>
            </div>
         </div>
         <div className="user-panel__conteiner-button">
            <button className="user-panel__button user-panel__button_list_edit" onClick={editUserPopupClick}>Редактировать</button>
            <button className="user-panel__button user-panel__button_list_password" onClick={editUserPsswordPopupClick}>Пароль</button>
            {currentAllUsers.role === "user" &&<button className="user-panel__button user-panel__button_list_remove" onClick={deleteUserClick}>Удалить</button>}
         </div>
      </div>
   </section>
   );
}

export default CardUser;