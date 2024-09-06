// Define the transform function to convert form data to API request format
export interface LogoutPopupFormData {
  title: string;
  message: string;
  logoutButtonLabel: string;
}
export const transAPIRequestDataToFormLogoutPopup = (
  data: LogoutPopupFormData
) => {
  return {
    ...data,
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataLogoutPopup = (
  data: LogoutPopupFormData // Assuming API response data might not be of type LogoutPopupFormData
) => {
  return {
    ...data,
  };
};
