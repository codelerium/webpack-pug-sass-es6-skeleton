import {addAttribute, addClass, removeClass} from "../helpers/dom";

const MODIFIED_FIBONACCHI_GROUPRANGES = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

export default class BoxChart {
  constructor(options) {
    this.wrapper = options.wrapper;
    this.boxChart = null;
    this.boxChartTableRows = null;
    this.boxChartColumns = null;
    this.data = options.data;
    this.sum = this.data.reduce((acc, item) => { acc += item.edit; return acc }, 0);
    this.groups = null;

    this.init();
  }

  init() {
    this.boxChart = this.wrapper.querySelector('.box-chart__wrapper');
    this.boxChartTable = this.wrapper.querySelector('.table');
    this.boxChartTableRows = Array.from(this.boxChartTable.querySelectorAll('.table__row'));

    this.adjustHeight();
    this.transformChartData();
    this.generateChart();
    this.initBindings();
  }

  adjustHeight() {
    const tableHeight = this.boxChartTable.clientHeight;
    addAttribute(this.boxChart, 'style', `height: ${tableHeight + 3}px`);
  }

  initBindings() {
    this.boxChartColumns = Array.from(this.boxChart.querySelectorAll('[data-ranking-column]'));
    this.boxChartTableRows.forEach(tableRow => {
      tableRow.addEventListener('mouseenter', () => {
        this.boxChartColumns.forEach(column => {
          removeClass(column, 'box-chart__col--active');
        });
        const currentItem = tableRow.getAttribute('data-table-color');
        const correspondingColumn = this.boxChartColumns.find(col => col.getAttribute('data-ranking-column') === currentItem);
        addClass(correspondingColumn, 'box-chart__col--active');
      });

      tableRow.addEventListener('mouseleave', () => {
        this.boxChartColumns.forEach(column => {
          removeClass(column, 'box-chart__col--active');
        });
      });
    });

    this.boxChartColumns.forEach(column => {
      column.addEventListener('mouseenter', () => {
        this.boxChartTableRows.forEach(tableRow => {
          removeClass(tableRow, 'table__row--active');
        });
        const currentItem = column.getAttribute('data-ranking-column');
        const correspondingTableRow = this.boxChartTableRows.find(col => col.getAttribute('data-table-color') === currentItem);
        addClass(correspondingTableRow, 'table__row--active');
      });

      column.addEventListener('mouseleave', () => {
        this.boxChartTableRows.forEach(tableRow => {
          removeClass(tableRow, 'table__row--active');
        });
      });
    })
  }

  transformChartData() {
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
  }

  generateChart() {
    const res = this.groups.map(group => {
      const rowValue = group.reduce((acc, item) => { acc += item.edit; return acc }, 0);
      return {
        columns: group.map(item => Object.assign(item, { colProportion: item.edit / rowValue })),
        rowProportion: rowValue / this.sum,
      };
    });

    res.forEach((group, ind) => {
      const row = document.createElement('div');
      addClass(row, 'box-chart__row');
      addAttribute(row, 'style', `height: ${group.rowProportion * 100}%`);

      group.columns.forEach(col => {
        const colEl = document.createElement('div');
        addClass(colEl, 'box-chart__col');
        addClass(colEl, `color--${col.color}`);
        addAttribute(colEl, 'style', `background: currentColor; width: ${col.colProportion * 100}%`);
        addAttribute(colEl, 'data-ranking-column', col.color);

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

      this.boxChart.appendChild(row);
    });
  }
}
