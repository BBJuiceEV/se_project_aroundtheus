export default class Section {
  constructor(items, renderer, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this.classSelector = classSelector;
    this._container = document.querySelector(classSelector);
  }
  renderItems() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }
  addItem(item) {
    const renderer = this._renderer(item);
    this._container.append(renderer);
  }
}

export const initialCards = [
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
