/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ImageConfig } from '../../../../Models/common';
import {
  useFileDeleteMutation,
  useFileUploadMutation,
  useGetFilesQuery,
} from '../../../../Services/Api/module/file';
import { RootState } from '../../../../Store';
import { updateUploadedImages } from '../../../../Store/UploadedImages';
import { RED_WARNING } from '../../../../assets';
import {
  BUTTON_LABELS,
  CONFIRMATION_DESCRIPTION_IMAGE_DELETE,
  FILE_TYPE,
  STRINGS,
  TOAST_MESSAGES,
} from '../../../constants';
import ERROR_MESSAGES from '../../../constants/messages';
import {
  checkValidFileExtension,
  convertFilesToFormData,
  removeEmptyValues,
} from '../../../utils/functions';
import ConfirmationModal from '../../ConfirmationModal';
import CustomModal from '../../CustomModal';
import FileRenderer from './FileRenderer';
import './FileUpload.scss';
import ListFiles from './ListFiles';
import { FileData, Files } from './helpers/modal';

const TABS = {
  FILE_UPLOAD: 'fileUpload',
  LIST_FILES: 'listFiles',
};
interface FileInputProps {
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
  [key: string]: unknown; // To handle any additional props
}
interface DeleteData {
  data: { fileId?: (string | undefined)[]; isMultiDelete?: boolean } | null;
  show: boolean;
}
interface QueryParams {
  [key: string]: string;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      value,
      onChange = () => {},
      label,
      subLabel,
      maxSize = 50000000, // 6mb
      accept = '',
      singleImageSelectionEnabled = true,
      ratio = [],
      imageFileType = FILE_TYPE.CMS,
      fetchImageDataConfig,
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
    const [activeTab, setActiveTab] = useState(TABS.LIST_FILES);

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
      files: [...(data?.files || []), ...(uploadedImages || [])],
    };

    useEffect(() => {
      if (value) setChooseFile(value);
    }, [value]);

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        setFileValue([]);
        acceptedFiles.forEach((file) => {
          if (file && checkValidFileExtension(file?.name, accept)) {
            if (file.size <= maxSize) {
              const reader = new FileReader();
              reader.onload = (e: ProgressEvent<FileReader>) => {
                if (ratio?.length) {
                  // If a ratio is provided, perform the ratio check
                  const img = new Image();
                  img.onload = () => {
                    const { width, height } = img;
                    const calculatedRatio = width / height;
                    const [firstValue, secondValue] = ratio;
                    const calculatedRequiredRatio = firstValue / secondValue;
                    if (
                      calculatedRatio.toFixed(2) ===
                      Number(calculatedRequiredRatio).toFixed(2)
                    ) {
                      // Image has the required aspect ratio
                      setFileValue((prevState: FileData[] | undefined) => [
                        ...(prevState || []),
                        { file, src: e?.target?.result },
                      ]);
                    } else {
                      toast.error(
                        TOAST_MESSAGES(firstValue, secondValue)
                          .IMAGE_RATIO_ERROR
                      ); // Customize your error message
                    }
                  };
                  img.src = e?.target?.result as string;
                } else {
                  // If no ratio is provided, just proceed
                  setFileValue((prevState: FileData[] | undefined) => [
                    ...(prevState || []),
                    { file, src: e?.target?.result },
                  ]);
                }
              };
              reader.readAsDataURL(file);
            } else {
              toast.error(ERROR_MESSAGES().FILE_SIZE_ERROR);
            }
          } else {
            toast.error(
              TOAST_MESSAGES(accept).PLEASE_UPLOAD_ONLY_ACCEPTED_FILES
            );
          }
        });
      },
      [accept, maxSize, ratio] // Added ratio to dependency array
    );

    const handleFileUpload = async () => {
      try {
        if (fileValue?.length === 0) {
          return toast.error(TOAST_MESSAGES().SELECT_ATLEAST_ONE_FILE);
        }

        const fileList = fileValue as unknown as FileData[];
        const files = convertFilesToFormData(fileList, 'image');
        const filesWithType = files?.map((file) => {
          file.append('type', String(imageFileType));
          return file;
        });

        const responseData: {
          fileName: string;
          fileURL: string;
          _id: string;
        }[] = [];

        // Loop through each file and upload them sequentially
        for (const file of filesWithType) {
          await new Promise<void>((resolve, reject) => {
            fileUpload({
              payload: file,
              onSuccess: (res: {
                fileName: string;
                fileUrl: string;
                fileId: string;
              }) => {
                responseData.push({
                  fileName: res?.fileName,
                  fileURL: res?.fileUrl,
                  _id: res?.fileId,
                });
                resolve();
              },
              onError: (error: unknown) => {
                reject(error);
              },
            });
          });
        }

        // Update state and perform any necessary actions after all uploads are complete
        if (isProductAuction) {
          dispatch(
            updateUploadedImages([
              ...(uploadedImages || []),
              ...(responseData || []),
            ])
          );
        }
        setFileValue([]);
        if (isProductAuction && !isCreateProductAuction) {
          refetch();
        } else if (!isProductAuction) {
          refetch();
        }
        setActiveTab(TABS.LIST_FILES);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
        }
      }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      multiple: true,
    });

    const handleRemoveFile = (index: number) => {
      setFileValue(
        (prevState: FileData[] | undefined) =>
          prevState?.filter((_, i) => i !== index)
      );
    };
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
      const fileId = deleteModal?.data?.fileId;
      const isMultiDelete = deleteModal?.data?.isMultiDelete;
      try {
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
        if (isProductAuction) {
          const filteredImages = (uploadedImages || imageList?.files)?.filter(
            (file) => !fileId?.includes(file._id)
          );
          dispatch(updateUploadedImages(filteredImages));
          if (isMultiDelete) {
            setChooseFile([]);
            onChange([]);
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
        }
      }
    };

    const renderSelectedFile = useMemo(() => {
      return (
        fileValue &&
        fileValue?.map((fileData, index) => {
          switch (fileData?.file?.type) {
            case 'text/csv':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            case 'application/vnd.ms-excel': // Added this case for .xls files
              return (
                <div className="uploaded_pic">
                  <em className="me-2">file</em>
                  <span>{fileData?.file?.name || ''}</span>
                  <button
                    type="button"
                    className="d-inline-flex align-items-center justify-content-center btn btn44 btn-danger-outline ms-2"
                    title="Delete"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <svg
                      id="close"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10.569"
                      height="10.569"
                      viewBox="0 0 10.569 10.569"
                    >
                      <g id="Group_8836" data-name="Group 8836">
                        <path
                          id="Path_14400"
                          data-name="Path 14400"
                          d="M10.569,1.068,9.5,0,5.285,4.216,1.068,0,0,1.068,4.216,5.285,0,9.5l1.068,1.068L5.285,6.353,9.5,10.569,10.569,9.5,6.353,5.285Z"
                          fill="#000"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              );
            case 'image/png':
            case 'image/svg':
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/svg+xml':
              return (
                <div className="uploaded-pic-grid__item">
                  <img
                    id="blah"
                    className="uploaded-pic-grid__image"
                    width={200}
                    src={fileData?.src as string | undefined}
                    alt="..."
                  />
                  <div className="uploaded-pic-grid__details">
                    <span className="uploaded-pic-grid__filename">
                      {fileData?.file?.name || ''}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="uploaded-pic-grid__delete-button"
                    title="Delete"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <svg
                      id="close"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10.569"
                      height="10.569"
                      viewBox="0 0 10.569 10.569"
                    >
                      <g id="Group_8836" data-name="Group 8836">
                        <path
                          id="Path_14400"
                          data-name="Path 14400"
                          d="M10.569,1.068,9.5,0,5.285,4.216,1.068,0,0,1.068,4.216,5.285,0,9.5l1.068,1.068L5.285,6.353,9.5,10.569,10.569,9.5,6.353,5.285Z"
                          fill="#fff"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              );
            default:
              return (
                <div className="uploaded_pic">
                  <span>{fileData?.file?.name || ''}</span>
                  <button
                    type="button"
                    className="d-inline-flex align-items-center justify-content-center btn btn44 btn-danger-outline mx-1"
                    title="Delete"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <svg
                      id="close"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10.569"
                      height="10.569"
                      viewBox="0 0 10.569 10.569"
                    >
                      <g id="Group_8836" data-name="Group 8836">
                        <path
                          id="Path_14400"
                          data-name="Path 14400"
                          d="M10.569,1.068,9.5,0,5.285,4.216,1.068,0,0,1.068,4.216,5.285,0,9.5l1.068,1.068L5.285,6.353,9.5,10.569,10.569,9.5,6.353,5.285Z"
                          fill="#000"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              );
          }
        })
      );
    }, [fileValue]);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleChooseFile = (files: Files[] | undefined) => {
      if (!files?.length) {
        return toast.error(TOAST_MESSAGES().SELECT_ATLEAST_ONE_FILE);
      }
      if (
        !checkValidFileExtension(files?.[0]?.fileURL || files?.[0]?.url, accept)
      ) {
        return toast.error(
          TOAST_MESSAGES(accept).PLEASE_CHOOSE_ONLY_ACCEPTED_FILES
        );
      }
      if (files?.length) {
        const filesData = isProductAuction
          ? imageList?.files?.map((file: { _id: string }) => {
              if (
                files?.some((selectedFile) => selectedFile._id === file._id)
              ) {
                return { ...file, assigned: true };
              }
              return file;
            })
          : files;
        onChange(filesData);
        setChooseFile(filesData);
        closeModal();
      }
    };

    const renderUploadInstructions = (
      acceptFormat: string,
      ratioRequired?: number[]
    ) => {
      // Convert the `accept` string to a more readable format
      const fileTypes = acceptFormat
        .replace(/image\//g, '.')
        .replace(/video\//g, '.')
        .split(',')
        .map((type) => type.trim())
        .join(', ');

      // Determine the aspect ratio description
      const ratioDescription = ratioRequired?.length
        ? `of ${
            ratioRequired[0] === ratioRequired[1] ? 'square' : 'rectangular'
          } shape, example: of ratio (${ratioRequired[0]} : ${
            ratioRequired[1]
          }) / size (${ratioRequired[0] * 378} * ${ratioRequired[1] * 378})`
        : `.`;

      return `Upload only ${fileTypes} ${ratioDescription}`;
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
                      <span className="uploaded_file">
                        <FileRenderer fileURL={img.url || img.fileURL} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        {showModal && (
          <CustomModal
            title="Choose and upload file"
            show={showModal}
            onClose={closeModal}
          >
            <div className="modal-body">
              <Tabs
                id="controlled-tab-example"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || '')}
                className="custom_tabs mb-2"
                unmountOnExit
              >
                <Tab
                  className="tab-body"
                  eventKey={TABS.LIST_FILES}
                  title="Select file"
                >
                  <ListFiles
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    chooseFile={chooseFile}
                    handleChooseFile={handleChooseFile}
                    data={imageList}
                    handleDeleteFile={handleDeleteFile}
                    singleImageSelectionEnabled={singleImageSelectionEnabled}
                  />
                </Tab>
                <Tab
                  className="tab-body"
                  eventKey={TABS.FILE_UPLOAD}
                  title="Upload File"
                >
                  <>
                    {label && <label className="form-label">{label}</label>}
                    {subLabel && <span>{subLabel}</span>}
                    {accept && <p>{renderUploadInstructions(accept, ratio)}</p>}
                    <div className="text-center upload-file ">
                      {fileValue?.length ? (
                        <div className="uploaded-pic-grid">
                          {renderSelectedFile}
                        </div>
                      ) : (
                        <div {...getRootProps()}>
                          <input
                            ref={ref}
                            accept={accept}
                            {...getInputProps()}
                            className="form-control upl-File"
                          />
                          {isDragActive ? (
                            <div className="upload-text">
                              <span>{STRINGS.DROP_FILE_HERE}</span>
                            </div>
                          ) : (
                            <div className="upload-text">
                              <span>
                                {STRINGS.DROP_FILE_HERE}, or <br />
                                <small>Click here</small> to browse
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-center mt-3">
                      {fileValue?.length ? (
                        <Button
                          className="btn-md"
                          variant="primary"
                          onClick={handleFileUpload}
                        >
                          {BUTTON_LABELS.UPLOAD}
                        </Button>
                      ) : null}
                    </div>
                  </>
                </Tab>
              </Tabs>
            </div>
          </CustomModal>
        )}
      </>
    );
  }
);

FileInput.displayName = 'FileInput';
export default FileInput;
