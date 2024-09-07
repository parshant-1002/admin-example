import { SelectOption } from '../../../Models/common';
import { Specification } from '../../Products/helpers/model';

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
  specifications?: Specification;
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
  categoryIds?: SelectOption;
  itemPrice?: number;
  reserveWaitingEndDate?: string;
  enabledSocialMediaPlatforms?: number[];
  socialMediaShareReward?: number;
}

export interface EditData {
  data: AuctionResponsePayload | null;
  show: boolean;
}
