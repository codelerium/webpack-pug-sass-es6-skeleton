import { addAttribute, addClass} from "../helpers/dom";

const MODIFIED_FIBONACCHI_GROUPRANGES = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

export default class BoxChart {
  constructor(options) {
    this.wrapper = options.wrapper;
    this.data = options.data;
    this.sum = this.data.reduce((acc, item) => { acc += item.edit; return acc }, 0);
    this.groups = null;

    this.init();
  }

  init() {
    const groups = [];
    let groupPlacesIndex = 0;
    let groupPlaces = MODIFIED_FIBONACCHI_GROUPRANGES[groupPlacesIndex];
    for (let i = 0; i < this.data.length; i++) {
      if (!groups[groupPlacesIndex]) {
          groups[groupPlacesIndex] = [];
      }
      if (groupPlaces > groups[groupPlacesIndex].length) {
        groups[groupPlacesIndex].push(Object.assign(this.data[i], { colIndex: i }));
      } else {
        groupPlacesIndex++;
        groupPlaces = MODIFIED_FIBONACCHI_GROUPRANGES[groupPlacesIndex];
        groups[groupPlacesIndex] = [];
        groups[groupPlacesIndex].push(Object.assign(this.data[i], { colIndex: i }));
      }
    }

    if(groups[groups.length - 1].length < groups[groups.length - 2].length) {
      groups[groups.length - 2] = [
        ...groups[groups.length - 2],
        ...groups[groups.length - 1]
      ];
      groups.length--;
    }

    this.groups = groups;
    this.generateChart();
  }

  generateChart() {
    const res = this.groups.map(group => {
      const rowValue = group.reduce((acc, item) => { acc += item.edit; return acc }, 0);
      return {
        columns: group.map(item => Object.assign(item, { colProportion: item.edit / rowValue })),
        rowProportion: rowValue / this.sum,
      };
    });
    console.log(res);

    res.forEach((group, ind) => {
      const row = document.createElement('div');
      addClass(row, 'box-chart__row');
      addAttribute(row, 'style', `height: ${group.rowProportion * 100}%`);

      group.columns.forEach(col => {
        const colEl = document.createElement('div');
        addClass(colEl, 'box-chart__col');
        addClass(colEl, `color--${col.color}`);
        addAttribute(colEl, 'style', `background: currentColor; width: ${col.colProportion * 100}%`);


        const textEl = document.createElement('div');
        addClass(textEl, 'box-chart__text');
        textEl.innerHTML = `${col.colIndex + 1}.`;
        if (ind < 2) {
          const textNameEl = document.createElement('span');
          textNameEl.innerHTML = ` ${col.name}`;
          textEl.appendChild(textNameEl);
        }

        colEl.appendChild(textEl);
        row.appendChild(colEl);
      });

      this.wrapper.appendChild(row);
    });
    console.log(res);
  }
}
