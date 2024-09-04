export interface ProductDetailResponsePayload {
  id_: string;
  title: string;
  bidStartDate: string;
  bidDuration: number;
  reservePrice: string;
  preAuctionPrice: string;
  reserveWaitingEndDate: string;
  status: number;
  uniqueUserCount: number;
  prizeClaimDays: number;
}
