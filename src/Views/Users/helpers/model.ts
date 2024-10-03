import { DateRangeState } from '../../../Shared/components/Filters/helpers/models';

// Define the type for the SelectOption field
export interface SelectOption {
  value: number;
  label: string;
}

// Define the type for the Image field
export interface Image {
  _id?: string; // _id is optional in case of ProductPayload
  url: string;
  title: string;
  fileURL?: string;
  fileName?: string;
}

// Define the type for the Category field
export interface Category {
  _id: string;
  name: string;
}

// Define the main ProductPayload type
export interface ProductPayload {
  title: string;
  description: string;
  price: string;
  status: SelectOption;
  images: Image[];
  category: SelectOption[];
  stock: number;
}

// Define the main ProductResponsePayload type
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

// Define the UsersResponsePayload type
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

// Define the ViewMultiData type
export interface ViewMultiData {
  data: {
    title?: string;
    categories?: Category[];
    imgData?: Image[];
    size?: 'sm' | 'lg' | 'xl';
  } | null;
  show?: boolean;
}

export interface SelectedFilters {
  dateRange?: DateRangeState;
  userStatus?: SelectOption;
}
