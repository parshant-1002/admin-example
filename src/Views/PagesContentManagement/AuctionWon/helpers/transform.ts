// Define types for the AuctionWon form data
export interface AuctionWonFormData {
  topAuctionsTabLabel: string;
  header: string;
  pastBidsLabel: string;
  ongoingBidsLabel: string;
}

// Define the transform function to convert form data to API request format
export const transAPIRequestDataToFormAuctionWon = (
  data: AuctionWonFormData
) => {
  return {
    ...data,
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataAuctionWon = (
  data: AuctionWonFormData // Assuming API response data might not be of type AuctionWonFormData
) => {
  return {
    ...data,
  };
};
