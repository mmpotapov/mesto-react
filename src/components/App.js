import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const handleEditProfileClick = () => {
    // document.querySelector('.popup_type_profile').classList.add('popup_opened');
    setIsEditProfilePopupOpen(true);
    }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }


  return (
    <div className="root__container">


      <Header />

      <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick}/>

      <Footer />

      <PopupWithForm title="Редактировать профиль" name="profile" submitButton="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input type="text" name="name" className="popup__input popup__input_value_name" id="name-input" required
          placeholder="Имя" value="Имя" minlength="2" maxlength="40" />
        <span className="popup__error name-input-error"></span>
        <input type="text" name="profession" className="popup__input popup__input_value_profession" placeholder="О себе"
          id="profession-input" value="О себе" required minlength="2" maxlength="200" />
        <span className="popup__error profession-input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="card" submitButton="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" name="place" className="popup__input popup__input_value_place" required placeholder="Название"
          id="place-input" minlength="2" maxlength="20" />
        <span className="popup__error place-input-error"></span>
        <input type="url" name="link" className="popup__input popup__input_value_link" required id="link-input"
          placeholder="Ссылка на изображение" />
        <span className="popup__error link-input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Обновить аватар" name="avatar" submitButton="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="url" name="avatar" className="popup__input popup__input_value_avatar" required placeholder="Ссылка"
          id="avatar-input" />
        <span className="popup__error avatar-input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="delete" submitButton="Да" />


      <ImagePopup />



    </div>
  )
}

export default App;
