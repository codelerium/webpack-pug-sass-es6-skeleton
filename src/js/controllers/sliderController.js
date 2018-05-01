import Slider from "../modules/slider";
import moment from "moment";

const CLASS_SLIDER = 'slider';

class SliderController {
  init() {
    const sliders = Array.from(document.querySelectorAll(`.${CLASS_SLIDER}`));
    sliders.forEach((s) => new Slider({
      slider: s,
      start: moment("2018-01-01"),
      end: moment("2019-12-01"),
    }));
  }
}

export const sliderController = new SliderController();
