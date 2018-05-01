import Select from '../modules/select';

const CLASS_SELECT_WRAPPER = 'selectWrapper';

class SelectController {
  init() {
    const selectWrappers = Array.from(document.querySelectorAll(`.${CLASS_SELECT_WRAPPER}`));
    selectWrappers.forEach(s => new Select(s));
  }
}

export const selectController = new SelectController();