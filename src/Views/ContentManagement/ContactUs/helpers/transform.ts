// Define types for the SocialConnectItem
interface SocialConnectItem {
    imageURL: string;
    url: string;
}

// Define types for the ContactUs form data
export interface ContactUsFormData {
    phoneNumberImageURL: File | string | any;
    phoneNumberTitle: string;
    phoneNumber: string;
    emailImageURL: File | string | any;
    emailTitle: string;
    email: string;
    addressImageURL: File | string | any;
    addressTitle: string;
    address: string;
    socialConnectTitle: string;
    socialConnect: SocialConnectItem[];
    contactUsMapLatitude: number;
    contactUsMapLongitude: number;
    contactUsIsVisible?: boolean;
}

// Define the transform function to convert form data to API request format
export const transformAPIRequestDataContactUs = (
    data: ContactUsFormData
) => {
    return {
        contactUs:{
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
            socialConnect: data.socialConnect
                .filter(({ imageURL, url }) => imageURL.trim() !== '' && url.trim() !== '')
                .map(({ imageURL, url }) => ({
                    imageURL: String(imageURL),
                    url: String(url)
                })),
        },    
        contactUsMapLatitude: data.contactUsMapLatitude,
        contactUsMapLongitude: data.contactUsMapLongitude,
        contactUsIsVisible: data.contactUsIsVisible || false,
    };
};

// Define the transform function to convert API response data back to form format
export const transAPIRequestDataToFormContactUs = (
    data: any // Assuming API response data might not be of type ContactUsFormData
) => {
    return {
        phoneNumberImageURL: data.phoneNumberImageURL ? [{ fileURL: data.phoneNumberImageURL }] : [],
        phoneNumberTitle: data.phoneNumberTitle || '',
        phoneNumber: data.phoneNumber || '',
        emailImageURL: data.emailImageURL ? [{ fileURL: data.emailImageURL }] : [],
        emailTitle: data.emailTitle || '',
        email: data.email || '',
        addressImageURL: data.addressImageURL ? [{ fileURL: data.addressImageURL }] : [],
        addressTitle: data.addressTitle || '',
        address: data.address || '',
        socialConnectTitle: data.socialConnectTitle || '',
        socialConnect: (data.socialConnect || []).map((item: any) => ({
            imageURL: item.imageURL || '',
            url: item.url || '',
        })),
        contactUsMapLatitude: data.contactUsMapLatitude || 0,
        contactUsMapLongitude: data.contactUsMapLongitude || 0,
        contactUsIsVisible: data.contactUsIsVisible || false,
    };
};

// Define types for the RoadMapItem (if necessary for a different part of the form)
export interface RoadMapItem {
    id?: string;
    title: string;
    content?: string;
    companyLogo?: File | string;
    errors: { [key: string]: string };
    [key: string]: any;
}
