// Define the transform function to convert form data to API request format
export interface CancelSubscriptionPopupFormData {
  title: string;
  message: string;
  logoutButtonLabel: string;
}
export const transAPIRequestDataToFormCancelSubscriptionPopup = (
  data: CancelSubscriptionPopupFormData
) => {
  return {
    ...data,
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataCancelSubscriptionPopup = (
  data: CancelSubscriptionPopupFormData // Assuming API response data might not be of type CancelSubscriptionPopupFormData
) => {
  return {
    ...data,
  };
};
