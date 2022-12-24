function PopupWithForm() {
  return (
    <>
      <div className="popup popup_type_profile">
        <div className="popup__container">
          <button type="button" className="popup__close" aria-label="Закрыть"></button>
          <form className="popup__form" name="profile-form" novalidate>
            <h2 className="popup__header">Редактировать профиль</h2>
            <input type="text" name="name" className="popup__input popup__input_value_name" id="name-input" required
              placeholder="Имя" value="Имя" minlength="2" maxlength="40" />
            <span className="popup__error name-input-error"></span>
            <input type="text" name="profession" className="popup__input popup__input_value_profession" placeholder="О себе"
              id="profession-input" value="О себе" required minlength="2" maxlength="200" />
            <span className="popup__error profession-input-error"></span>
            <button type="submit" className="popup__save">Сохранить</button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_card">
        <div className="popup__container">
          <button type="button" className="popup__close" aria-label="Закрыть"></button>
          <form className="popup__form" name="profile-form" novalidate>
            <h2 className="popup__header">Новое место</h2>
            <input type="text" name="place" className="popup__input popup__input_value_place" required placeholder="Название"
              id="place-input" minlength="2" maxlength="20" />
            <span className="popup__error place-input-error"></span>
            <input type="url" name="link" className="popup__input popup__input_value_link" required id="link-input"
              placeholder="Ссылка на изображение" />
            <span className="popup__error link-input-error"></span>
            <button type="submit" className="popup__save popup__save_disabled" disabled>Создать</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_delete">
        <div className="popup__container">
          <button type="button" className="popup__close" aria-label="Закрыть"></button>
          <form className="popup__form" name="delete-form">
            <h2 className="popup__header">Вы уверены?</h2>
            <button type="submit" className="popup__save">Да</button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_avatar">
        <div className="popup__container">
          <button type="button" className="popup__close" aria-label="Закрыть"></button>
          <form className="popup__form" name="avatar-form" novalidate>
            <h2 className="popup__header">Обновить аватар</h2>
            <input type="url" name="avatar" className="popup__input popup__input_value_avatar" required placeholder="Ссылка"
              id="avatar-input" />
            <span className="popup__error avatar-input-error"></span>
            <button type="submit" className="popup__save">Сохранить</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PopupWithForm;
