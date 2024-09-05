// Define types for the Terms and Conditions form data
export interface AuctionPageFormData {
  modelHeader: string;
  modelIconFileId: string;
  modelIconURL: string;
  fuelHeaderHeader: string;
  fuelIconFileId: string;
  fuelIconURL: string;
  engineHeader: string;
  engineIconFileId: string;
  engineIconURL: string;
  gearboxHeader: string;
  gearboxIconFileId: string;
  gearboxIconURL: string;
  numberOfSeatsHeader: string;
  numberOfSeatsIconFileId: string;
  numberOfSeatsIconURL: string;
  currentPriceHeader: string;
  reservePriceHeader: string;
  auctionTimeLabel: string;
  placeBidsButtonLabel: string;
  placeAutomaticBidsLabel: string;
  shareAuctionHeader: string;
  specificationsHeader: string;
  registrationNumberLabel: string;
  modelYearLabel: string;
  paintLabel: string;
  fuelLabel: string;
  motorLabel: string;
  gearboxLabel: string;
  gearCountLabel: string;
  seatCountLabel: string;
  securityLabel: string;
  comfortLabel: string;
  appearanceLabel: string;
  exploreMoreAuctionsHeader: string;
  currentPriceLabel: string;
  reservePriceNotMetLabel: string;
  biddersRequiredLabel: string;
  joinListButtonLabel: string;
  placeBidButtonLabel: string;
  moreInormationLabel: string;
  historyButtonLabel: string;
  automaticBidLabel: string;
  automaticBidCancelLabel: string;
  automaticBidValue: string;
  recentBidsLabel: string;
  fuelIcon: {
    fileId: string;
    fileURL: string;
  }[];
  modelIcon: {
    fileId: string;
    fileURL: string;
  }[];
  engineIcon: {
    fileId: string;
    fileURL: string;
  }[];
  gearboxIcon: {
    fileId: string;
    fileURL: string;
  }[];
  numberOfSeatsIcon: {
    fileId: string;
    fileURL: string;
  }[];
}

