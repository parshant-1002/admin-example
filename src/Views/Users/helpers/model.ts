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

// Define the main type
export interface ProductResponsePayload {
  _id: string;
  price: number;
  status: number;
  title: string;
  description: string;
  bidStartDate: string; // or Date if you prefer to handle it as a Date object
  reservePrice: number;
  images: Image[];
  categories: Category[];
}
export interface UsersResponsePayload {
  _id: string;
  bidBalance: number;
  isBlocked: boolean;
  ongoingAuctions: number;
  auctionsWon: number;
  referredFriendsCount: number;
  totalSpent: number;
  referralBidsEarned: number;
  name: string;
  email: string;
  createdAt: string;
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
