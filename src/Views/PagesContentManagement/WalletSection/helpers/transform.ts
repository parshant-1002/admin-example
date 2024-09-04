// Define types for the Terms and Conditions form data
export interface WalletSectionFormData {
  productColumnLabel: string;
  auctonStartedColumnLabel: string;
  bidsColumnLabel: string;
  bidPlacedOnColumnLabel: string;
  reservePriceColumnLabel: string;
  yourBidColumnLabel: string;
  currentBidColumnLabel: string;
  timeLeftColumnLabel: string;
  actionColumnLabel: string;
  placeBidButtonLabel: string;
  finishedLabel: string;
}

// Define the transform function to convert form data to API request format
export const transformAPIRequestDataWalletSection = (
  data: WalletSectionFormData
) => {
  return { ...data };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormWalletSection = (
  data: WalletSectionFormData // Assuming API response data might not be of type WalletSectionFormData
) => {
  return { ...data };
};
