export interface SelectOption {
  value: number;
  label: string;
}

// Define the type for the category field
export interface Category {
  _id: string;
  name: string;
}

export interface CategoryResponsePayload {
  _id: string;
  name: string;
  createdAt: string;
}

export interface CategoryPayload {
  name: string;
}
