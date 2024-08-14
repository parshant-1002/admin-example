interface Category {
  _id: string;
  name: string;
}
export interface AuctionResponsePayload {
  _id: string;
  category: Category;
  totalBids: number;
  title: string;
  categories: Category[];
  product: {
    images: [];
    price: number;
  };
  auctionDate: string;
  reservePrice: number;
  winner: string;
  status: number;
  itemPrice: number;
}
