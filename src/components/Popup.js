import {useEffect} from "react";

const Popup = ({ isOpen, name, onClose, children, popupContainer, popupContainerAdd,popupClass,classAdd}) => {

   useEffect(() => {
      if (!isOpen) return;

      const closeByEscape = (e) => {
         if (e.key === 'Escape') {
            onClose()
         }
      }

      document.addEventListener('keyup', closeByEscape)
   }, [isOpen, onClose])

   const handleOverlay = (e) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   }
   return (
   <div className={`popup popup_type_${name} ${classAdd} ${isOpen ? "popup_opened" : ""} ${popupClass}`} onMouseDown={handleOverlay}>
      <div className={`${popupContainer} ${popupContainerAdd}`}>
         {children}
         <button className="popup__close-button" type="button" onClick={onClose} />
      </div>
   </div>
   );
};

export default Popup;