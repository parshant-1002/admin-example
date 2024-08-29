// Define types for the Terms and Conditions form data
export interface PennyAuctionSectionFormData {
  moreInformationLabel: string;
  historyButtonLabel: string;
}

// Define the transform function to convert form data to API request format
export const transformAPIRequestDataPennyAuctionSection = (
  data: PennyAuctionSectionFormData
) => {
  return { ...data };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormPennyAuctionSection = (
  data: PennyAuctionSectionFormData // Assuming API response data might not be of type PennyAuctionSectionFormData
) => {
  return { ...data };
};
