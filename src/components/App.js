import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  /** Хуки для изменения состояние попапов (открыт/не открыт) */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isOpenImagePopupOpen, setIsOpenImagePopupOpen] = useState(false);
  /** Хук для объекта карточки */
  const [selectedCard, setSelectedCard] = useState({});

  /** Открыть попап изменения профиля (изменить переменную состояния на true) */
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  /** Открыть попап изменения аватара */
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  /** Открыть попап добавления карточки */
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  /** Открыть попап картинки + изменить объект карточки */
  const handleCardClick = (cardObject) => {
    setIsOpenImagePopupOpen(true);
    setSelectedCard(cardObject);
  }

  /** Закрыть любой попап (изменить переменную состояния попапа на false)*/
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsOpenImagePopupOpen(false);
  }




  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);



  /** Хук эффектов с изменением данных о профиле и загрузкой изображений */
  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([profileInfo, cardList]) => {
        setCurrentUser(profileInfo);
        setCards(cardList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])




  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}/>
        <Footer />
        <PopupWithForm
          title="Редактировать профиль"
          name="profile"
          submitButton="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <input type="text" name="name" className="popup__input popup__input_value_name" id="name-input" required
            placeholder="Имя" minLength="2" maxLength="40" />
          <span className="popup__error name-input-error"></span>
          <input type="text" name="profession" className="popup__input popup__input_value_profession"
            placeholder="О себе" id="profession-input" required minLength="2" maxLength="200" />
          <span className="popup__error profession-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          title="Новое место"
          name="card"
          submitButton="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <input type="text" name="place" className="popup__input popup__input_value_place" required
            placeholder="Название" id="place-input" minLength="2" maxLength="20" />
          <span className="popup__error place-input-error"></span>
          <input type="url" name="link" className="popup__input popup__input_value_link" required
            id="link-input" placeholder="Ссылка на изображение" />
          <span className="popup__error link-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          submitButton="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <input type="url" name="avatar" className="popup__input popup__input_value_avatar" required
            placeholder="Ссылка" id="avatar-input" />
          <span className="popup__error avatar-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          title="Вы уверены?"
          name="delete"
          submitButton="Да" />
        <ImagePopup
          isOpen={isOpenImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
