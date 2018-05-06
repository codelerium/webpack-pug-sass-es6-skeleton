import Graph from "../modules/graph";

const CLASS_GRAPH = 'graph';
const data = [
  { timestamp: '', value: 123 },
  { timestamp: '', value: 10 },
  { timestamp: '', value: 250 },
  { timestamp: '', value: 23 },
  { timestamp: '', value: 380 },
  { timestamp: '', value: 234 },
  { timestamp: '', value: 213 },
  { timestamp: '', value: 12 },
  { timestamp: '', value: 90 },
  { timestamp: '', value: 123 },
  { timestamp: '', value: 31 },
];

class GraphController {
  init() {
    const sliders = Array.from(document.querySelectorAll(`.${CLASS_GRAPH}`));
    sliders.forEach((g) => new Graph({
      graph: g,
      lines: 12,
      data,
    }));
  }
}

export const graphController = new GraphController();
