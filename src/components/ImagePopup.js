import Popup from "./Popup";
import Swaiper from "./Swaiper";


function ImagePopup(props) {
   const card = props.card


   function editingReportCardsopen() {
      props.editingReportCardsClick(card)
   }
   return (
   <Popup isOpen={props.isOpen} onClose={props.onClose} popupContainer={'popup-image__container'}>
      <div className="popup-image__container-swaiper">
         {props.isOpen && <Swaiper card={card} active={props.isOpen} ImagePopupClick={props.ImagePopupClick}/>}
      </div>
      <div>
         <button className="popup-image__button-edit" onClick={editingReportCardsopen}>Редактировать</button>
      </div>
      <div className="popup-image__container-text">
         <h2 className="popup-image__title"><strong>Название отчёта:</strong> {card.name}</h2>
         <p className="popup-image__title"><strong>Организации:</strong> {card.organization}</p>
         <p className="popup-image__title"><strong>Дата создания отчёта:</strong> {card.creation_date}</p>
         <p className="popup-image__title"><strong>Адрес лбыекта:</strong> {card.address}</p>
         <p className="popup-image__text">{card.description}</p>
      </div>
   </Popup>
   );
}

export default ImagePopup;