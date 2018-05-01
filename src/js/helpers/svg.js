export const createSVGElement = el => document.createElementNS("http://www.w3.org/2000/svg", el);

export const setSVGAttribute = (el, attr, val) => el.setAttributeNS(null, attr, val);