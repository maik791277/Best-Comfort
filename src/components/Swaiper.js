import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Swaiper(props) {

   return(
   <Swiper
   modules={[Navigation, Pagination, Scrollbar, A11y]}
   spaceBetween={50}
   slidesPerView={1}
   navigation
   pagination={{ clickable: true }}
   scrollbar={{ draggable: true }}
   >
      {props.card.images.map((img) => {
         function handleDeleteClick() {
            props.ImagePopupClick({
               idCard: props.card._id,
               idImage: img._id
            })
         }
            return(
            <SwiperSlide key={img._id} className="Swaiper__content">
               <img className="Swaiper__image" src={"http://127.0.0.1:5000" + img.url}/>
               <button className="Swaiper__delete-image" type="button" onClick={handleDeleteClick}/>
            </SwiperSlide>
            );
      })}
   </Swiper>
   );
}

export default Swaiper;