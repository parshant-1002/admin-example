import { Image } from '../../../Models/common';

export interface SelectOption {
  value: number | string;
  label: string | number;
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

export interface ViewMultiData {
  data: {
    title: string;
    categories?: Category[];
    imgData?: Image[];
    size?: 'sm' | 'lg' | 'xl' | undefined;
  } | null;
  show?: boolean;
}
