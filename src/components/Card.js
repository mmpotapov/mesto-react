function Card(props) {
  return (
    <li className="elements__card" key={props.card._id}>
      <article className="element">
        <img className="element__photo" src={props.card.link} alt="" />
        {console.log(props.card.link)}
        <div className="element__footer">
          <h2 className="element__name">{props.card.name}</h2>
          <div className="element__like-container">
            <button type="button" className="element__like"></button>
            <p className="element__like-counter">{props.card.likes.length}</p>
          </div>
        </div>
        <button type="button" className="element__delete" aria-label="Удалить"></button>
      </article>
    </li>)
}

export default Card;