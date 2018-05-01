import { calcGradientSteps } from '../helpers/color';
import {addAttribute} from "../helpers/dom";

export default class ArticleCompare {
  constructor(options) {
    this.wrapper = options.wrapper;
    this.original = null;
    this.edited = null;
    this.stagesOriginal = null;
    this.stagesEdited = null;
    this.startColor = '#de1c66';
    this.endColor = '#27d5ff';
    this.colorSteps = calcGradientSteps(this.startColor, this.endColor, 7);
    console.log(this.colorSteps);

    this.init();
  }

  init() {
    this.original = this.wrapper.querySelector('.article-compare__original');
    this.edited = this.wrapper.querySelector('.article-compare__edited');
    this.stagesOriginal = Array.from(this.original.querySelectorAll('.article-compare-edits li'));
    this.stagesEdited = Array.from(this.edited.querySelectorAll('.article-compare-edits li'));
    this.stagesOriginal.forEach((item, i) => addAttribute(item, 'style', `background: ${this.colorSteps[i]}`));
    this.stagesEdited.forEach((item, i) => addAttribute(item, 'style', `background: ${this.colorSteps[i]}`));
    console.log(this);
  }
}