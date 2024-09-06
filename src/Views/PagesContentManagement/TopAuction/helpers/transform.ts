// Define types for the TopAuction form data
export interface TopAuctionFormData {
  topAuctionsTabLabel: string;
  topAuctionsTitle: string;
  marketValueLabel: string;
  reservePriceMetLabel: string;
  reservePriceNotMetLabel: string;
  placeBetButtonLabel: string;
  timeLeftLabel: string;
  reservePriceLabel: string;
  moreInformationLabel: string;
  historyLabel: string;
  topAuctionsIsVisible: true;
  bidPlacedLabel: string;
  currentBidLabel: string;
  reservePriceValue: string;
  totalBidsValue: string;
  currentBidValue: string;
  auctionEndedLabel: string;
  alreadyJoinedLabel: string;
  auctionStartsInLabel: string;
  auctionEndsInLabel: string;
  placeBidsByLabel: string;
  backLabel: string;
  joinTheContentLabel: string;
  exploreMoreAuctionsLabel: string;
  noAuctionsLabel: string;
  biddersRequiredLabel: string;
  biddersRequiredValue: string;
  historyImage: {
    fileURL: string;
    fileId: string;
    _id: string;
  }[];

  totalBidsImage: {
    fileURL: string;
    fileId: string;
    _id: string;
  }[];
  userColumnLabel: string;
  typeColumnLabel: string;
  bidColumnLabel: string;
  timeColumnLabel: string;
  recentBidsTitle: string;
  auctionCard: {
    marketValueLabel: string;
    currentBidLabel: string;
    reservePriceMetLabel: string;
    reservePriceNotMetLabel: string;
    placeBetButtonLabel: string;
    timeLeftLabel: string;
    reservePriceLabel: string;
    reservePriceValue: string;
    totalBidsValue: string;
    moreInformationLabel: string;
    historyLabel: string;
    historyButtonIconFileId: string;
    historyButtonIconURL: string;
    bidPlacedLabel: string;
    currentBidValue: string;
    totalBidsImageFileId: string;
    totalBidsImageURL: string;
    auctionEndedLabel: string;
    alreadyJoinedLabel: string;
    auctionStartsInLabel: string;
    auctionEndsInLabel: string;
    placeBidsByLabel: string;
    joinTheContentLabel: string;
    biddersRequiredLabel: string;
    biddersRequiredValue: string;
  };
  recentBids: {
    backLabel: string;
    title: string;
    userColumnLabel: string;
    typeColumnLabel: string;
    bidColumnLabel: string;
    timeColumnLabel: string;
  };
}

