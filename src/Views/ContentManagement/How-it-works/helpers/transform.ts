import { CONTENT_ENUMS } from '../../../../Shared/constants';

export interface RoadMapItem {
  title: string;
  content: string;
  companyLogo?: File | string;
  errors: { [key: string]: string };
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

export const transformAPIRequestDataFaq = (
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
          return (
            title.trim() !== '' ||
            content.trim() !== '' ||
            companyLogo.trim() !== ''
          );
        }
        return (
          title.trim() !== '' ||
          content.trim() !== '' ||
          companyLogo?.fileURL.trim() !== ''
        );
      })
      .map(({ title, content, companyLogo }) => ({
        title: String(title),
        description: String(content),
        imageURL: companyLogo?.[0]?.fileURL,
      })),
  };
};
