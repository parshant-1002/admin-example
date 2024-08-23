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

export interface ImageConfig  {
  key?: string;
  value?: string;
};