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
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const deleteCardBtn = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;

  //add click listener to card image element
  //openModal with previewImageModal

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_active");
  });
  deleteCardBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(imageViewModal);
    imageViewImgEl.src = cardData.link;
    imageViewImgEl.alt = cardData.name;
    imageViewTitleEl.textContent = cardData.name;
  });

  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
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

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
