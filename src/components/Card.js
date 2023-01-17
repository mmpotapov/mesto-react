import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(function (element) { return element._id === currentUser._id })

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="elements__card">
      <article className="element">
        <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
        <div className="element__footer">
          <h2 className="element__name">{props.card.name}</h2>
          <div className="element__like-container">
            <button type="button" className={`element__like ${isLiked && "element__like_active"}`}></button>
            <p className="element__like-counter">{props.card.likes.length}</p>
          </div>
        </div>
        {isOwn && <button type="button" className="element__delete" aria-label="Удалить"></button>}
      </article>
    </li>)
}

export default Card;
