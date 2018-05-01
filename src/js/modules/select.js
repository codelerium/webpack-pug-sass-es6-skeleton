import {
  addAttribute,
  removeAttribute,
  hasClass,
  addClass,
  removeClass,
  toggleClass,
} from '../helpers/dom';

const CLASS_OPEN = 'select--open';
const CLASS_ACTIVE_OPTION = 'select__option--active';
const ATTR_SELECTED = 'selected';
const KEY_CODES_TOGGLE = [13, 32];
const KEY_CODES_NAVIGATION_NEXT = [39, 40];
const KEY_CODES_NAVIGATION_PREV = [37, 38];

export default class Select {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.defaultSelect = null;
    this.customSelect = null;
    this.length = null;
    this.optionValues = null;
    this.selected = 0;

    this.init();
  }

  init() {
    this.defaultSelect = this.wrapper.querySelector('select');
    this.defaultOptions = Array.from(this.defaultSelect.querySelectorAll('option'));
    this.customSelect = this.wrapper.querySelector('.select');
    this.customSelectMain = this.customSelect.querySelector('.select__head');
    this.customSelectOptions = Array.from(this.customSelect.querySelectorAll('.select__option'));
    this.length = this.defaultOptions.length;
    this.optionValues = this.defaultOptions.map(option => option.innerText);

    this.initBindings();
  }

  initBindings() {
    this.customSelect.addEventListener('click', this.toggleSelect.bind(this));
    this.customSelect.addEventListener('keydown', this.handleKeyUp.bind(this));
    this.customSelect.addEventListener('blur', this.closeSelect.bind(this));
    this.customSelectOptions.forEach((o, i) => o.addEventListener('click', this.onOptionSelect.bind(this, o, i)));
  }

  handleKeyUp(e) {
    if (KEY_CODES_TOGGLE.includes(e.keyCode)) {
      this.toggleSelect();
    }
    if (KEY_CODES_NAVIGATION_NEXT.includes(e.keyCode)) {
      e.preventDefault();
      this.next();
    }
    if (KEY_CODES_NAVIGATION_PREV.includes(e.keyCode)) {
      e.preventDefault();
      this.prev();
    }
  }

  closeSelect() {
    if (!hasClass(this.customSelect, CLASS_OPEN)) return;
    removeClass(this.customSelect, CLASS_OPEN);
  }

  toggleSelect() {
    toggleClass(this.customSelect, CLASS_OPEN);
  }

  onOptionSelect(el, ind) {
    removeAttribute(this.defaultOptions[this.selected], ATTR_SELECTED);
    removeClass(this.customSelectOptions[this.selected], CLASS_ACTIVE_OPTION);
    this.selected = ind;
    this.customSelectMain.innerText = this.optionValues[this.selected];
    addClass(this.customSelectOptions[this.selected], CLASS_ACTIVE_OPTION);
    addAttribute(this.defaultOptions[this.selected], ATTR_SELECTED);
  }

  prev() {
    if (this.selected === 0) return;
    removeAttribute(this.defaultOptions[this.selected], ATTR_SELECTED);
    removeClass(this.customSelectOptions[this.selected], CLASS_ACTIVE_OPTION);
    this.customSelectMain.innerText = this.optionValues[--this.selected];
    addClass(this.customSelectOptions[this.selected], CLASS_ACTIVE_OPTION);
    addAttribute(this.defaultOptions[this.selected], ATTR_SELECTED);
  }

  next() {
    if (this.selected === this.length - 1) return;
    removeAttribute(this.defaultOptions[this.selected], ATTR_SELECTED);
    removeClass(this.customSelectOptions[this.selected], CLASS_ACTIVE_OPTION);
    this.customSelectMain.innerText = this.optionValues[++this.selected];
    addClass(this.customSelectOptions[this.selected], CLASS_ACTIVE_OPTION);
    addAttribute(this.defaultOptions[this.selected], ATTR_SELECTED);
  }
}
