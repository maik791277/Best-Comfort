import Popup from "./Popup";

function ImagePopup(props) {
   return (
   <Popup isOpen={props.isOpen} onClose={props.onClose} popupContainer={'popup-image__container'}>
      <img className="popup-image__image" src={props.card.link} alt={props.card.name}/>
      <p className="popup-image__title">{props.card.name}</p>
   </Popup>
   );
}

export default ImagePopup;