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
         <img className="card__image" src={props.link} alt={props.title}/>
      </div>
      <div className="card__info">
         <h2 className="card__title">{props.name}</h2>
      </div>
      isOwn && <button className="card__remove" type="button" onClick={handleDeleteClick}/>
   </li>
   );
}

export default Card