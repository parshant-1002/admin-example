import { CONTENT_ENUMS } from '../../../../Shared/constants';

export interface RoadMapItem {
  id?: string;
  title: string;
  content?: string;
  companyLogo?: File | string;
  errors: { [key: string]: string };
  [key: string]: any;
}

export interface FormData {
  title: string;
  description: string;
  isVisible?: boolean;
}

interface PartnerItem {
  companyLogo: File | string;
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
    [CONTENT_ENUMS.HOW_IT_WORKS]: roadMap
      .filter(({ title, content, companyLogo }) => {
        if (typeof companyLogo === 'string') {
          return title.trim() !== '' || content.trim() !== '' || companyLogo.trim() !== '';
        } else if (companyLogo instanceof File) {
          return title.trim() !== '' || content.trim() !== '' || (companyLogo as any)?.fileURL?.trim() !== '';
        }
        return title.trim() !== '' || content.trim() !== '';
      })
      .map(({ title, content, companyLogo }) => ({
        title: String(title),
        description: String(content),
        imageURL: typeof companyLogo === 'string' ? companyLogo : (companyLogo as any)?.fileURL,
      })),
  };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormHowItsWork = (
  data: any // Assuming API response data might not be of type TermsAndConditionsFormData
) => {
  return {
      title: data?.howItWorksTitle || '',
      isVisible: data?.howItWorksIsVisible || '',
  };
};
