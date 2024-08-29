// Define types for the Terms and Conditions form data
export interface AuctionSectionFormData {
  emalLabel: string;
  phoneNumberLabel: string;
  addressLabel: string;
  bankAccountLabel: string;
  currentSubscriptionLabel: string;
  paymentMethodLabel: string;
  totalBidsLabel: string;
  auctionsWonLabel: string;
}

// Define the transform function to convert form data to API request format
export const transformAPIRequestDataAuctionSection = (
  data: AuctionSectionFormData
) => {
  return { ...data };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormAuctionSection = (
  data: AuctionSectionFormData // Assuming API response data might not be of type AuctionSectionFormData
) => {
  return { ...data };
};
