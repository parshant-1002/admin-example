// Define types for the AuctionWonDetails form data
export interface AuctionWonDetailsFormData {
  wonForLabel: string;
  wonForValue: string;
  placedAddress: string;
}

// Define the transform function to convert form data to API request format
export const transAPIRequestDataToFormAuctionWonDetails = (
  data: AuctionWonDetailsFormData
) => {
  return { ...data };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataAuctionWonDetails = (
  data: AuctionWonDetailsFormData // Assuming API response data might not be of type AuctionWonDetailsFormData
) => {
  return { ...data };
};
