import { CONTENT_ENUMS } from '../../../../Shared/constants';

export interface FormData {
  title: string;
  description: string;
  isVisible?: boolean;
}

interface PartnerItem {
  imageURL?: [{ fileURL: string }];
  title: string;
  content: string;
}

export const transformAPIRequestDataHowItsWork = (
  data: FormData,
  roadMap: PartnerItem[]
) => {
  return {
    howItWorksTitle: data.title,
    howItWorksTabLabel: data.description,
    howItWorksIsVisible: data?.isVisible || false,
    // faqImageURL: data?.companyLogo?.[0]?.fileURL,
    [CONTENT_ENUMS.HOW_IT_WORKS]: roadMap?.map(
      ({ title, content, imageURL }) => ({
        title: String(title),
        description: String(content),
        imageURL: imageURL?.[0]?.fileURL,
      })
    ),
  };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormHowItsWork = (
  data: {
    howItWorksTitle: string;
    howItWorksTabLabel: string;
    howItWorksIsVisible: boolean;
  } // Assuming API response data might not be of type TermsAndConditionsFormData
) => {
  return {
    title: data?.howItWorksTitle || '',
    tagLabel: data?.howItWorksTabLabel || '',
    isVisible: data?.howItWorksIsVisible || '',
  };
};
