import Popup from "./Popup";
import React from "react";

function CardInfoUser(props) {

   const inforationUserCard = props.inforationUserCard

   return(
      <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose} popupContainer={"CardInfoUser__container"}>
         <div className="cardInfoUser">
            <div className="cardInfoUser__blockHeader"></div>
            <img className="cardInfoUser__avatar" src={inforationUserCard.avatar}/>
            <div className="cardInfoUser__Content">
               <div className="cardInfoUser__ContentText">
                  <h2 className="cardInfoUser__textH">{inforationUserCard.name}</h2>
                  <h2 className="cardInfoUser__textH">{inforationUserCard.surname}</h2>
               </div>
               <div className="cardInfoUser__textP">
                  <p className="cardInfoUser__text-p">Должность: {inforationUserCard.job_title}</p>
                  <p className="cardInfoUser__text-p">Почта: {inforationUserCard.email}</p>
                  <p className="cardInfoUser__text-p">Спектр занятости: {inforationUserCard.about}</p>
                  <p className="cardInfoUser__text-p">Рабочая группа: {inforationUserCard.work_group}</p>
               </div>
            </div>
         </div>
      </Popup>
   );
}

export default CardInfoUser;