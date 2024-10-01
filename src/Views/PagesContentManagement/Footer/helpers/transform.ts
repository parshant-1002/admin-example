import { AddContentFormItem } from '../../../../Models/common';
import { STRINGS } from '../../../../Shared/constants/constants';

// Define types for the SocialConnectItem
interface SocialConnectItem {
  imageURL?: [{ fileURL: string }] | undefined[];
  url: string;
}

export interface SectionEntries {
  label: string;
  url: string;
}

export interface Sections {
  title: string;
  entries: SectionEntries[];
}
// Define types for the Footer form data
export interface FooterFormData {
  title: string;
  description: string;
  socialConnectTitle: string;
  socialConnect: SocialConnectItem[];
  sectionTitle1: string;
  sectionEntries1: [
    {
      label?: string;
      url?: string;
    },
  ];
  sectionTitle2: string;
  sectionEntries2: [
    {
      label?: string;
      url?: string;
    },
  ];
  sectionTitle3: string;
  sectionEntries3: [
    {
      label?: string;
      url?: string;
    },
  ];
  copyrightLabel: string;
  isVisible: string;
}

export interface SectionEntriesKeys {}

// Define the transform function to convert form data to API request format
export const transformAPIRequestDataFooter = (
  data: FooterFormData,
  socialConectItems: SocialConnectItem[],
  section1Content: AddContentFormItem[],
  section2Content: AddContentFormItem[],
  section3Content: AddContentFormItem[]
) => {
  return {
    title: data?.title,
    description: data?.description,
    socialConnectTitle: data?.socialConnectTitle,
    socialConnect: socialConectItems?.map(({ imageURL, url }) => ({
      imageURL: Array.isArray(imageURL)
        ? imageURL[0]?.fileURL ?? STRINGS.EMPTY_STRING
        : String(imageURL),
      url: String(url),
    })),
    sectionTitle1: data?.sectionTitle1,
    sectionTitle2: data?.sectionTitle2,
    sectionTitle3: data?.sectionTitle3,
    sectionEntries1: section1Content.map(({ title, content }) => ({
      label: String(title),
      url: String(content),
    })),
    sectionEntries2: section2Content.map(({ title, content }) => ({
      label: String(title),
      url: String(content),
    })),
    sectionEntries3: section3Content.map(({ title, content }) => ({
      label: String(title),
      url: String(content),
    })),
    copyrightLabel: data?.copyrightLabel,
    isVisible: data?.isVisible,
  };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormFooter = (
  data: FooterFormData // Assuming API response data might not be of type FooterFormData
) => {
  return {
    ...data,
    title: data?.title,
    description: data?.description,
    socialConnectTitle: data?.socialConnectTitle,
    copyrightLabel: data?.copyrightLabel,
    isVisible: data?.isVisible,
  };
};

export const transfornSectionEntriesData = (
  data: FooterFormData,
  key: 'sectionEntries1' | 'sectionEntries2' | 'sectionEntries3'
) =>
  data?.[key]?.map(({ label, url }: { label?: string; url?: string }) => ({
    title: String(label) || '',
    content: String(url) || '',
  }));
