// Define types for the PartnerItem
export interface PartnerItem {
  question: string;
  answer: string;
}

// Define the type for the data parameter
export interface FormData {
  title: string;
  faqTagLabel: string;
  isVisible?: boolean;
  faqIsVisible?: boolean;
  faqTitle?: boolean;
}

export const FAQ_SUB_ENUM = {
  FAQ: 'faq',
};
// Define the transform function with appropriate types
export const transformAPIRequestDataFaq = (
  data: FormData,
  roadMap: PartnerItem[]
) => {
  return {
    faqTitle: data.title,
    faqTagLabel: data.faqTagLabel,
    faqIsVisible: data?.isVisible || false,
    [FAQ_SUB_ENUM.FAQ]: roadMap
      .filter(
        ({ question, answer }) => question.trim() !== '' || answer.trim() !== ''
      )
      .map(({ question, answer }) => ({
        question: String(question),
        answer,
      })),
  };
};

export const transAPIRequestDataToFormFaq = (
  data: FormData // Assuming API response data might not be of type FormData
) => {
  return {
    title: data.faqTitle || '', // Convert back to form's title field
    faqTagLabel: data.faqTagLabel || '', // Convert back to form's description field
    isVisible: data.faqIsVisible || false, // Convert back to form's visibility field
    // companyLogo: data.faqImageURL ? [{ fileURL: data.faqImageURL }] : [],  // Convert URL back to form's file structure
  };
};
