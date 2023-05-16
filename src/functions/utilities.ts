export const displayPrice = (price: number): string => {
  return `$${Math.floor(price * 10) / 10}`;
};

export const pickTextColorBasedOnBgColorSimple = (
  bgColor: string,
  lightColor: string,
  darkColor: string
) => {
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
};

export const scrollWithOffset = (el: any) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -360;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

export const truncate = (text: string, length: number) =>
  text.length > length ? `${text.slice(0, length)}...` : text;
