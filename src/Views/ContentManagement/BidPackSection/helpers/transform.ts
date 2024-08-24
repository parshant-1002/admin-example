import { getStringValue } from '../../../../Shared/utils/functions';

interface SocialMediaData {
  url?: string;
  image?: string;
  hovers?: string;
}

interface ButtonData {
  url?: string;
  text?: string;
  image?: string;
}

interface APIData {
  premiumTokenTitle?: string;
  twitter?: SocialMediaData;
  discord?: SocialMediaData;
  telegram?: SocialMediaData;
  viewChartButton?: ButtonData;
  airdropButton?: ButtonData;
  buyTokenButton?: Omit<ButtonData, 'image'>;
  isVisible?: boolean;
}

interface TransformedData {
  logo?: string;
  twitterLink?: string;
  twitterImage?: string;
  twitterHoverImage?: string;
  discordLink?: string;
  discordImage?: string;
  discordHoverImage?: string;
  telegramLink?: string;
  telegramImage?: string;
  telegramHoverImage?: string;
  viewChartButtonLink?: string;
  viewChartButtonText?: string;
  airdropButtonLink?: string;
  airdropButtonImage?: string;
  airdropButtonText?: string;
  buyTokenButtonText?: string;
  buyTokenButtonLink?: string;
  isVisible?: boolean;
}

export const transformAPIData = (data: APIData): TransformedData => {
  const transformedData: TransformedData = {
    logo: data?.premiumTokenTitle,
    twitterLink: data?.twitter?.url,
    twitterImage: data?.twitter?.image,
    twitterHoverImage: data?.twitter?.hovers,
    discordLink: data?.discord?.url,
    discordImage: data?.discord?.image,
    discordHoverImage: data?.discord?.hovers,
    telegramLink: data?.telegram?.url,
    telegramImage: data?.telegram?.image,
    telegramHoverImage: data?.telegram?.hovers,
    viewChartButtonLink: data?.viewChartButton?.url,
    viewChartButtonText: data?.viewChartButton?.text,
    airdropButtonLink: data?.airdropButton?.url,
    airdropButtonImage: data?.airdropButton?.image,
    airdropButtonText: data?.airdropButton?.text,
    buyTokenButtonText: data?.buyTokenButton?.text,
    buyTokenButtonLink: data?.buyTokenButton?.url,
    isVisible: data?.isVisible,
  };
  return transformedData;
};

export const transformAPIRequestData = (data: TransformedData): APIData => {
  return {
    premiumTokenTitle: getStringValue(data.logo),
    twitter: {
      url: data?.twitterLink,
      image: getStringValue(data.twitterImage),
      hovers: data?.twitterHoverImage,
    },
    discord: {
      url: data?.discordLink,
      image: getStringValue(data.discordImage),
      hovers: data?.discordHoverImage,
    },
    telegram: {
      url: data?.telegramLink,
      image: getStringValue(data.telegramImage),
      hovers: data?.telegramHoverImage,
    },
    viewChartButton: {
      url: data?.viewChartButtonLink,
      text: data?.viewChartButtonText,
    },
    airdropButton: {
      url: data?.airdropButtonLink,
      image: getStringValue(data.airdropButtonImage),
      text: data?.airdropButtonText,
    },
    buyTokenButton: {
      url: data?.buyTokenButtonLink,
      text: data?.buyTokenButtonText,
    },
    isVisible: data?.isVisible || false,
  };
};
