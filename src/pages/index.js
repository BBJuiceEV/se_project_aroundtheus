import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import UserInfo from "../utils/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

const initialCards = [
  {
    title: "Yosemite Valley",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Wrappers
const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const imageViewModal = document.querySelector("#view-image-modal");

// Buttons and Other DOM Nodes
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileModalCloseBtn = profileEditModal.querySelector(
  "#profile-modal-close-button"
);
const addNewCardBtn = document.querySelector("#profile-add-button");
const addNewCardModalCloseBtn = addCardModal.querySelector(
  "#add-card-modal-close-button"
);
const likeBtn = document.querySelector(".card__like-button");
const deleteCardBtn = document.querySelector(".card__delete-button");
const imageViewCloseBtn = imageViewModal.querySelector(
  "#view-image-modal-close-button"
);

// Form Data
const profileNameInput = document.querySelector("#edit-profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#edit-profile-description-input"
);
const cardTitleInput = addCardFormElement.querySelector(
  "#add-card-title-input"
);
const cardUrlInput = addCardFormElement.querySelector("#add-card-url-input");
const imageViewTitleEl = imageViewModal.querySelector(
  "#view-image-modal-title"
);
const imageViewImgEl = imageViewModal.querySelector("#view-image-modal-pic");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

const formCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
formCardPopup.setEventListeners();

const formProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
formProfilePopup.setEventListeners();

const imagePopup = new PopupWithImage("#view-image-modal");
imagePopup.setEventListeners();

const renderCard = (data) => {
  const card = new Card(
    data,
    "#card-template",
    imagePopup.open.bind(imagePopup)
  );
  const cardGetView = card.getView();
  cardListEl.prepend(cardGetView);
};

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileFormElement
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
  //FormValidator.resetValidation()
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
//editFormValidator.resetValidation();
//addFormValidator.resetValidation();

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

function handleProfileEditSubmit() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  formProfilePopup.close();
}
function handleAddCardFormSubmit(data) {
  renderCard(data);
  formCardPopup.close();

  /* const submitBtn = addCardFormElement.querySelector(
    validationSettings.submitButtonSelector
  );
  disableButton(submitBtn, config);*/
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//* Profile Edit
profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  formProfilePopup.open();
});

//* add new card
addNewCardBtn.addEventListener("click", () => formCardPopup.open());
/*imageViewCloseBtn.addEventListener("click", () => {
  imagePopup.close();
});*/

// close modal when clicking on the overlay
