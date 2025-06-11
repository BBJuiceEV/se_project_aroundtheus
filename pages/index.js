import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
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
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscKey);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscKey);
}

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
  const card = new Card(cardData, "#card-template", openModal);
  const cardGetView = card.getView();
  cardListEl.append(cardGetView);
});

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
  const card = new Card(cardData, "#card-template", openModal);
  cardListEl.prepend(card.getView());
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  closeModal(addCardModal);

  const submitBtn = addCardFormElement.querySelector(
    config.submitButtonSelector
  );
  disableButton(submitBtn, config);
}

const handleEscEvent = (evt, action) => {
  const activeModal = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    action(activeModal);
  }
};
const handleEscKey = (evt) => {
  evt.preventDefault();
  handleEscEvent(evt, closeModal);
};
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//* Profile Edit
profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileModalCloseBtn.addEventListener("click", () =>
  closeModal(profileEditModal)
);

//* add new card
addNewCardBtn.addEventListener("click", () => openModal(addCardModal));
addNewCardModalCloseBtn.addEventListener("click", () =>
  closeModal(addCardModal)
);
//*
imageViewCloseBtn.addEventListener("click", () => {
  closeModal(imageViewModal);
});

// close modal when clicking on the overlay
const handleModalClose = (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal_opened")
  ) {
    closeModal(evt.currentTarget);
  }
};
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleModalClose);
});
