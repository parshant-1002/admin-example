import { BaseQueryApi, MutationDefinition } from '@reduxjs/toolkit/dist/query';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { ImageConfig } from '../../../../../Models/common';
import { FILE_TYPE, STRINGS } from '../../../../constants/constants';
import {
  DeleteData,
  FileData,
  Files,
  ImageUploadResponse,
  QueryParams,
} from './modal';
import { convertFilesToFormData } from '../../../../utils/functions';

const checkIsCreateProductAuction = (
  fetchImageDataConfig?: ImageConfig[],
  imageFileType?: string
) =>
  (fetchImageDataConfig ?? [])?.every((config) => !config.value) &&
  String(imageFileType) !== FILE_TYPE.CMS;

const checkIsProductAuction = (imageFileType?: string) =>
  [FILE_TYPE.AUCTION, FILE_TYPE.PRODUCT]?.includes(String(imageFileType));

const createQueryParams = (
  config?: ImageConfig[],
  imageFileType?: string
): QueryParams => {
  const params: QueryParams = {
    startDate: '',
    endDate: '',
    type: imageFileType ? String(imageFileType) : '',
  };

  config?.forEach(({ key, value: id }) => {
    params[String(key)] = id ?? '';
  });

  return params;
};
const getChoosenFilesWithId = (
  chooseFile: Files[],
  isProductAuction: boolean
) => {
  const choosenFilesWithAssignedKey = chooseFile?.filter(
    (file) => file?.assigned
  );
  const choosenFilesWithId = isProductAuction
    ? choosenFilesWithAssignedKey?.map((file) => {
        if (file?.fileId) {
          return {
            ...file,
            _id: file?.fileId,
          };
        }
        return file;
      })
    : chooseFile;
  return choosenFilesWithId;
};
const getDeleteImageFunctionVariables = (
  isCreateProductAuction: boolean,
  isProductAuction: boolean,
  deleteModal: DeleteData,
  imageList: { files: Files[] },
  deletedIds: Files[] | null,
  selectedFiles: Files[]
) => {
  const { fileId, isMultiDelete } = deleteModal?.data ?? {};

  const files = imageList?.files ?? [];

  // Filter and separate images based on deletion criteria
  const filteredImages = files.filter(
    (file: Files) => !fileId?.includes(file._id)
  );
  const deletedImagesFromList = files.filter(
    (file: Files) => fileId?.includes(file._id)
  );
  const deletedImagesArray = [...(deletedIds ?? []), ...deletedImagesFromList];
  const isLeftOutFilesSelected = filteredImages.some(
    (val: Files) => selectedFiles?.some((file) => file._id === val._id)
  );
  const shouldRefetch = !isCreateProductAuction || !isProductAuction;
  const isResetValuesForProductionAuction =
    isMultiDelete ?? !isLeftOutFilesSelected;
  return {
    shouldRefetch,
    isResetValuesForProductionAuction,
    deletedImagesArray,
    filteredImages,
    fileId,
  };
};

const getCloseModalVariables = (
  selectedFiles: Files[],
  chooseFile: Files[],
  imageList: { files: Files[] }
) => {
  const filesToPersist = selectedFiles?.filter(
    (file) =>
      chooseFile?.some(
        (choosedFile) =>
          choosedFile.assigned &&
          (choosedFile.fileId ?? choosedFile._id) === file._id
      )
  );
  // Map over the image list files and mark the files that need to be persisted
  const updatedFiles = imageList?.files?.map((file: Files) => ({
    ...file,
    assigned: filesToPersist?.some(
      (selectedFile) => selectedFile._id === file._id
    ),
  }));
  return { updatedFiles };
};
const uploadFile = (
  file: FormData,
  fileUpload: MutationTrigger<
    MutationDefinition<
      unknown,
      (
        args: Record<string, unknown>,
        api: BaseQueryApi,
        extraOptions: object
      ) => Promise<QueryReturnValue<unknown, unknown, object>>,
      never,
      unknown,
      'api'
    >
  >
) =>
  new Promise<{ fileName: string; fileUrl: string; fileId: string }>(
    (resolve, reject) => {
      fileUpload({
        payload: file,
        onSuccess: (
          res: ImageUploadResponse | PromiseLike<ImageUploadResponse>
        ) => resolve(res),
        onError: (error: unknown) => {
          if (!(error instanceof Error)) {
            reject(
              new Error(
                typeof error === 'string' ? error : STRINGS.FILE_UPLOAD_FAILED
              )
            );
          } else {
            reject(error);
          }
        },
      });
    }
  );

const getUploadFileVariables = async (
  hideListSelection: boolean,
  fileValue: FileData[] | undefined,
  fileUpload: MutationTrigger<
    MutationDefinition<
      unknown,
      (
        args: Record<string, unknown>,
        api: BaseQueryApi,
        extraOptions: object
      ) => Promise<QueryReturnValue<unknown, unknown, object>>,
      never,
      unknown,
      'api'
    >
  >,
  imageList: { files: Files[] },
  imageFileType: string | undefined = FILE_TYPE.CMS
) => {
  const fileList = fileValue as FileData[];
  const files = convertFilesToFormData(fileList, 'image');
  const filesWithType = files?.map((file) => {
    file.append('type', imageFileType ?? STRINGS.EMPTY_STRING);
    return file;
  });

  // Upload files in parallel
  const uploadedFiles = await Promise.all(
    filesWithType.map((file) => uploadFile(file, fileUpload))
  );

  const responseData = uploadedFiles.map((res) => ({
    fileName: res.fileName,
    fileURL: res.fileUrl,
    _id: res.fileId,
  }));

  // Merge with existing files
  const imageData = [...(imageList.files ?? []), ...responseData];
  const allAssignedData = imageData.map((val) => ({
    ...val,
    assigned: true,
  }));
  const finalDataForProductAuction = hideListSelection
    ? allAssignedData
    : imageData;
  return { finalDataForProductAuction, allAssignedData, responseData };
};
export {
  checkIsCreateProductAuction,
  checkIsProductAuction,
  createQueryParams,
  getUploadFileVariables,
  getChoosenFilesWithId,
  getCloseModalVariables,
  getDeleteImageFunctionVariables,
  uploadFile,
};
