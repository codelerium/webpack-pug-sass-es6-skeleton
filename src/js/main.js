import '../scss/main.scss';
import { sliderController } from './controllers/sliderController';
import { selectController } from './controllers/selectController';
import { graphController } from './controllers/graphController';
import { boxChartController } from './controllers/boxChartController';
import { articleCompareController } from './controllers/articleCompareController';
import { totelEditsController } from './controllers/totalEditsController';
import { stickyLogo } from './modules/sticky-logo';
import { toggleTiles } from './modules/tile-toggle';
import { search } from './modules/search';

class App {
  constructor() {
    selectController.init();
    sliderController.init();
    graphController.init();
    boxChartController.init();
    articleCompareController.init();
    totelEditsController.init();
    stickyLogo.init();
    toggleTiles.init();
    search.init();
  }
}

setTimeout(() => {
  new App();
}, 500);