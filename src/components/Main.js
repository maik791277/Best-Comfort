import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Footer from "./Footer";
import Profile from "./Profile";
import Users from "./pages/Users";
import {Admin} from "./pages/Admin";

function Main(props) {
   const currentUser = React.useContext(CurrentUserContext)

   return (
   <>
      <main className="content">
         {!props.loggedAdminPage && <Profile onEditAvatar={props.onEditAvatar} currentUser={currentUser} onEditProfile={props.onEditProfile} onAddPlace={props.onAddPlace} setCardInfoUser={props.setCardInfoUser}/>}
         {!props.loggedAdminPage && <Users card={props.card} handleClick={props.handleClick} onCardDelete={props.onCardDelete} currentUser={currentUser}/>}
         {props.loggedAdminPage  && <Profile onEditAvatar={props.onEditAvatar} currentUser={currentUser} onEditProfile={props.onEditProfile} onAddPlace={props.registeringNewUserPopupClick} setCardInfoUser={props.setCardInfoUser}/>}
         {props.loggedAdminPage  && <Admin currentUser={currentUser} currentAllUsers={props.currentAllUsers} editUserPopupClick={props.editUserPopupClick} deleteUser={props.deleteUser} setIdUser={props.setIdUser}/>}
      </main>
      <Footer/>
   </>
   );
}

export default Main;