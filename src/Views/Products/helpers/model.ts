interface Status {
  value: number;
  label: string;
}

// Define the type for the image field
interface Image {
  url: string;
  title: string;
}

// Define the main type
export interface ProductPayload {
  title: string;
  description: string;
  price: string;
  status: Status;
  image: Image[];
  category: Status;
  stock: number;
}
interface Image {
  _id: string;
  url: string;
  title: string;
}

// Define the type for the category field
interface Category {
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
  category: Category;
}
