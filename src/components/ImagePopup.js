function ImagePopup() {
  return (
    <div className="popup popup_type_photo">
      <div className="popup__container">
        <button type="button" className="popup__close" aria-label="Закрыть"></button>
        <figure className="popup__figure">
          <img className="popup__photo" src="#" alt="" />
          <figcaption className="popup__caption"></figcaption>
        </figure>
      </div>
    </div>)
}

export default ImagePopup;
