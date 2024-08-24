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
}

export interface AddContentFormItem {
  id?: string;
  title?: string;
  content?: string;
  file?: [{ fileURL: string }];
  errors: { [key: string]: string };
  [key: string]: any;
}
export interface ImageConfig  {
  key?: string;
  value?: string;
};
