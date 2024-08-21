export const calculatePercentageValue = (price: number, percentage: number) => {
  return Math.round((percentage * price) / 100);
};

export const calculateDiscountedPrice = (
  totalPrice: number,
  discountPercentage: number
) => {
  const discountPriceValue = calculatePercentageValue(
    totalPrice,
    discountPercentage
  );

  return discountPriceValue ? Number(totalPrice) - discountPriceValue : 0;
};
