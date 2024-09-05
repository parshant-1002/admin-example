// Define types for the TopAuction form data
export interface TopAuctionFormData {
  topAuctionsTabLabel: string;
  topAuctionsTitle: string;
  marketValueLabel: string;
  reservePriceMetLabel: string;
  reservePriceNotMetLabel: string;
  placeBetButtonLabel: string;
  timeLeftLabel: string;
  reservePriceLabel: string;
  moreInformationLabel: string;
  historyLabel: string;
  topAuctionsIsVisible: true;
  bidPlacedLabel: string;
  auctionCard: {
    marketValueLabel: string;
    reservePriceMetLabel: string;
    reservePriceNotMetLabel: string;
    placeBetButtonLabel: string;
    timeLeftLabel: string;
    reservePriceLabel: string;
    moreInformationLabel: string;
    historyLabel: string;
    bidPlacedLabel: string;
  };
}

// Define the transform function to convert form data to API request format
export const transAPIRequestDataToFormTopAuction = (
  data: TopAuctionFormData
) => {
  return {
    topAuctionsTabLabel: data?.topAuctionsTabLabel,
    topAuctionsTitle: data?.topAuctionsTitle,
    marketValueLabel: data?.auctionCard?.marketValueLabel,
    reservePriceMetLabel: data?.auctionCard?.reservePriceMetLabel,
    reservePriceNotMetLabel: data?.auctionCard?.reservePriceNotMetLabel,
    placeBetButtonLabel: data?.auctionCard?.placeBetButtonLabel,
    timeLeftLabel: data?.auctionCard?.timeLeftLabel,
    reservePriceLabel: data?.auctionCard?.reservePriceLabel,
    moreInformationLabel: data?.auctionCard?.moreInformationLabel,
    historyLabel: data?.auctionCard?.historyLabel,
    topAuctionsIsVisible: data?.topAuctionsIsVisible,
    bidPlacedLabel: data?.auctionCard?.bidPlacedLabel,
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataTopAuction = (
  data: TopAuctionFormData // Assuming API response data might not be of type TopAuctionFormData
) => {
  return {
    topAuctionsTabLabel: data?.topAuctionsTabLabel,
    topAuctionsTitle: data?.topAuctionsTitle,
    auctionCard: {
      marketValueLabel: data?.marketValueLabel,
      reservePriceMetLabel: data?.reservePriceMetLabel,
      reservePriceNotMetLabel: data?.reservePriceNotMetLabel,
      placeBetButtonLabel: data?.placeBetButtonLabel,
      timeLeftLabel: data?.timeLeftLabel,
      reservePriceLabel: data?.reservePriceLabel,
      moreInformationLabel: data?.moreInformationLabel,
      historyLabel: data?.historyLabel,
      bidPlacedLabel: data?.bidPlacedLabel,
    },
    topAuctionsIsVisible: data?.topAuctionsIsVisible,
  };
};
