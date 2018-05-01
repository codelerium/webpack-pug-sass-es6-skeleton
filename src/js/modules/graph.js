import { setSVGAttribute } from '../helpers/svg';

export default class Graph {
  constructor(options) {
    this.data = options.data;
    this.graph = options.graph;
    this.graphLine = null;
    this.ranges = [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000, 50000000];
    this.init();
  }

  init() {
    this.graphLine = this.graph.querySelector('[data-polyline]');
    this.grapRangeCeiling = this.graph.querySelector('[data-range-end]');

    this.generateLine(Array.from({ length: this.data.length }).map(v => ({ timestamp: '', value: 0 })));
    setTimeout(() => {
      this.generateLine(this.data);
    }, 500);
  }

  generateLine(data) {
    const startX = 42.9;
    const endX = 379;
    const length = data.length - 1;
    const step = (endX - startX) / length;

    const maxY = data.reduce((result, point) => {
      result = point.value > result ? point.value : result;
      return result;
    }, (data[0] || {}).value || 0);

    const ceiling = this.ranges.find(val => val > maxY);
    const points = data.reduce((result, point, index) => {
      result += `${startX + step * index},${(120 - (point.value / ceiling * 120)) + 10} `;
      return result;
    }, 'M');

    setSVGAttribute(this.graphLine, 'd', points);
    this.setCeiling(ceiling);
  }

  setCeiling(ceiling) {
    this.grapRangeCeiling.innerHTML = ceiling.toString();
    const height = this.grapRangeCeiling.getBoundingClientRect().height;
    setSVGAttribute(this.grapRangeCeiling, 'transform', `matrix(0 -1 1 0 11.9844 ${height})`);
  }
}