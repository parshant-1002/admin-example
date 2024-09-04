// Define types for the Terms and Conditions form data
export interface ProfilePageFormData {
  joinedOnLabel: string;
  overviewTabLabel: string;
  auctionTabLabel: string;
  pennyAuctionTabLabel: string;
  currentBidTabLabel: string;
  walletTabLabel: string;
  referralTabLabel: string;
}

// Define the transform function to convert form data to API request format
export const transformAPIRequestDataProfilePage = (
  data: ProfilePageFormData
) => {
  return { ...data };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormProfilePage = (
  data: ProfilePageFormData // Assuming API response data might not be of type ProfilePageFormData
) => {
  return { ...data };
};
