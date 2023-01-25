import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

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

  /** Закрыть любой попап (изменить переменную состояния попапа на false) */
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsOpenImagePopupOpen(false);
  }





  /** Стейты для данных о профиле и списка карточек */
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  /** Хук эффектов с запросом данных о профиле и массива карточек */
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

  /** Функция-реакция нажатия на лайк */
  function handleCardLike(card) {
    /** Буль: среди людей, поставивших лайк, есть текущий пользователь? */
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    /** Если лайка не было, то отправь на сервер запрос на его проставление */
    if (!isLiked) {
      api.addLike(card._id)
        .then((updatedCard) => {
          setCards((cardList) =>
            /** Проверка, с какой карточкой из списка мы взаимодействовали; какую подменить и отдать setCards видоизменённый массив*/
            cardList.map((c) => (c._id === card._id ? updatedCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
      /** Если лайка был, то отправь на сервер запрос на его удаление */
    } else {
      api.deleteLike(card._id)
        .then((updatedCard) => {
          setCards((cardList) =>
            cardList.map((c) => (c._id === card._id ? updatedCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  /** Функция-реакция нажатия на корзину */
  function handleCardDelete(card) {
    /** Отправь на сервер запрос на удаление этой карточки */
    api.deleteCard(card._id)
      /** Перерисовка: отфильтровать карточку, с которой взаимодействовали*/
      .then(() => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? '' : c)
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** Функция-реакция на submit формы редактирования профиля */
  function handleUpdateUser(inputs) {
    /** Отправь на сервер новую информацию о юзере */
    api.editProfile(inputs.name, inputs.about)
      .then((res) => {
        /** Изменить контекст текущего пользователя */
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      /** Закрыть попап с изменением инфо */
      .finally(() => {
        closeAllPopups();
      });;
  }

  /** Функция-реакция на submit формы обновления аватара */
  function handleUpdateAvatar(link) {
    api.editAvatar(link)
      .then((res) => {
        /** Изменить контекст текущего пользователя */
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      /** Закрыть попап с изменением аватара */
      .finally(() => {
        closeAllPopups();
      });;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root__container">
        {/** Главная страница */}
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards} />
        <Footer />

        {/** Попапы */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
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
