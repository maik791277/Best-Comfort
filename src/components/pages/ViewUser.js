import Users from "./Users";
import Profile from "../Profile";
import jwtDecode from "jwt-decode";
import * as ApiUser from "../../utils/ApiUser";
import React, {useEffect, useState} from "react";
import {CurrentUserid} from "../../contexts/CurrentUserid";
import {useNavigate} from "react-router-dom";
import Footer from "../Footer";

function ViewUser(props) {

   const currentUser = React.useContext(CurrentUserid)
   const navigate = useNavigate()

   const [cards, setCards] = useState([])
   const [user, setUser] = useState([])

   function card() {
      ApiUser.getInitialCards(currentUser, props.jwt)
      .then((data) => {
         setCards(data);
      })
      .catch((err) => alert(err));
   }

   function userInfo() {
      ApiUser.usersMe(currentUser, props.jwt)
      .then((data) => {
         setUser(data)
      })
   }

   function infoUser() {
      console.log(user)
   }

   useEffect(() => {
      userInfo()
      card()
   }, [navigate])


   return(
   <>
      <main className="content">
         <Profile onEditAvatar={props.onEditAvatar} currentUser={user} onEditProfile={props.onEditProfile} onAddPlace={props.onAddPlace} clickInfoUser={infoUser} setCardInfoUser={props.setCardInfoUser}/>
      </main>
      <Footer/>
   </>
   );

}

export default ViewUser;