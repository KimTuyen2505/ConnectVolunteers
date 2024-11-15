export const moneyString = (money) => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
