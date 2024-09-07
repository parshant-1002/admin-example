// Define the transform function to convert form data to API request format
export interface RefreshPopupFormData {
  title: string;
  message: string;
  logoutButtonLabel: string;
}
export const transAPIRequestDataToFormRefreshPopup = (
  data: RefreshPopupFormData
) => {
  return {
    ...data,
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataRefreshPopup = (
  data: RefreshPopupFormData // Assuming API response data might not be of type RefreshPopupFormData
) => {
  return {
    ...data,
  };
};
