export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._modals = document.querySelectorAll(".modal");
  }

  open() {
    //opens popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    //close popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(evt) {
    //listens for Esc button
    if (evt.key === "Escape") {
      evt.preventDefault();
      this.close();
    }
  }

  _handleModalClose = (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal_opened")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    //sets events listeners
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });

    this._popupElement.addEventListener("mousedown", this._handleModalClose);
  }
}
