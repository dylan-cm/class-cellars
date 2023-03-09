export const displayPrice = (price: number): string => {
  return `$${Math.floor(price * 10) / 10}`;
};
