import { addAttribute } from "../helpers/dom";

export default class TotalEdits {
  constructor(options) {
    this.wrapper = options.wrapper;
    this.init();
  }

  init() {
    this.total = this.wrapper.querySelector('[data-total]');
    this.edited = this.wrapper.querySelector('[data-edited]');
    this.totalNum = this.total.getAttribute('data-total');
    this.editedNum = this.edited.getAttribute('data-edited');

    this.initChart();
  }

  initChart() {
    const sum = parseInt(this.totalNum, 10) + parseInt(this.editedNum, 10);
    addAttribute(this.total, 'style', `flex: 0 0 ${this.totalNum / sum * 100}%`);
    addAttribute(this.edited, 'style', `flex: 0 0 ${this.editedNum / sum * 100}%`);
  }
}
