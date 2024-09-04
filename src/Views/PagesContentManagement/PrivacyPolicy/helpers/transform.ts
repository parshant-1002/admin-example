// Define types for the SectionItem (if necessary for a different part of the form)
interface SectionItem {
  content: string;
}

// Define types for the Terms and Conditions form data
export interface PrivacyPolicyData {
  title: string;
  description: string;
  moreInformationTitle: string;
  headerImageFileId: string;
  headerImageURL: string;
  sections: string[];
  image: [{ fileURL: string; fileId: string }];
}

// Define the transform function to convert form data to API request format
export const transformAPIRequestDataPrivacyAndPolicy = (
  data: PrivacyPolicyData,
  roadMap: SectionItem[]
) => {
  return {
    title: data.title,
    description: data.description,
    headerImageFileId: data?.image?.[0]?.fileId,
    headerImageURL: data?.image?.[0]?.fileURL,
    moreInformationTitle: data.moreInformationTitle,
    sections: roadMap.map((section) => section.content),
  };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormPrivacyPolicy = (
  data: PrivacyPolicyData // Assuming API response data might not be of type PrivacyPolicyData
) => {
  return {
    title: data?.title || '',
    description: data?.description || '',
    image: [{ fileURL: data?.headerImageURL, fileId: data?.headerImageFileId }],
    moreInformationTitle: data?.moreInformationTitle || '',
  };
};
