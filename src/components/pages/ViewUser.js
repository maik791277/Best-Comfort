import Users from "./Users";
import Profile from "../Profile";
import jwtDecode from "jwt-decode";
import * as ApiUser from "../../utils/ApiUser";
import React, {useEffect, useState} from "react";
import {CurrentUserid} from "../../contexts/CurrentUserid";
import {useNavigate} from "react-router-dom";
import Footer from "../Footer";
import Card from "../Card";

function ViewUser(props) {

   const currentUser = React.useContext(CurrentUserid)
   const navigate = useNavigate()

   const [cards, setCards] = useState([])
   const [user, setUser] = useState([])

   console.log(cards)

   function userInfo() {
      ApiUser.usersMe(currentUser, props.jwt)
      .then((data) => {
         setUser(data)
         ApiUser.getInitialCards(data._id, props.jwt)
         .then((data) => {
            setCards(data);
         })
         .catch((err) => alert(err));
      })
   }



   useEffect(() => {
      userInfo()
   }, [navigate])


   return(
   <>
      <main className="content">
         <Profile onEditAvatar={props.onEditAvatar} currentUser={user} onEditProfile={props.onEditProfile} onAddPlace={props.onAddPlace} setCardInfoUser={props.setCardInfoUser}/>
         <section className="card-grid">
            <ul className="card-grid__cards">
               {cards.map(item => {
                  return (
                  <Card
                  key={item._id}
                  images={item.images}
                  name={item.name}
                  idUserCard={item._owner_id}
                  idUser={currentUser._id}
                  onCardClick={props.handleClick}
                  card={item}
                  onCardDelet={props.onCardDelete}
                  />
                  );
               })}
            </ul>
         </section>
      </main>
   </>
   );

}

export default ViewUser;