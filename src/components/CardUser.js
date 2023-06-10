import {Link} from "react-router-dom";
import React from "react";


function CardUser(props) {

   const currentAllUsers = props.currentAllUsers

   function editUserPopupClick() {
      props.editUserPopupClick(currentAllUsers)
   }

   function deleteUserClick() {
      props.deleteUser(currentAllUsers)
   }
   function asd() {
      props.setIdUser(currentAllUsers._id)
   }

   return(
   <section className="admin-content">
      <div className="user-panel">
         <div className="user-panel__image">
            <img
            className="profile__avatar"
            src={currentAllUsers.avatar}
            alt="Аватарка"
            />
         </div>
         <div className="user-panel__profile">
            <Link to="/view-user" onClick={asd} className="header__button">
               <h1 className="profile__name">{currentAllUsers.name}</h1>
               <p className="profile__job">{currentAllUsers.about}</p>
               <p className="profile__job">{currentAllUsers.role}</p>
            </Link>
         </div>
         <button className="user-panel__button user-panel__button_list_edit" onClick={editUserPopupClick}>Редактировать</button>
         <button className="user-panel__button user-panel__button_list_remove" onClick={deleteUserClick}>Удалить</button>
      </div>
   </section>
   );
}

export default CardUser;