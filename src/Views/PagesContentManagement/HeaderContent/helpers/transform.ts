import { AddContentFormItem } from '../../../../Models/common';

interface ImageData {
  fileURL: string;
  fileId: string;
  _id: string;
}

export interface APIData {
  logoText: string;
  homeLabel: string;
  howItWorksLabel: string;
  auctionsLabel: string;
  buyCreditsLabel: string;
  searchPlaceholder: string;
  loginButtonLabel: string;
  registerButtonLabel: string;
  userProfileIcon: ImageData[];
  logo: ImageData[];
  logoutIcon: ImageData[];
  notificationIcon: ImageData[];
  walletIcon: ImageData[];
  isVisible: boolean;
}

interface TransformedData {
  logoText: string;
  homeLabel: string;
  howItWorksLabel: string;
  auctionsLabel: string;
  buyCreditsLabel: string;
  searchPlaceholder: string;
  loginButtonLabel: string;
  registerButtonLabel: string;
  userProfileIconFileId: string;
  userProfileIconURL: string;
  logoFileId: string;
  logoImgURL: string;
  logoutFileId: string;
  logoutURL: string;
  notificationFileId: string;
  notificationURL: string;
  walletIconFileId: string;
  walletIconURL: string;
  isVisible: boolean;
  menuItems?: {
    title?: string;
    fileId?: string;
    imageURL?: string;
  }[];
}

export const transformAPIData = (
  data: APIData,
  dropDownItems: AddContentFormItem[]
) => {
  const transformedData: TransformedData = {
    logoText: data?.logoText,
    homeLabel: data?.homeLabel,
    howItWorksLabel: data?.howItWorksLabel,
    auctionsLabel: data?.auctionsLabel,
    buyCreditsLabel: data?.buyCreditsLabel,
    searchPlaceholder: data?.searchPlaceholder,
    loginButtonLabel: data?.loginButtonLabel,
    registerButtonLabel: data?.registerButtonLabel,
    logoFileId: data?.logo?.[0]?.fileId || data?.logo?.[0]?._id,
    logoImgURL: data?.logo?.[0]?.fileURL,
    userProfileIconFileId:
      data?.userProfileIcon?.[0]?.fileId || data?.userProfileIcon?.[0]?._id,
    userProfileIconURL: data?.userProfileIcon?.[0]?.fileURL,
    logoutFileId: data?.logoutIcon?.[0]?.fileId || data?.logoutIcon?.[0]?._id,
    logoutURL: data?.logoutIcon?.[0]?.fileURL,
    notificationFileId:
      data?.notificationIcon?.[0]?.fileId || data?.notificationIcon?.[0]?._id,
    notificationURL: data?.notificationIcon?.[0]?.fileURL,
    walletIconFileId:
      data?.walletIcon?.[0]?.fileId || data?.walletIcon?.[0]?._id,
    walletIconURL: data?.walletIcon?.[0]?.fileURL,
    isVisible: data?.isVisible,
    menuItems: dropDownItems?.map((item) => ({
      title: item?.title,
      fileId: item?.file?.[0]?.fileId || item?.file?.[0]?._id,
      imageURL: item?.file?.[0]?.fileURL,
    })),
  };
  return transformedData;
};

export const transformAPIRequestData = (data: TransformedData) => {
  return {
    logoText: data?.logoText,
    homeLabel: data?.homeLabel,
    howItWorksLabel: data?.howItWorksLabel,
    auctionsLabel: data?.auctionsLabel,
    buyCreditsLabel: data?.buyCreditsLabel,
    searchPlaceholder: data?.searchPlaceholder,
    loginButtonLabel: data?.loginButtonLabel,
    registerButtonLabel: data?.registerButtonLabel,
    userProfileIcon: [
      {
        fileId: data?.userProfileIconFileId,
        fileURL: data?.userProfileIconURL,
      },
    ],
    logo: [
      {
        fileId: data?.logoFileId,
        fileURL: data?.logoImgURL,
      },
    ],
    logoutIcon: [{ fileId: data?.logoutFileId, fileURL: data?.logoutURL }],
    notificationIcon: [
      { fileId: data?.notificationFileId, fileURL: data?.notificationURL },
    ],
    walletIcon: [
      { fileId: data?.walletIconFileId, fileURL: data?.walletIconURL },
    ],
    isVisible: data?.isVisible,
  };
};
