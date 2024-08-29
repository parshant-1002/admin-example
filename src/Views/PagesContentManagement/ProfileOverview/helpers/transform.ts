// Define types for the Terms and Conditions form data
export interface ProfileOverviewFormData {
  currentSubscriptionLabel: string;
  auctionsWonLabel: string;
  bidsAvailableLabel: string;
  totalSavingsLabel: string;
  recentWinsHeader: string;
  wonForLabel: string;
  placeOrderButtonLabel: string;
  orderPurchasedButtonLabel: string;
}

// Define the transform function to convert form data to API request format
export const transformAPIRequestDataProfileOverview = (
  data: ProfileOverviewFormData
) => {
  return { ...data };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormProfileOverview = (
  data: ProfileOverviewFormData // Assuming API response data might not be of type ProfileOverviewFormData
) => {
  return { ...data };
};
