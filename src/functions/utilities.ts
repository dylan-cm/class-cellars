import RedBottle from "../assets/red_bottle.png";
import WhiteBottle from "../assets/white_bottle.png";
import ChampBottle from "../assets/champ_bottle.png";
import BurgBottle from "../assets/burg_bottle.png";

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

export const formatMoney = (price: Money, round: boolean = false): string => {
  let numberAmount =
    typeof price.amount === "string" ? parseFloat(price.amount) : price.amount;

  // If the round parameter is true, round the number to the nearest whole number
  if (round) {
    numberAmount = Math.round(numberAmount);
  }

  // Use the built-in Intl.NumberFormat object to format the number to the correct currency format
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode,
    // If rounding, don't use any decimal digits
    minimumFractionDigits: round ? 0 : 2,
    maximumFractionDigits: round ? 0 : 2,
  });

  return formatter.format(numberAmount);
};

export const parseVolumes = (input: string): string => {
  // Regular expression to match volume measures in the string (milliliters and liters)
  const volumeRegex = /(\d+(\.\d+)?)(\s?)(ml|L)/g;

  let match;
  let volumes = [];
  while ((match = volumeRegex.exec(input)) !== null) {
    let [, volume, , , unit] = match;

    // Convert to liters if necessary
    if (unit === "ml" && Number(volume) >= 1000) {
      volume = (Number(volume) / 1000).toString();
      unit = "L";
    }

    // Only include the decimal point and trailing zeros if necessary
    if (volume.endsWith(".0")) {
      volume = volume.slice(0, -2);
    }

    volumes.push(volume + unit);
  }

  return volumes.join(", ");
};

export const defaultImage = (wineType: string) => {
  const wineTypeMap: any = {
    Aligoté: "White",
    Boal: "White",
    "Cabernet Franc": "Red",
    "Cabernet Sauvignon": "Red",
    "Cabernet-Shiraz Blend": "Red",
    "Champagne Blend": "Champagne",
    Chardonnay: "White",
    Cinsault: "Red",
    "Corvina Blend": "Red",
    Gamay: "Red",
    "Gamay-Pinot Noir Blend": "Red",
    Grenache: "Red",
    "Grenache Blend": "Red",
    "Grüner Veltliner": "White",
    Malbec: "Red",
    Merlot: "Red",
    Nebbiolo: "Red",
    "Nerello Blend": "Red",
    "Petit Verdot": "Red",
    "Pinot Meunier": "Red",
    "Pinot Noir": "Red",
    "Port Blend": "Red",
    "Red Blend": "Red",
    "Red Bordeaux Blend": "Red",
    "Red Rhone Blend": "Red",
    Riesling: "White",
    "Rosé Blend": "Rosé",
    Sagrantino: "Red",
    "Sauvignon Blanc": "White",
    Shiraz: "Red",
    "SuperTuscan Blend": "Red",
    Syrah: "Red",
    "Syrah Blend": "Red",
    Sémillon: "White",
    "Sémillon-Sauvignon Blanc Blend": "White",
    "Tempranillo Blend": "Red",
    Viognier: "White",
    "White Blend": "White",
    "White Rhone Blend": "White",
    Zinfandel: "Red",
  };
  const color = wineTypeMap[wineType];
  switch (color) {
    case "Red":
      return RedBottle;
    case "Champagne":
      return ChampBottle;
    case "White":
      return WhiteBottle;
    default:
      return BurgBottle;
  }
};
