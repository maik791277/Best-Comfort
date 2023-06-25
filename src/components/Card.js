function Card(props) {

   function handleClick() {
      props.onCardClick(props.card);
   }

   function handleDeleteClick() {
      props.onCardDelet(props.card)
   }

   return (
   <li className="card">
      <div className="card__image-block">
         <button className="card__image-button" type="button" onClick={handleClick}/>
         {props.images && props.images.length > 0 && <img className="card__image" src={"http://127.0.0.1:5000" + props.images[0].url} alt={props.title}/>}
      </div>
      <div className="card__info">
         <h2 className="card__title">{props.name}</h2>
      </div>
      isOwn && <button className="card__remove" type="button" onClick={handleDeleteClick}/>
   </li>
   );
}

export default Card