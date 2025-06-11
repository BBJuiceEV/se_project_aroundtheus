export default class Card {
  constructor(data, cardSelector, openModal) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._modalOpen = openModal;
  }

  _setEventListeners() {
    //"#view-image-modal"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });

    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick() {
    document.querySelector(".modal__image").src = this._link;
    document.querySelector(".modal__image").alt = this._name;
    document.querySelector(".modal__view_image-title").textContent = this._name;
    this._modalOpen(document.querySelector("#view-image-modal"));
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
