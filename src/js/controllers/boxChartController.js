import BoxChart from "../modules/box-chart";

const CLASS_SLIDER = 'box-chart';
const data = [{ 'color': 'origo', 'name': 'origo.hu', 'edit': 600 }, { 'color': 'pestisracok', 'name': 'pestisracok.hu', 'edit': 241}, { 'color': '888', 'name': '888.hu', 'edit': 156 }, { 'color': 'index', 'name': 'index.hu', 'edit': 89}, { 'color': '444', 'name': '444.hu', 'edit': 80 }, { 'color': 'orosz', 'name': 'orosz.hu', 'edit': 76}, { 'color': 'fidesz', 'name': 'fidesz.hu', 'edit': 40 }];

class BoxChartController {
  init() {
    const charts = Array.from(document.querySelectorAll(`.${CLASS_SLIDER}`));
    charts.forEach((c) => new BoxChart({
      wrapper: c,
      data,
    }));
  }
}

export const boxChartController = new BoxChartController();
