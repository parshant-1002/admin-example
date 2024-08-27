import { containsHTML, htmlToText } from '../../../BidsPlan/helpers/utils';

interface APIData {
  type?: number;
  text?: string;
  htmlText?: string;
  description?: string;
  htmlDescription?: string;
  icon?: string;
  backgroundColor?: string;
  isEnabled?: boolean;
}

export interface TransformedData {
  type?: number;
  text?: string;
  htmlText?: string;
  description?: string;
  htmlDescription?: string;
  icon?: [{ fileURL?: string }];
  backgroundColor?: string;
  isEnabled?: boolean;
}

export const transformAPIData = (data: APIData): TransformedData => {
  const transformedData: TransformedData = {
    ...data,
    icon: [{ fileURL: data?.icon }],
    text: data?.htmlText,
    description: data?.htmlDescription,
  };
  return transformedData;
};

export const transformAPIRequestData = (
  data: TransformedData,
  type: number
): APIData => {
  let payload;
  payload = {
    icon: data?.icon?.[0]?.fileURL,
    backgroundColor: data?.backgroundColor,
    description: data?.description,
    isEnabled: data?.isEnabled,
    text: data?.text,
    htmlText: data?.text,
    htmlDescription: data?.description,
    type,
  };
  if (data?.text && containsHTML(data?.text)) {
    payload = {
      ...payload,
      text: htmlToText(data?.text),
    };
  }
  if (data?.description && containsHTML(data?.description)) {
    payload = {
      ...payload,
      description: htmlToText(data?.description),
    };
  }
  return payload;
};
