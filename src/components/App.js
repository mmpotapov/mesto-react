import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';

function App() {

  return (
    <div className="root__container">

      <Header />

      <Main />

      <Footer />

      <PopupWithForm />

      <template id="card">
        <li className="elements__card">
          <article className="element">
            <img className="element__photo" src="#" alt="" />
            <div className="element__footer">
              <h2 className="element__name"> </h2>
              <div className="element__like-container">
                <button type="button" className="element__like"></button>
                <p className="element__like-counter">0</p>
              </div>
            </div>
            <button type="button" className="element__delete" aria-label="Удалить"></button>
          </article>
        </li>
      </template>

      <div className="popup popup_type_photo">
        <div className="popup__container">
          <button type="button" className="popup__close" aria-label="Закрыть"></button>
          <figure className="popup__figure">
            <img className="popup__photo" src="#" alt="" />
            <figcaption className="popup__caption"></figcaption>
          </figure>
        </div>
      </div>

    </div>
  )
}

export default App;
