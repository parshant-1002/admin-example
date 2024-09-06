// Define types for the MyAuctions form data
export interface MyAuctionsFormData {
  topAuctionsTabLabel: string;
  header: string;
  pastBidsLabel: string;
  ongoingBidsLabel: string;
}

// Define the transform function to convert form data to API request format
export const transAPIRequestDataToFormMyAuctions = (
  data: MyAuctionsFormData
) => {
  return {
    ...data,
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataMyAuctions = (
  data: MyAuctionsFormData // Assuming API response data might not be of type MyAuctionsFormData
) => {
  return {
    ...data,
  };
};
