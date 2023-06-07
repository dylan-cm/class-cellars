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

export const parseVolumes = (volume: number): string => {
  if (volume < 0) return "0ml";
  else if (volume < 1000) return `${volume}ml`;
  else return `${Math.round((volume / 1000 + Number.EPSILON) * 100) / 100}L`;
};

export const defaultImage = (type: string) => {
  switch (type) {
    case "Red":
      return RedBottle;
    case "Sparkling":
      return ChampBottle;
    case "White":
      return WhiteBottle;
    default:
      return BurgBottle;
  }
};

export const formatPackage = (count?: number) => {
  if (!count) return "";
  if (count > 1) return `${count}-pack`;
  return "";
};

export const formatMerchId = (id: string) =>
  `gid://shopify/ProductVariant/${id}`;