// Define the transform function to convert form data to API request format
export const transAPIRequestDataToFormTopAuction = (
  data: TopAuctionFormData
) => {
  return {
    topAuctionsTabLabel: data?.topAuctionsTabLabel,
    topAuctionsTitle: data?.topAuctionsTitle,
    marketValueLabel: data?.auctionCard?.marketValueLabel,
    reservePriceMetLabel: data?.auctionCard?.reservePriceMetLabel,
    reservePriceNotMetLabel: data?.auctionCard?.reservePriceNotMetLabel,
    placeBetButtonLabel: data?.auctionCard?.placeBetButtonLabel,
    timeLeftLabel: data?.auctionCard?.timeLeftLabel,
    reservePriceLabel: data?.auctionCard?.reservePriceLabel,
    moreInformationLabel: data?.auctionCard?.moreInformationLabel,
    historyLabel: data?.auctionCard?.historyLabel,
    topAuctionsIsVisible: data?.topAuctionsIsVisible,
    bidPlacedLabel: data?.auctionCard?.bidPlacedLabel,
    currentBidLabel: data?.auctionCard?.currentBidLabel,
    reservePriceValue: data?.auctionCard?.reservePriceValue,
    totalBidsValue: data?.auctionCard?.totalBidsValue,
    currentBidValue: data?.auctionCard?.currentBidValue,
    auctionEndedLabel: data?.auctionCard?.auctionEndedLabel,
    alreadyJoinedLabel: data?.auctionCard?.alreadyJoinedLabel,
    auctionStartsInLabel: data?.auctionCard?.auctionStartsInLabel,
    auctionEndsInLabel: data?.auctionCard?.auctionEndsInLabel,
    placeBidsByLabel: data?.auctionCard?.placeBidsByLabel,
    joinTheContentLabel: data?.auctionCard?.joinTheContentLabel,
    biddersRequiredLabel: data?.auctionCard?.biddersRequiredLabel,
    biddersRequiredValue: data?.auctionCard?.biddersRequiredValue,
    totalBidsImage: [
      {
        fileURL: data?.auctionCard?.totalBidsImageURL,
        fileId: data?.auctionCard?.totalBidsImageFileId,
      },
    ],
    historyImage: [
      {
        fileURL: data?.auctionCard?.historyButtonIconURL,
        fileId: data?.auctionCard?.historyButtonIconFileId,
      },
    ],
    backLabel: data?.recentBids?.backLabel,
    userColumnLabel: data?.recentBids?.userColumnLabel,
    typeColumnLabel: data?.recentBids?.typeColumnLabel,
    bidColumnLabel: data?.recentBids?.bidColumnLabel,
    timeColumnLabel: data?.recentBids?.timeColumnLabel,
    recentBidsTitle: data?.recentBids?.title,
    exploreMoreAuctionsLabel: data?.exploreMoreAuctionsLabel,
    noAuctionsLabel: data?.noAuctionsLabel,
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataTopAuction = (
  data: TopAuctionFormData // Assuming API response data might not be of type TopAuctionFormData
) => {
  return {
    topAuctionsTabLabel: data?.topAuctionsTabLabel,
    topAuctionsTitle: data?.topAuctionsTitle,
    auctionCard: {
      marketValueLabel: data?.marketValueLabel,
      reservePriceMetLabel: data?.reservePriceMetLabel,
      reservePriceNotMetLabel: data?.reservePriceNotMetLabel,
      placeBetButtonLabel: data?.placeBetButtonLabel,
      timeLeftLabel: data?.timeLeftLabel,
      reservePriceLabel: data?.reservePriceLabel,
      moreInformationLabel: data?.moreInformationLabel,
      historyLabel: data?.historyLabel,
      bidPlacedLabel: data?.bidPlacedLabel,
      currentBidLabel: data?.currentBidLabel,
      reservePriceValue: data?.reservePriceValue,
      totalBidsValue: data?.totalBidsValue,
      currentBidValue: data?.currentBidValue,
      auctionEndedLabel: data?.auctionEndedLabel,
      alreadyJoinedLabel: data?.alreadyJoinedLabel,
      auctionStartsInLabel: data?.auctionStartsInLabel,
      auctionEndsInLabel: data?.auctionEndsInLabel,
      placeBidsByLabel: data?.placeBidsByLabel,
      backLabel: data?.backLabel,
      joinTheContentLabel: data?.joinTheContentLabel,
      biddersRequiredLabel: data?.biddersRequiredLabel,
      biddersRequiredValue: data?.biddersRequiredValue,
      totalBidsImageFileId:
        data?.totalBidsImage?.[0]?.fileId || data?.totalBidsImage?.[0]?._id,
      totalBidsImageURL: data?.totalBidsImage?.[0]?.fileURL,
      historyButtonIconURL: data?.historyImage?.[0]?.fileURL,
      historyButtonIconFileId:
        data?.historyImage?.[0]?.fileId || data?.historyImage?.[0]?._id,
    },
    recentBids: {
      title: data?.recentBidsTitle,
      backLabel: data?.backLabel,
      userColumnLabel: data?.userColumnLabel,
      typeColumnLabel: data?.typeColumnLabel,
      bidColumnLabel: data?.bidColumnLabel,
      timeColumnLabel: data?.timeColumnLabel,
    },
    exploreMoreAuctionsLabel: data?.exploreMoreAuctionsLabel,
    noAuctionsLabel: data?.noAuctionsLabel,
    topAuctionsIsVisible: data?.topAuctionsIsVisible,
  };
};
