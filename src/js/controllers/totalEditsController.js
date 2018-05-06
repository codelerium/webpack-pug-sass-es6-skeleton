import TotalEdits from "../modules/total-edits";

const ATTR_TOTAL_EDITS = 'data-total-edits';

class TotalEditsController {
  init() {
    const charts = Array.from(document.querySelectorAll(`[${ATTR_TOTAL_EDITS}]`));
    charts.forEach((el) => new TotalEdits({
      wrapper: el,
    }));
  }
}

export const totelEditsController = new TotalEditsController();
