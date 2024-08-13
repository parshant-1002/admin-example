// Define the type for the image field
interface Image {
  _id: string;
  url: string;
  title: string;
}

// Define the main type
export interface Invoice {
  _id: string;
  status: number;
  purchasedPrice: number;
  createdAt: Date;
  product: {
    _id: string;
    title: string;
    images: Image[];
  };
  auction: {
    _id: string;
    title: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
  invoiceURL?: string;
  invoiceDate?: string;
}
