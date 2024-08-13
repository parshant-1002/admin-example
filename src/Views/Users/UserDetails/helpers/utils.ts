import { BID_CREDIT_TYPES } from './constants';
import {
  UserReferralHistoryResponse,
  UserBiddingHistoryResponse,
  UserBidsCreditHistoryResponse,
  UserProductHistoryResponse,
  UserAuctionHistoryResponse,
} from './model';

function getKeyByValue<T extends Record<string, number>>(
  obj: T,
  value: T[keyof T]
): keyof T | undefined {
  return (Object.keys(obj) as Array<keyof T>).find((key) => obj[key] === value);
}

const transformBidderPurchaseResponse = (
  data: UserBidsCreditHistoryResponse
) => {
  return {
    data: data?.data?.map((bidsPurchaseHistory) => ({
      packName: bidsPurchaseHistory?.bidPlan?.title,
      dealOffer: bidsPurchaseHistory?.bidPlan?.dealOffer,
      dealPrice: bidsPurchaseHistory?.bidPlan?.dealPrice,
      bids: bidsPurchaseHistory?.bids,
      date: bidsPurchaseHistory?.createdAt,
      status: getKeyByValue(BID_CREDIT_TYPES, bidsPurchaseHistory?.type),
    })),
    count: data?.count,
  };
};

const transformBiddingHistoryResponse = (data: UserBiddingHistoryResponse) => {
  return {
    data: data?.data?.map((biddingHistory) => ({
      auctionName: biddingHistory?.auctionDetails?.title,
      itemPrice: biddingHistory?.productDetails?.price,
      bidsSpent: biddingHistory?.bids,
      date: biddingHistory?.createdAt,
      status: getKeyByValue(BID_CREDIT_TYPES, biddingHistory?.type),
    })),
    count: data?.count,
  };
};
const transformProductHistoryResponse = (data: UserProductHistoryResponse) => {
  return {
    data: data?.data?.map((productHistory) => ({
      auctionName: productHistory?.auction?.title,
      productName: productHistory?.product?.title,
      productPrice: productHistory?.purchasedPrice,
      date: productHistory?.createdAt,
      images: productHistory?.product?.images,
    })),
    count: data?.count,
  };
};
const transformReferralHistoryResponse = (
  data: UserReferralHistoryResponse
) => {
  return {
    data: data?.data?.map((referralHistory) => ({
      name: referralHistory?.name,
      email: referralHistory?.email,
      referralAmount: referralHistory?.referralAmount,
      phoneNumber: referralHistory?.phoneNumber,
      address: referralHistory?.address,
      date: referralHistory?.createdAt,
    })),
    count: data?.count,
  };
};

const transformAuctionHistoryResponse = (data: UserAuctionHistoryResponse) => {
  return {
    data: data?.data?.map((auctionHistory) => ({
      _id: auctionHistory?._id,
      auctionName: auctionHistory?.auctionDetails?.title,
      productName: auctionHistory?.product?.title,
      bidSpent: auctionHistory?.totalBids,
      reservePrice: auctionHistory?.auctionDetails?.reservePrice,
      productPrice: auctionHistory?.purchasedPrice,
      date: auctionHistory?.createdAt,
      images: auctionHistory?.product?.images,
    })),
    count: data?.count,
  };
};

export {
  transformBidderPurchaseResponse,
  transformBiddingHistoryResponse,
  transformProductHistoryResponse,
  transformReferralHistoryResponse,
  transformAuctionHistoryResponse,
};
