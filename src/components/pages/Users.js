import Card from "../Card";
import React from "react";

function Users(props) {

   const currentUser = props.currentUser

   return(
      <section className="card-grid">
         <ul className="card-grid__cards">
            {props.card.map(item => {
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
   );
}

export default Users;