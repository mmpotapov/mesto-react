function Main() {

  const handleEditProfileClick = () => {
    document.querySelector('.popup_type_profile').classList.add('popup_opened');
  }

  const handleEditAvatarClick = () => {
    document.querySelector('.popup_type_avatar').classList.add('popup_opened');
  }

  const handleAddPlaceClick = () => {
    document.querySelector('.popup_type_card').classList.add('popup_opened');
  }

  return (
    <main className="content">
        <section className="profile" aria-label="Профиль">
          <div className="profile__account">
            <img className="profile__avatar" src="#" alt="Фото профиля" />
            <button className="profile__avatar-edit" aria-label="Изменить фото" onClick={handleEditAvatarClick}></button>
            <div className="profile__info">
              <h1 className="profile__name"> </h1>
              <button type="button" className="profile__edit" aria-label="Редактировать" onClick={handleEditProfileClick}></button>
              <p className="profile__profession"></p>
            </div>
          </div>
          <button type="button" className="profile__button-add" aria-label="Добавить" onClick={handleAddPlaceClick}></button>
        </section>

        <section className="elements" aria-label="Галерея мест">
          <ul className="elements__list">
          </ul>
        </section>

      </main>
  )
}

export default Main;
