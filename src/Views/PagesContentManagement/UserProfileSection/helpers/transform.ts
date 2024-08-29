// Define types for the Terms and Conditions form data
export interface UserProfileSectionFormData {
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
export const transformAPIRequestDataUserProfileSection = (
  data: UserProfileSectionFormData
) => {
  return { ...data };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormUserProfileSection = (
  data: UserProfileSectionFormData // Assuming API response data might not be of type UserProfileSectionFormData
) => {
  return { ...data };
};
