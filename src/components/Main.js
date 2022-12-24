function Main() {
  return (
    <main className="content">
        <section className="profile" aria-label="Профиль">
          <div className="profile__account">
            <img className="profile__avatar" src="#" alt="Фото профиля" />
            <button className="profile__avatar-edit" aria-label="Изменить фото"></button>
            <div className="profile__info">
              <h1 className="profile__name"> </h1>
              <button type="button" className="profile__edit" aria-label="Редактировать"></button>
              <p className="profile__profession"></p>
            </div>
          </div>
          <button type="button" className="profile__button-add" aria-label="Добавить"></button>
        </section>

        <section className="elements" aria-label="Галерея мест">
          <ul className="elements__list">
          </ul>
        </section>

      </main>
  )
}

export default Main;
