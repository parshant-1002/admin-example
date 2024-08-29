import { AddContentFormItem } from '../../../../Models/common';

// Define types for the Terms and Conditions form data
export interface ReferralSectionFormData {
  productColumnLabel: string;
  auctonStartedColumnLabel: string;
  bidsColumnLabel: string;
  bidPlacedOnColumnLabel: string;
  reservePriceColumnLabel: string;
  yourBidColumnLabel: string;
  currentBidColumnLabel: string;
  timeLeftColumnLabel: string;
  actionColumnLabel: string;
  placeBidButtonLabel: string;
  finishedLabel: string;
}

// Define the transform function to convert form data to API request format
export const transformAPIRequestDataReferralSection = (
  data: ReferralSectionFormData,
  socialConnectContent: AddContentFormItem[]
) => {
  return {
    ...data,
    socialConnect: socialConnectContent.map(({ file, title }) => ({
      imageURL: file?.[0]?.fileURL,
      fileId: file?.[0]?.fileId,
      url: String(title),
    })),
  };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormReferralSection = (
  data: ReferralSectionFormData // Assuming API response data might not be of type ReferralSectionFormData
) => {
  return { ...data };
};
