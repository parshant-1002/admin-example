export interface Image {
  _id?: string;
  url?: string;
  title?: string;
  fileURL?: string;
  fileName?: string;
  assigned?: boolean;
  fileId?: string;
}

export interface SelectOption {
  value?: number | string;
  label?: string | number;
  icon?: string;
}

export interface SubContent {
  id?: string;
  title?: string;
  content?: string;
  file?: [{ fileURL: string }];
  errors: { [key: string]: string };
}
export interface AddContentFormItem {
  id?: string;
  title?: string;
  content?: string;
  file?: [{ fileURL: string; fileId: string; _id?: string }];
  errors?: { [key: string]: string };
  subContent?: SubContent[];
  [key: string]: any;
}
export interface ImageConfig {
  key?: string;
  value?: string;
}

export interface ProductDetailResponsePayload {
  id_: string;
  title: string;
  bidStartDate: string;
  bidDuration: number;
  reservePrice: string;
  preAuctionPrice: string;
  reserveWaitingEndDate: string;
  status: number;
  uniqueUserCount: number;
  prizeClaimDays: number;
}

export interface AuctionDetailsColumnData {
  title?: string;
  fieldName?: string;
  isTurncated?: boolean;
  isEditable?: boolean;
  info?: boolean;
  type?: DetailType;
  options?: OptionType[];
  render?: (
    row: ProductDetailResponsePayload,
    val: string | number | number[]
  ) => JSX.Element[] | string | JSX.Element | string[];
}


export interface OnQueryStartedArgs {
  onSuccess?: (data: unknown) => void;
  onFailure?: (error: ErrorResponse) => void;
}