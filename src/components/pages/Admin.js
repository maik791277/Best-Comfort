import React from "react";
import {Link} from "react-router-dom";
import CardUser from "../CardUser";

export function Admin(props) {
   const currentAllUsers = props.currentAllUsers

   console.log(currentAllUsers)

   return(
   <main className="content">
      {currentAllUsers.map(item => {
         return(
         <CardUser
         key={item._id}
         currentAllUsers={item}
         editUserPopupClick={props.editUserPopupClick}
         deleteUser={props.deleteUser}
         setIdUser={props.setIdUser}
         editUserPsswordPopups={props.editUserPsswordPopups}
         />
         );
      })}
   </main>
   );
}