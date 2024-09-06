// Define types for the AllAuctions form data
export interface AllAuctionsFormData {
  header: string;
  filterPlaceHolder: string;
  clearButtonLabel: string;
}

// Define the transform function to convert form data to API request format
export const transAPIRequestDataToFormAllAuctions = (
  data: AllAuctionsFormData
) => {
  return {
    ...data,
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataAllAuctions = (
  data: AllAuctionsFormData // Assuming API response data might not be of type AllAuctionsFormData
) => {
  return {
    ...data,
  };
};
