// Define the transform function to convert form data to API request format
export interface TopupPupupFormData {
  title: string;
  message: string;
  logoutButtonLabel: string;
}
export const transAPIRequestDataToFormTopupPupup = (
  data: TopupPupupFormData
) => {
  return {
    ...data,
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataTopupPupup = (
  data: TopupPupupFormData // Assuming API response data might not be of type TopupPupupFormData
) => {
  return {
    ...data,
  };
};
