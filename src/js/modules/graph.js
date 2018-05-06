import { setSVGAttribute } from '../helpers/svg';
const AXIS_Y = { x: 19.4, y: 0 };
const AXIS_ORIG0 = { x: 19.4, y: 143.6 };

export default class Graph {
  constructor(options) {
    this.data = options.data;
    this.graph = options.graph;
    this.lines = options.lines;
    this.graphLine = null;
    this.graphWidth = null;
    this.ranges = [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000, 50000000];
    this.init();
  }

  init() {
    this.graphLine = this.graph.querySelector('[data-polyline]');
    this.grapRangeCeiling = this.graph.querySelector('[data-range-end]');
    this.axisLine = this.graph.querySelector('[data-axis]');
    this.axisRanges = this.graph.querySelector('[data-axis-lines]');
    this.graphWidth = this.graph.getBoundingClientRect().width;

    this.initAxis();
    this.initAxisRanges();
    this.initDefaultGraph();
    setTimeout(() => { this.updateGraph(this.data) }, 500);
    this.initBindings();
  }

  initBindings() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this.graphWidth = this.graph.getBoundingClientRect().width;
    this.initAxis();
    this.initAxisRanges();
    this.updateGraph();
  }

  initAxis() {
    const points = `${AXIS_Y.x},${AXIS_Y.y} ${AXIS_ORIG0.x},${AXIS_ORIG0.y} ${this.graphWidth},${AXIS_ORIG0.y}`;
    setSVGAttribute(this.axisLine, 'points', points);
  }

  initAxisRanges() {
    const startX = AXIS_Y.x;
    const endX = this.graphWidth;
    const step = (endX - startX) / this.lines;
    const lineTpl = x => `<line class="line" x1="${x}" y1="143.6" x2="${x}" y2="137.1"></line>`;
    this.axisRanges.innerHTML = Array.from({ length: this.lines }).map((l, i) => lineTpl((startX - 2) + (i + 1) * step)).join('');
  }

  initDefaultGraph() {
    this.generateLine(Array.from({ length: this.data.length }).map(v => ({ timestamp: '', value: 0 })));
  }

  updateGraph() {
    setTimeout(() => {
      this.generateLine(this.data);
    }, 500);
  }

  generateLine(data) {
    const offsX = (this.graphWidth - AXIS_Y.x - 2) / this.lines;
    const startX = AXIS_Y.x;
    const endX = this.graphWidth - (offsX * 2);
    const length = data.length - 1;
    const step = (endX - startX) / length;

    const maxY = data.reduce((result, point) => {
      result = point.value > result ? point.value : result;
      return result;
    }, (data[0] || {}).value || 0);

    const ceiling = this.ranges.find(val => val > maxY);
    const points = data.reduce((result, point, index) => {
      result += `${startX + offsX + step * index},${(120 - (point.value / ceiling * 120)) + 10} `;
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