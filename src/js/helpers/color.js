export const lerp = (val1, val2, amount) => Math.round(val1 + (val2 - val1) * amount);

export const hexToRGB = (colorHEX) => {
  const r = parseInt(colorHEX.substring(1, 3), 16);
  const g = parseInt(colorHEX.substring(3, 5), 16);
  const b = parseInt(colorHEX.substring(5, 7), 16);
  return {r, g, b};
};

export const rgbToHEX = (r, g, b) => {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export const calcGradientSteps = (startColorHEX, endColorHEX, steps) => {
  const startRGB = hexToRGB(startColorHEX);
  const endRGB = hexToRGB(endColorHEX);

  const result = [];

  Array.from({ length: steps }).forEach((v, i) => {
    const amount = i / (steps - 1);

    result.push(
      rgbToHEX(
        lerp(startRGB.r, endRGB.r, amount),
        lerp(startRGB.g, endRGB.g, amount),
        lerp(startRGB.b, endRGB.b, amount),
      )
    )
  });

  return result;
};
