/* eslint-disable no-nested-ternary */
export const calculatePercentageValue = (price: number, percentage: number) => {
  return Number(((percentage * price) / 100).toFixed(2));
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

export const calculateAnnualPrice = (
  monthlyPrice: number,
  discountPercentage: number
) => {
  const yearlyPrice = monthlyPrice * 12;
  const yearlyDiscountedPrice = calculatePercentageValue(
    yearlyPrice,
    discountPercentage
  );
  return discountPercentage
    ? yearlyDiscountedPrice
      ? Number(yearlyPrice) - yearlyDiscountedPrice
      : 0
    : yearlyPrice;
};

export function containsHTML(text: string) {
  const htmlRegex = /<[a-z/][\s\S]*>/i;
  return htmlRegex.test(text);
}

export function htmlToText(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}
