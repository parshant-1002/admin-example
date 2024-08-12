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
interface UserBid {
  _id?: string;
  name?: string;
  bids?: number;
  type: number;
  email?: string;
  referralAmount?: number;
  createdAt?: string; // Use string or Date depending on how you handle dates
  bidPlan?: BidPlan;
  phoneNumber?: string;
  address?: string;
  auctionDetails?: { title: string; reservePrice: number };
  productDetails?: { price: string };
  auction?: { title: string };
  product?: { title: string; images: string[] };
  purchasedPrice?: string;
  totalBids?: number;
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
