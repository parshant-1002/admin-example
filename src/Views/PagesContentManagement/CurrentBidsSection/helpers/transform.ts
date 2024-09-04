// Define types for the Terms and Conditions form data
export interface CurrentBidsSectionFormData {
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
export const transformAPIRequestDataCurrentBidsSection = (
  data: CurrentBidsSectionFormData
) => {
  return { ...data };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormCurrentBidsSection = (
  data: CurrentBidsSectionFormData // Assuming API response data might not be of type CurrentBidsSectionFormData
) => {
  return { ...data };
};
