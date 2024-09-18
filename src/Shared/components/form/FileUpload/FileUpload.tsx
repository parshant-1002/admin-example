/* eslint-disable consistent-return */
// libs
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// types
import { ImageConfig } from '../../../../Models/common';
import {
  DeleteData,
  FileData,
  FileInputProps,
  Files,
  ImageUploadResponse,
  QueryParams,
} from './helpers/modal';

// redux
import {
  useFileDeleteMutation,
  useFileUploadMutation,
  useGetFilesQuery,
} from '../../../../Services/Api/module/file';
import { RootState } from '../../../../Store';
import {
  deletedImages,
  updateUploadedImages,
} from '../../../../Store/UploadedImages';

// consts
import { Delete, RED_WARNING } from '../../../../assets';
import {
  BUTTON_LABELS,
  CONFIRMATION_DESCRIPTION_IMAGE_DELETE,
  FILE_TYPE,
} from '../../../constants/constants';
import ERROR_MESSAGES from '../../../constants/messages';
import TOAST_MESSAGES from '../../../constants/toastMessages';
import {
  FILE_MAX_SIZE,
  IMAGE_TYPES,
  SPREAD_SHEET_TYPES,
  TABS,
} from './helpers/constants';

// utils
import {
  checkValidFileExtension,
  convertFilesToFormData,
  removeEmptyValues,
} from '../../../utils/functions';

// components
import ConfirmationModal from '../../ConfirmationModal';
import DefaultFile from './components/DefaultFile';
import FileRenderer from './components/FileRenderer';
import FileUploadModal from './components/FileUploadModal';
import ImageFile from './components/ImageFile';
import SpreadsheetFile from './components/SpreadsheetFile';

