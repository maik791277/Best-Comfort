import {useEffect, useState} from "react";

const Popup = ({ isOpen, name, onClose, children, popupContainer, popupContainerAdd, buttonAdd}) => {


   // const [activeButton, setActiveButton] = useState(false)
   // setActiveButton(buttonAdd)

   useEffect(() => {
      if (!isOpen) return;

      const closeByEscape = (e) => {
         if (e.key === 'Escape') {
            onClose()
         }
      }

      document.addEventListener('keydown', closeByEscape)
   }, [isOpen, onClose])

   const handleOverlay = (e) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   }
   return (
   <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} onClick={handleOverlay}>
      <div className={`${popupContainer} ${popupContainerAdd}`}>
         {children}
         <button className="popup__close-button" type="button" onClick={onClose} />
      </div>
   </div>
   );
};

export default Popup;