import React from "react";

function Profile(props) {
   const currentUser = props.currentUser


   function CardInfoUserClick() {
      props.setCardInfoUser(currentUser)

   }
   return(
   <main className="content">
      <section className="profile">
         <div>
            <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}/>
            <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватарка"
            />
         </div>
         <div className="profile__info">
            <div className="profile__info-content" onClick={CardInfoUserClick}>
               <h1 className="profile__name">{currentUser.name}</h1>
               <p className="profile__job">{currentUser.about}</p>
            </div>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}/>
         </div>
         <button className="profile__add-button" type="button" onClick={props.onAddPlace}/>
      </section>
   </main>
   );
}

export default Profile