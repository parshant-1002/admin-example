import { ImageConfig } from '../../../../../Models/common';

export interface Files {
  createdAt?: string;
  fileName?: string;
  fileURL?: string;
  url?: string;
  updatedAt?: string;
  _id?: string;
  assigned?: boolean;
  fileId?: string;
}

export interface FileData {
  file: File;
  src: string | ArrayBuffer | null | undefined;
}

export interface FileInputProps {
  value: Files[];
  onChange?: (files: Files[] | undefined) => void;
  label?: string;
  subLabel?: string;
  maxSize?: number;
  accept?: string;
  ratio?: number[];
  imageFileType?: string;
  fetchImageDataConfig?: ImageConfig[];
  singleImageSelectionEnabled?: boolean;
  hideListSelection?: boolean;
  [key: string]: unknown; // To handle any additional props
}
export interface DeleteData {
  data: { fileId?: (string | undefined)[]; isMultiDelete?: boolean } | null;
  show: boolean;
}

export interface ImageUploadResponse {
  fileName: string;
  fileUrl: string;
  fileId: string;
}
export interface QueryParams {
  [key: string]: string;
}
