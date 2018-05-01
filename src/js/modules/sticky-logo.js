import { hasClass, addClass, removeClass } from '../helpers/dom';
const CLASS_STICKY_LOGO = 'sticky-logo';
const CLASS_STICKY_LOGO_ACTIVE = 'sticky-logo--active';
const STICKY_OFFSET = 80;

class StickLogo {
  constructor() {
    this.stickyLogo = null;
    this.init();
  }

  init() {
    this.stickyLogo = document.querySelector(`.${CLASS_STICKY_LOGO}`);
    this.initBindings();
  }

  initBindings() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    if (window.scrollY > STICKY_OFFSET && !hasClass(this.stickyLogo, CLASS_STICKY_LOGO_ACTIVE)) {
      addClass(this.stickyLogo, CLASS_STICKY_LOGO_ACTIVE);
    }
    if (window.scrollY <= STICKY_OFFSET && hasClass(this.stickyLogo, CLASS_STICKY_LOGO_ACTIVE)) {
      removeClass(this.stickyLogo, CLASS_STICKY_LOGO_ACTIVE);
    }
  }
}

export const stickyLogo = new StickLogo();