// styles
import './FileUpload.scss';

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      value,
      onChange = () => {},
      label,
      subLabel,
      maxSize = FILE_MAX_SIZE, // 6mb
      accept = '',
      singleImageSelectionEnabled = true,
      ratio = [],
      imageFileType = FILE_TYPE.CMS,
      fetchImageDataConfig,
      hideListSelection = false,
    },
    ref
  ) => {
    const [deleteModal, setDeleteModal] = useState<DeleteData>({
      show: false,
      data: { fileId: [''] },
    });
    const uploadedImages = useSelector(
      (state: RootState) => state.UploadedImages.images
    );
    const deletedIds = useSelector(
      (state: RootState) => state.UploadedImages.deletedIds
    );
    // CHECKING IS PRODUCT OR AUCTION IMAGE SELECTION
    const isProductAuction = useMemo(
      () =>
        [FILE_TYPE.AUCTION, FILE_TYPE.PRODUCT]?.includes(String(imageFileType)),
      [imageFileType]
    );
    // CHECKING IS PRODUCT OR AUCTION IMAGE SELECTION FOR CREATION PURPOSE
    const isCreateProductAuction = useMemo(
      () =>
        (fetchImageDataConfig || [])?.every((config) => !config.value) &&
        String(imageFileType) !== FILE_TYPE.CMS,
      [fetchImageDataConfig, imageFileType]
    );

    const createQueryParams = (config?: ImageConfig[]): QueryParams => {
      const params: QueryParams = {
        startDate: '',
        endDate: '',
        type: imageFileType ? String(imageFileType) : '',
      };

      config?.forEach(({ key, value: id }) => {
        params[String(key)] = id || '';
      });

      return params;
    };

    const dispatch = useDispatch();
    const [chooseFile, setChooseFile] = useState(value);
    const [fileValue, setFileValue] = useState<FileData[]>();
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState(
      hideListSelection ? TABS.FILE_UPLOAD : TABS.LIST_FILES
    );

    // API
    const [fileUpload] = useFileUploadMutation();
    const [fileDelete] = useFileDeleteMutation();
    const [selectedFiles, setSelectedFiles] = useState<Files[]>([]);

    useEffect(() => {
      const choosenFiles = chooseFile?.filter((file) => file?.assigned);
      const choosenFilesWithId = isProductAuction
        ? choosenFiles?.map((file) => {
            if (file?.fileId) {
              return {
                ...file,
                _id: file?.fileId,
              };
            }
            return file;
          })
        : chooseFile;
      setSelectedFiles(choosenFilesWithId);
    }, [chooseFile, isProductAuction]);

    const { data, refetch } = useGetFilesQuery(
      {
        params: removeEmptyValues(createQueryParams(fetchImageDataConfig)),
      },
      {
        skip: isCreateProductAuction,
      }
    );

    const imageList = {
      files: [...(uploadedImages || [])],
    };

    useEffect(() => {
      dispatch(updateUploadedImages(data?.files));
    }, [data?.files, dispatch]);

    useEffect(() => {
      if (value) setChooseFile(value);
    }, [value]);

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        // Clear previous file values
        setFileValue([]);

        acceptedFiles.forEach((file) => {
          if (!checkValidFileExtension(file.name, accept)) {
            toast.error(
              TOAST_MESSAGES(accept).PLEASE_UPLOAD_ONLY_ACCEPTED_FILES
            );
            return;
          }

          if (file.size > maxSize) {
            toast.error(ERROR_MESSAGES().FILE_SIZE_ERROR);
            return;
          }

          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const result = e.target?.result as string;

            if (ratio && ratio.length === 2) {
              // If ratio is provided, perform ratio check
              const img = new Image();
              img.onload = () => {
                const { width, height } = img;
                const calculatedRatio = width / height;
                const [firstValue, secondValue] = ratio;
                const calculatedRequiredRatio = firstValue / secondValue;

                if (Math.abs(calculatedRatio - calculatedRequiredRatio) < 0.1) {
                  // Image has the required aspect ratio (tolerance of 0.1)
                  setFileValue((prevState) => [
                    ...(prevState || []),
                    { file, src: result },
                  ]);
                } else {
                  toast.error(
                    TOAST_MESSAGES(firstValue, secondValue).IMAGE_RATIO_ERROR
                  );
                }
              };
              img.src = result;
            } else {
              // If no ratio is provided, just add the file
              setFileValue((prevState) => [
                ...(prevState || []),
                { file, src: result },
              ]);
            }
          };
          reader.readAsDataURL(file);
        });
      },
      [accept, maxSize, ratio] // Added ratio to dependency array
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      multiple: true,
    });

    const handleRemoveFile = useCallback((index: number) => {
      setFileValue(
        (prevState: FileData[] | undefined) =>
          prevState?.filter((_, i) => i !== index)
      );
    }, []);
    const handleDeleteFile = (
      fileId: (string | undefined)[],
      isMultiDelete?: boolean
    ) => {
      setDeleteModal({
        data: { fileId, isMultiDelete },
        show: true,
      });
    };
    const handleCloseDelete = () => {
      setDeleteModal({ data: null, show: false });
    };

    const handleDeleteClick = async () => {
      const { fileId, isMultiDelete } = deleteModal?.data || {};

      try {
        if (isProductAuction) {
          handleCloseDelete();
          const files = imageList?.files || [];

          // Filter and separate images based on deletion criteria
          const filteredImages = files.filter(
            (file: { _id: string }) => !fileId?.includes(file._id)
          );
          const deletedImagesFromList = files.filter(
            (file: { _id: string }) => fileId?.includes(file._id)
          );
          const deletedImagesArray = [
            ...(deletedIds || []),
            ...deletedImagesFromList,
          ];

          dispatch(deletedImages(deletedImagesArray));
          dispatch(updateUploadedImages(filteredImages));

          // Check if there are any remaining selected files after deletion
          const isLeftOutFilesSelected = filteredImages.some(
            (val: { _id: string }) =>
              selectedFiles?.some((file) => file._id === val._id)
          );

          // Reset state if multiple delete or no files are left selected
          if (isMultiDelete || !isLeftOutFilesSelected) {
            setChooseFile([]);
            onChange([]);
            setSelectedFiles([]);
          }
        } else {
          await fileDelete({
            payload: { fileId },
            onSuccess: (res: { message: string }) => {
              toast.success(res?.message);
              handleCloseDelete();
              if (isProductAuction && !isCreateProductAuction) {
                refetch();
              } else if (!isProductAuction) {
                refetch();
              }
            },
          });
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : ERROR_MESSAGES().SOMETHING_WENT_WRONG;
        toast.error(errorMessage);
      }
    };

    const renderSelectedFile = useMemo(() => {
      if (!fileValue) return null;

      return fileValue.map((fileData, index) => {
        const { type, name } = fileData?.file || {};
        const src = fileData?.src;

        if (!type || !name) return null;

        if (SPREAD_SHEET_TYPES.includes(type)) {
          return (
            <SpreadsheetFile
              key={type}
              name={name}
              index={index}
              handleRemoveFile={handleRemoveFile}
            />
          );
        }

        if (IMAGE_TYPES.includes(type) && src) {
          return (
            <ImageFile
              key={type}
              name={name}
              src={src as string}
              index={index}
              handleRemoveFile={handleRemoveFile}
            />
          );
        }

        return (
          <DefaultFile
            key={type}
            name={name}
            index={index}
            handleRemoveFile={handleRemoveFile}
          />
        );
      });
    }, [fileValue, handleRemoveFile]);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const generateFilesData = (files: Files[]) => {
      if (!isProductAuction) return files;

      const selectedFileIds = new Set(files?.map((file) => file._id));

      return imageList?.files?.map((file: { _id: string }) => ({
        ...file,
        assigned: selectedFileIds.has(file._id),
      }));
    };

    const handleChooseFile = (files: Files[] | undefined) => {
      if (!files || files?.length === 0) {
        return toast.error(TOAST_MESSAGES().SELECT_ATLEAST_ONE_FILE);
      }

      const firstFileUrl = files?.[0]?.fileURL || files?.[0]?.url;
      if (!checkValidFileExtension(firstFileUrl, accept)) {
        return toast.error(
          TOAST_MESSAGES(accept).PLEASE_CHOOSE_ONLY_ACCEPTED_FILES
        );
      }

      const filesData = generateFilesData(files);
      onChange(filesData);
      setChooseFile(filesData);
      closeModal();
    };

    const handleCloseModal = () => {
      if (isProductAuction && selectedFiles?.length && chooseFile?.length) {
        // Get the files to persist by filtering the selected files
        const filesToPersist = selectedFiles?.filter(
          (file) =>
            chooseFile?.some(
              (choosedFile) =>
                choosedFile.assigned &&
                (choosedFile.fileId || choosedFile._id) === file._id
            )
        );

        // Map over the image list files and mark the files that need to be persisted
        const updatedFiles = imageList?.files?.map((file: { _id: string }) => ({
          ...file,
          assigned: filesToPersist?.some(
            (selectedFile) => selectedFile._id === file._id
          ),
        }));

        // Trigger the onChange event with the updated files list
        onChange(updatedFiles);

        // Close the modal
      }
      closeModal();
    };
    const handleFileUpload = async () => {
      try {
        if (!fileValue || fileValue.length === 0) {
          return toast.error(TOAST_MESSAGES().SELECT_ATLEAST_ONE_FILE);
        }

        const fileList = fileValue as unknown as FileData[];
        const files = convertFilesToFormData(fileList, 'image');
        const filesWithType = files?.map((file) => {
          file.append('type', String(imageFileType));
          return file;
        });

        const uploadFile = (file: FormData) =>
          new Promise<{ fileName: string; fileUrl: string; fileId: string }>(
            (resolve, reject) => {
              fileUpload({
                payload: file,
                onSuccess: (
                  res: ImageUploadResponse | PromiseLike<ImageUploadResponse>
                ) => resolve(res),
                onError: (error: unknown) => reject(error),
              });
            }
          );

        // Upload files in parallel
        const uploadedFiles = await Promise.all(
          filesWithType.map((file) => uploadFile(file))
        );

        const responseData = uploadedFiles.map((res) => ({
          fileName: res.fileName,
          fileURL: res.fileUrl,
          _id: res.fileId,
        }));

        // Merge with existing files
        const imageData = [...(imageList.files || []), ...responseData];
        const allAssignedData = imageData.map((val) => ({
          ...val,
          assigned: true,
        }));

        // Dispatch actions based on conditions
        if (isProductAuction) {
          const finalData = hideListSelection ? allAssignedData : imageData;
          dispatch(updateUploadedImages(finalData));
          if (hideListSelection) {
            onChange(allAssignedData);
            setChooseFile(allAssignedData);
          } else {
            setActiveTab(TABS.LIST_FILES);
          }
        } else {
          onChange(responseData);
          setChooseFile(responseData);
        }
        setShowModal(false);
        setFileValue([]);
        refetch();
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
        }
      }
    };

    const handleClickDeleteOnSelectedImages = (img: Files) => {
      const filteredFiles = chooseFile?.filter(
        (file) => file?._id !== img?._id
      );
      setChooseFile(filteredFiles);
      onChange(filteredFiles);
    };

    return (
      <>
        <ConfirmationModal
          title={CONFIRMATION_DESCRIPTION_IMAGE_DELETE}
          open={deleteModal?.show}
          handleClose={handleCloseDelete}
          showCancelButton
          submitButtonText={BUTTON_LABELS.YES}
          cancelButtonText={BUTTON_LABELS.NO}
          icon={RED_WARNING}
          handleSubmit={handleDeleteClick}
          showClose={false}
        />
        <div className="form-control">
          <Button
            className="btn btn-md my-2  me-2"
            variant="primary"
            onClick={openModal}
          >
            {chooseFile?.length
              ? BUTTON_LABELS.CHANGE_FILE
              : BUTTON_LABELS.CHOOSE_FILE}
          </Button>
          {chooseFile?.length ? (
            <div className="p-3">
              <div className="grid-container">
                {chooseFile?.map((img) => {
                  if (isProductAuction && !img.assigned) {
                    return null;
                  }
                  return (
                    <div key={img.url || img.fileURL} className="grid-item m-2">
                      <span className="uploaded_file position-relative">
                        {hideListSelection ? (
                          <button
                            type="button"
                            className="btn  btn-danger d-inline-flex align-items-center justify-content-center btn-danger-outline ms-2 uploaded-pic-grid__delete-button"
                            onClick={() =>
                              handleClickDeleteOnSelectedImages(img)
                            }
                          >
                            <img src={Delete} alt="delete" />
                          </button>
                        ) : null}
                        <FileRenderer fileURL={img.url || img.fileURL} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        <FileUploadModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          label={label}
          subLabel={subLabel}
          accept={accept}
          ratio={ratio}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          chooseFile={chooseFile}
          handleChooseFile={handleChooseFile}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          fileValue={fileValue}
          imageList={imageList}
          handleDeleteFile={handleDeleteFile}
          singleImageSelectionEnabled={singleImageSelectionEnabled}
          handleFileUpload={handleFileUpload}
          renderSelectedFile={renderSelectedFile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ref={ref}
          hideListSelection={hideListSelection}
        />
      </>
    );
  }
);

FileInput.displayName = 'FileInput';
export default FileInput;
