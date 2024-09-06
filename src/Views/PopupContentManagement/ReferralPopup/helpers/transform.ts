// Define the transform function to convert form data to API request format
export interface ReferralPopupFormData {
  title: string;
  message: string;
  logoutButtonLabel: string;
}
export const transAPIRequestDataToFormReferralPopup = (
  data: ReferralPopupFormData
) => {
  return {
    ...data,
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataReferralPopup = (
  data: ReferralPopupFormData // Assuming API response data might not be of type ReferralPopupFormData
) => {
  return {
    ...data,
  };
};
