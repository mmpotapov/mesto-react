import React from 'react';
import { api } from '../utils/Api.js'
import Card from './Card';


function Main(props) {

  /** Хуки для изменения информации о профиле */
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  /** Хук для массива карточек с сервера */
  const [cards, setCards] = React.useState([]);


  /** Хук эффектов с изменением данных о профиле и загрузкой изображений */
  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([profileInfo, cardList]) => {
      setUserName(profileInfo.name);
      setUserDescription(profileInfo.about);
      setUserAvatar(profileInfo.avatar);
      setCards(cardList);
    })
    .catch((err) => {
      console.log(err);
    });
  })


  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__account">
          <img className="profile__avatar" src={userAvatar} alt="Фото профиля" />
          <button className="profile__avatar-edit" aria-label="Изменить фото" onClick={props.onEditAvatar}></button>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" className="profile__edit" aria-label="Редактировать" onClick={props.onEditProfile}></button>
            <p className="profile__profession">{userDescription}</p>
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
