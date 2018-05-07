import { toggleClass } from "../helpers/dom";

class ToggleTiles {
  init() {
    this.checkbox = document.querySelector('[data-toggle-tiles]');
    this.collapsedTiles = Array.from(document.querySelectorAll('[data-tile-collapse]'));

    if (this.checkbox && this.collapsedTiles.length !== 0) this.initBindings();
  }

  initBindings() {
    this.checkbox.addEventListener('change', () => {
      this.collapsedTiles.forEach(tile => {
        toggleClass(tile, 'tile--collapsed');
        toggleClass(tile, 'color--default');
        toggleClass(tile, `color--${tile.getAttribute('data-original-color')}`);
      });
    });
  }
}

export const toggleTiles =  new ToggleTiles();