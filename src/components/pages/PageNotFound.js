import React from "react";
import image404 from "../../images/20824303_6358473-transformed.png";

function PageNotFound() {
   return(
   <div className="page">
      <main className="content">
         <div className="page-not-found">
            <h2 className="authentication__title">Тут ничего нет 0_0</h2>
            <img className="page-not-found__image" src={image404} />
         </div>
      </main>
   </div>
   );
}

export default PageNotFound;