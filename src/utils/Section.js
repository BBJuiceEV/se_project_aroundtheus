class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this.classSelector = classSelector;
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
