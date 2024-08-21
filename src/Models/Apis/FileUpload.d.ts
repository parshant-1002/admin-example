export interface UploadResponse {
  statusCode: number;
  status: boolean;
  message: string;
  type: string;
  data: FileData;
}

export interface FileData {
  fileUrl: string;
  originalname: string;
}
