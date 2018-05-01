export const operateClassList = op => (el, c) => el.classList[op](c);
export const hasClass = operateClassList('contains');
export const addClass = operateClassList('add');
export const removeClass = operateClassList('remove');
export const toggleClass = (el, c) => hasClass(el, c) ? removeClass(el, c) : addClass(el, c);
export const removeAttribute = (el, a) => el.removeAttribute(a);
export const addAttribute = (el, a, v) => el.setAttribute(a, v || '');
