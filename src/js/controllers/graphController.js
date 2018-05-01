import Graph from "../modules/graph";

const CLASS_SLIDER = 'graph';
const data = [
  { timestamp: '', value: 123 },
  { timestamp: '', value: 10 },
  { timestamp: '', value: 340 },
  { timestamp: '', value: 23 },
  { timestamp: '', value: 345 },
  { timestamp: '', value: 234 },
  { timestamp: '', value: 213 },
  { timestamp: '', value: 12 },
  { timestamp: '', value: 90 },
  { timestamp: '', value: 123 },
  { timestamp: '', value: 121 },
  { timestamp: '', value: 31 },
  { timestamp: '', value: 54 },
  { timestamp: '', value: 190 },
];

class GraphController {
  init() {
    const sliders = Array.from(document.querySelectorAll(`.${CLASS_SLIDER}`));
    sliders.forEach((g) => new Graph({
      graph: g,
      data,
    }));
  }
}

export const graphController = new GraphController();
