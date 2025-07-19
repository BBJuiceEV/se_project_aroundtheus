import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(data) {
    this._popupElement.querySelector(".modal__image").src = data.link;
    this._popupElement.querySelector(".modal__image").alt = data.name;
    this._popupElement.querySelector(".modal__view_image-title").textContent =
      data.name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}

//index.js
//const newCardPopup = new PopupWithForm("#add-card-modal", (handleFormSubmit) => {});
