class Search {
  init() {
    this.wrapper = document.querySelector('.search');
    this.input = this.wrapper.querySelector('input');
    this.select = this.wrapper.querySelector('.select');
    this.stealthEditor = this.wrapper.querySelector('.search__header img');

    this.initBindings()
  }

  initBindings() {
    this.input.addEventListener('focus', this.handleSearchInteraction.bind(this));
    this.select.addEventListener('focus', this.handleSearchInteraction.bind(this));
  }

  handleSearchInteraction() {
    this.stealthEditor.src = '/images/FIG_02.png';
  }
}

export const search = new Search();