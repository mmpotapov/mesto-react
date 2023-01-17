import {useEffect, useState, useContext} from 'react';
import {api} from '../utils/Api.js'
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);
  /** Хук для массива карточек с сервера */
  const [cards, setCards] = useState([]);


  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__account">
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля" />
          <button className="profile__avatar-edit" aria-label="Изменить фото" onClick={props.onEditAvatar}></button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit" aria-label="Редактировать" onClick={props.onEditProfile}></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__button-add" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Галерея мест">
        <ul className="elements__list">
          {cards.map((card) => {
            return <Card card={card} onCardClick={props.onCardClick} key={card._id}/>
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;
