import moment from 'moment';

export default class Slider {
  constructor(options) {
    this.slider = options.slider;
    this.rangeStart = options.start;
    this.rangeEnd = options.end;
    this.monthsInRange = this.rangeEnd.diff(this.rangeStart, 'months');
    this.rangeStartControl = null;
    this.rangeEndControl = null;
    this.isRangeStartActive = false;
    this.isRangeEndActive = false;
    this.sliderWidth = this.slider.clientWidth;
    this.fromLeft = 0;
    this.fromRight = 0;
    this.init();
  }

  init() {
    this.rangeStartControl = this.slider.querySelector('.slider__current-range-start');
    this.rangeEndControl = this.slider.querySelector('.slider__current-range-end');
    this.rangeStartControlText = this.rangeStartControl.querySelector('span');
    this.rangeEndControlText = this.rangeEndControl.querySelector('span');
    this.sliderBar = this.slider.querySelector('.slider__bar');
    this.currentBar = this.slider.querySelector('.slider__current-bar');
    this.initBindings();
  }

  initBindings() {
    this.rangeStartControl.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.rangeEndControl.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
  };

  handleMouseDown(e) {
    if (this.fromLeft === this.sliderWidth && this.fromRight === 0) {
      this.isRangeStartActive = true;
      return;
    }
    if (e.target === this.rangeStartControl) {
      if (this.isRangeStartActive) return;
      this.isRangeStartActive = true;
    }
    if (e.target === this.rangeEndControl) {
      if (this.isRangeEndActive) return;
      this.isRangeEndActive = true;
    }
  }

  handleMouseMove(e) {
    e.preventDefault();
    const sliderLeft = this.sliderBar.getBoundingClientRect().left;
    let currentX = e.clientX - sliderLeft;

    if (this.isRangeStartActive && currentX + this.fromRight >= this.sliderWidth) {
      currentX = this.sliderWidth - this.fromRight;
    }
    if (this.isRangeEndActive && this.fromLeft - currentX >= 0) {
      currentX = this.fromLeft;
    }
    if (currentX > this.sliderWidth) currentX = this.sliderWidth;
    if (currentX < 0) currentX = 0;

    if (this.isRangeStartActive) {
      this.fromLeft = currentX;
      this.currentBar.style.left = `${this.fromLeft}px`;
      const proportion = this.fromLeft / this.sliderWidth;
      const months = Math.round(this.monthsInRange * proportion);
      this.rangeStartControlText.innerText = moment(this.rangeStart).add(months, 'months').format('‘YY.MM');
    }
    if (this.isRangeEndActive) {
      this.fromRight = this.sliderWidth - currentX;
      this.currentBar.style.right = `${this.fromRight}px`;
      const proportion = this.fromRight / this.sliderWidth;
      const months = Math.round(this.monthsInRange * proportion);
      this.rangeEndControlText.innerText = moment(this.rangeEnd).subtract(months, 'months').format('‘YY.MM');
    }
  }

  handleMouseUp() {
    if (!this.isRangeStartActive && !this.isRangeEndActive) return;
    this.isRangeStartActive = false;
    this.isRangeEndActive = false;
  }
}