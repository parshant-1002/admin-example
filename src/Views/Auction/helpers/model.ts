interface Category {
  _id: string;
  name: string;
}
export interface AuctionResponsePayload {
  _id: string;
  category: Category;
  totalBids: number;
  title: string;
  auctionDate: string;
  reservePrice: number;
  winner: string;
  status: number;
  itemPrice: number;
}

export interface ProductDetailResponsePayload {
  id_: string;
  title: string;
  bidStartDate: string;
  turnTimer: number;
  reservePrice: string;
  preAuctionPrice: string;
  reserveWaitingEndDate: string;
  status: number;
  uniqueUserCount: number;
  prizeClaimDays: number;
}
