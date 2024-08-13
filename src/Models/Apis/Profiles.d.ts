import { FileUpload, FileUploadData } from "../../Shared/Model";

export interface Profile {
  _id: string;
  profileName: string;
  profileDescription: string;
  skills: { label: string; value: string }[];
  filePath: FileUploadData[];
}
