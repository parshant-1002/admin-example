import { SelectOption } from '../../../Models/common';

interface Category {
  _id: string;
  name: string;
}
export interface AuctionResponsePayload {
  _id?: string;
  category?: Category;
  totalBids?: number;
  title?: string;
  images?: string[];
  categories?: Category[];
  product?: {
    title?: string;
    _id?: string;
    images?: [];
    price?: number;
  };
  auctionDate?: string;
  bidStartDate?: string;
  reservePrice?: number;
  winner?: string;
  status?: number;
  statusData?: {
    value?: number;
    label?: string;
  };
  productId?: SelectOption;
  categoryIds?: SelectOption[];
  itemPrice?: number;
  reserveWaitingEndDate?: string;
}