// Define the transform function to convert form data to API request format
export const transformAPIRequestDataAuctionPage = (
  data: AuctionPageFormData
) => {
  return {
    modelHeader: data?.modelHeader,
    modelIconFileId: data?.modelIcon?.[0]?.fileId,
    modelIconURL: data?.modelIcon?.[0]?.fileURL,
    fuelHeaderHeader: data?.fuelHeaderHeader,
    fuelIconFileId: data?.fuelIcon?.[0]?.fileId,
    fuelIconURL: data?.fuelIcon?.[0]?.fileURL,
    engineHeader: data?.engineHeader,
    engineIconFileId: data?.engineIcon?.[0]?.fileId,
    engineIconURL: data?.engineIcon?.[0]?.fileURL,
    gearboxHeader: data?.gearboxHeader,
    gearboxIconFileId: data?.gearboxIcon?.[0]?.fileId,
    gearboxIconURL: data?.gearboxIcon?.[0]?.fileURL,
    numberOfSeatsHeader: data?.numberOfSeatsHeader,
    numberOfSeatsIconFileId: data?.numberOfSeatsIcon?.[0]?.fileId,
    numberOfSeatsIconURL: data?.numberOfSeatsIcon?.[0]?.fileURL,
    currentPriceHeader: data?.currentPriceHeader,
    reservePriceHeader: data?.reservePriceHeader,
    auctionTimeLabel: data?.auctionTimeLabel,
    placeBidsButtonLabel: data?.placeBidsButtonLabel,
    placeAutomaticBidsLabel: data?.placeAutomaticBidsLabel,
    shareAuctionHeader: data?.shareAuctionHeader,
    specificationsHeader: data?.specificationsHeader,
    registrationNumberLabel: data?.registrationNumberLabel,
    modelYearLabel: data?.modelYearLabel,
    paintLabel: data?.paintLabel,
    fuelLabel: data?.fuelLabel,
    motorLabel: data?.motorLabel,
    gearboxLabel: data?.gearboxLabel,
    gearCountLabel: data?.gearCountLabel,
    seatCountLabel: data?.seatCountLabel,
    securityLabel: data?.securityLabel,
    comfortLabel: data?.comfortLabel,
    appearanceLabel: data?.appearanceLabel,
    exploreMoreAuctionsHeader: data?.exploreMoreAuctionsHeader,
    currentPriceLabel: data?.currentPriceLabel,
    reservePriceNotMetLabel: data?.reservePriceNotMetLabel,
    biddersRequiredLabel: data?.biddersRequiredLabel,
    joinListButtonLabel: data?.joinListButtonLabel,
    placeBidButtonLabel: data?.placeBidButtonLabel,
    moreInormationLabel: data?.moreInormationLabel,
    historyButtonLabel: data?.historyButtonLabel,
    automaticBidLabel: data?.automaticBidLabel,
    automaticBidCancelLabel: data?.automaticBidCancelLabel,
    automaticBidValue: data?.automaticBidValue,
    recentBidsLabel: data?.recentBidsLabel,
  };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormAuctionPage = (
  data: AuctionPageFormData // Assuming API response data might not be of type AuctionPageFormData
) => {
  return {
    modelHeader: data?.modelHeader,
    modelIcon: [{ fileURL: data?.modelIconURL, fileId: data?.modelIconFileId }],
    fuelHeaderHeader: data?.fuelHeaderHeader,
    fuelIcon: [{ fileURL: data?.fuelIconURL, fileId: data?.fuelIconFileId }],
    engineHeader: data?.engineHeader,
    engineIcon: [
      { fileURL: data?.engineIconURL, fileId: data?.engineIconFileId },
    ],
    gearboxHeader: data?.gearboxHeader,
    gearboxIcon: [
      { fileURL: data?.gearboxIconURL, fileId: data?.gearboxIconFileId },
    ],
    numberOfSeatsHeader: data?.numberOfSeatsHeader,
    numberOfSeatsIcon: [
      {
        fileURL: data?.numberOfSeatsIconURL,
        fileId: data?.numberOfSeatsIconFileId,
      },
    ],
    currentPriceHeader: data?.currentPriceHeader,
    reservePriceHeader: data?.reservePriceHeader,
    auctionTimeLabel: data?.auctionTimeLabel,
    placeBidsButtonLabel: data?.placeBidsButtonLabel,
    placeAutomaticBidsLabel: data?.placeAutomaticBidsLabel,
    shareAuctionHeader: data?.shareAuctionHeader,
    specificationsHeader: data?.specificationsHeader,
    registrationNumberLabel: data?.registrationNumberLabel,
    modelYearLabel: data?.modelYearLabel,
    paintLabel: data?.paintLabel,
    fuelLabel: data?.fuelLabel,
    motorLabel: data?.motorLabel,
    gearboxLabel: data?.gearboxLabel,
    gearCountLabel: data?.gearCountLabel,
    seatCountLabel: data?.seatCountLabel,
    securityLabel: data?.securityLabel,
    comfortLabel: data?.comfortLabel,
    appearanceLabel: data?.appearanceLabel,
    exploreMoreAuctionsHeader: data?.exploreMoreAuctionsHeader,
    currentPriceLabel: data?.currentPriceLabel,
    reservePriceNotMetLabel: data?.reservePriceNotMetLabel,
    biddersRequiredLabel: data?.biddersRequiredLabel,
    joinListButtonLabel: data?.joinListButtonLabel,
    placeBidButtonLabel: data?.placeBidButtonLabel,
    moreInormationLabel: data?.moreInormationLabel,
    historyButtonLabel: data?.historyButtonLabel,
    automaticBidLabel: data?.automaticBidLabel,
    automaticBidCancelLabel: data?.automaticBidCancelLabel,
    automaticBidValue: data?.automaticBidValue,
    recentBidsLabel: data?.recentBidsLabel,
  };
};
