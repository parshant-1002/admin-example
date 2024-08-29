// Define types for the SocialConnectItem
interface SocialConnectItem {
  imageURL?: [{ fileURL: string }];
  url: string;
}

// Define types for the ContactUs form data
export interface ContactUsFormData {
  phoneNumberImageURL: [{ fileURL: string }];
  phoneNumberTitle: string;
  phoneNumber: string;
  emailImageURL: [{ fileURL: string }];
  emailTitle: string;
  email: string;
  addressImageURL: [{ fileURL: string }];
  addressTitle: string;
  address: string;
  socialConnectTitle: string;
  contactUsMapLatitude: number;
  contactUsMapLongitude: number;
  contactUsIsVisible?: boolean;
  socialConnect?: SocialConnectItem[];
}

// Define the transform function to convert form data to API request format
export const transformAPIRequestDataContactUs = (
  data: ContactUsFormData
  // roadMap: SocialConnectItem[]F
) => {
  return {
    contactUs: {
      phoneNumberImageURL: data.phoneNumberImageURL?.[0]?.fileURL || '',
      phoneNumberTitle: data.phoneNumberTitle,
      phoneNumber: data.phoneNumber,
      emailImageURL: data.emailImageURL?.[0]?.fileURL || '',
      emailTitle: data.emailTitle,
      email: data.email,
      addressImageURL: data.addressImageURL?.[0]?.fileURL || '',
      addressTitle: data.addressTitle,
      address: data.address,
      socialConnectTitle: data.socialConnectTitle,
      // socialConnect: roadMap
      //   .filter(({ url, imageURL }) => {
      //     // Check if imageURL is an array of objects or a string
      //     if (Array.isArray(imageURL)) {
      //       return url.trim() !== '' || imageURL[0]?.fileURL?.trim() !== '';
      //     }
      //     return false;
      //   })
      //   .map(({ imageURL, url }) => ({
      //     imageURL: Array.isArray(imageURL)
      //       ? imageURL[0]?.fileURL || ''
      //       : String(imageURL),
      //     url: String(url),
      //   })),
    },
    contactUsMapLatitude: data.contactUsMapLatitude,
    contactUsMapLongitude: data.contactUsMapLongitude,
    contactUsIsVisible: data.contactUsIsVisible || false,
  };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormContactUs = (
  data: {
    contactUsMapLatitude: number;
    contactUsMapLongitude: number;
    contactUsIsVisible: boolean;
    contactUs: ContactUsFormData;
  } // Assuming API response data might not be of type ContactUsFormData
) => {
  return {
    phoneNumberImageURL: data.contactUs.phoneNumberImageURL
      ? [{ fileURL: data.contactUs.phoneNumberImageURL }]
      : [],
    phoneNumberTitle: data.contactUs.phoneNumberTitle || '',
    phoneNumber: data.contactUs.phoneNumber || '',
    emailImageURL: data.contactUs.emailImageURL
      ? [{ fileURL: data.contactUs.emailImageURL }]
      : [],
    emailTitle: data.contactUs.emailTitle || '',
    email: data.contactUs.email || '',
    addressImageURL: data.contactUs.addressImageURL
      ? [{ fileURL: data.contactUs.addressImageURL }]
      : [],
    addressTitle: data.contactUs.addressTitle || '',
    address: data.contactUs.address || '',
    socialConnectTitle: data.contactUs.socialConnectTitle || '',
    socialConnect: (data.contactUs.socialConnect || []).map(
      (item: SocialConnectItem) => ({
        imageURL: item.imageURL || '',
        url: item.url,
      })
    ),
    contactUsMapLatitude: data.contactUsMapLatitude || 0,
    contactUsMapLongitude: data.contactUsMapLongitude || 0,
    contactUsIsVisible: data.contactUsIsVisible || false,
  };
};
