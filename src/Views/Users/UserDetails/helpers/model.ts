export interface SelectOption {
  value: number;
  label: string;
}

// Define the type for the image field
interface Image {
  url: string;
  title: string;
  fileURL?: string;
  fileName?: string;
}

// Define the main type
export interface ProductPayload {
  title: string;
  description: string;
  price: string;
  status: SelectOption;
  images: Image[];
  category: SelectOption[];
  stock: number;
}
interface Image {
  _id: string;
  url: string;
  title: string;
}

// Define the type for the category field
export interface Category {
  _id: string;
  name: string;
}

export interface ViewMultiData {
  data: {
    title: string;
    categories?: Category[];
    imgData?: Image[];
    size?: 'sm' | 'lg' | 'xl' | undefined;
  } | null;
  show?: boolean;
}

interface BidPlan {
  _id: string;
  title: string;
  dealOffer: string;
  dealPrice: string;
}

// Define the type for each item in the data array
export interface UserBid {
  id: string;
  invoiceDate: string;
  _id?: string;
  name?: string;
  bids?: number;
  bidType: number;
  status: number;
  type: number;
  email?: string;
  referralAmount?: number;
  createdAt?: string; // Use string or Date depending on how you handle dates
  bidPlan?: BidPlan;
  phoneNumber?: string;
  address?: string;
  auctionId?: string;
  auctionDetails: {
    id: string;
    title: string;
    reservePrice: number;
    bidStartDate: string;
    reserveWaitingEndDate: string;
    status: number;
  };
  productDetails?: { id: string; price: string };
  auction?: { id: string; title: string };
  product?: { title: string; images: string[]; id: string };
  purchasedPrice?: string;
  totalBids?: number;
  itemPrice?: number;
  winnerName?: string;
  invoiceURL?: string;
}

// Define the type for the response data
export interface UserBidsCreditHistoryResponse {
  data: UserBid[];
  count: number;
}

export interface UserBiddingHistoryResponse {
  data: UserBid[];
  count: number;
}

export interface UserProductHistoryResponse {
  data: UserBid[];
  count: number;
}
export interface UserReferralHistoryResponse {
  data: UserBid[];
  count: number;
}

export interface UserAuctionHistoryResponse {
  data: UserBid[];
  count: number;
}
