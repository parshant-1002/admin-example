import { CONTENT_ENUMS } from "../../../../Shared/constants/index";


// Define types for the PartnerItem
interface PartnerItem {
    question: string ;
    answer: string;
}

// Define the type for the data parameter
export interface FormData {
    title: string;
    description: string;
    isVisible?: boolean;
    companyLogo: File | string | any; // Depending on your use case, it can be a File object or a URL string
}

// Define the transform function with appropriate types
export const transformAPIRequestDataFaq = (
    data: FormData,
    roadMap: PartnerItem[]
) => {    
    return {
        faqTitle: data.title,
        faqTagLabel: data.description,
        faqIsVisible: data?.isVisible || false,
        faqImageURL: (data?.companyLogo?.[0]?.fileURL),
        [CONTENT_ENUMS.FAQS]: roadMap
        .filter(({ question, answer }) => question.trim() !== '' || answer.trim() !== '')
        .map(({ question, answer }) => ({
            question: String(question),
            answer
        }))
    };
};

export const transAPIRequestDataToFormFaq = (
    data: any, // Assuming API response data might not be of type FormData
) => {    
    return {
        title: data.faqTitle || '',  // Convert back to form's title field
        description: data.faqTagLabel || '',  // Convert back to form's description field
        isVisible: data.faqIsVisible || false,  // Convert back to form's visibility field
        companyLogo: data.faqImageURL ? [{ fileURL: data.faqImageURL }] : [],  // Convert URL back to form's file structure
    };
};


export interface RoadMapItem {
    id?: string;
    title: string;
    content?: string;
    companyLogo?: File | string;
    errors: { [key: string]: string };
    [key: string]: any;
  }
