/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
// import {
//     deleteFiles,
//     getAllFiles,
//     uploadFiles,
// } from '../../../../store/actions/mediaActions';
import ERROR_MESSAGES from '../../../constants/messages';
import {
  checkValidFileExtension,
  convertFilesToFormData,
} from '../../../utils/functions';
import CustomModal from '../../CustomModal';
import FileRenderer from './FileRenderer';
import './FileUpload.scss';
import ListFiles from './ListFiles';
import { FileData, Files } from './helpers/modal';
import { useFileUploadMutation } from '../../../../Services/Api/module/fileUpload';
import { ErrorResponse } from '../../../../Models/Apis/Error';

const TABS = {
  FILE_UPLOAD: 'fileUpload',
  LIST_FILES: 'listFiles',
};
interface FileInputProps {
  value: Files[];
  onChange?: (files: string | undefined) => void;
  label?: string;
  subLabel?: string;
  maxSize?: number;
  accept?: string;
  [key: string]: unknown; // To handle any additional props
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
    },
    ref
  ) => {
    const [chooseFile, setChooseFile] = useState(value);
    const [fileValue, setFileValue] = useState<FileData[]>();
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState(TABS.LIST_FILES);
    const [fileUpload] = useFileUploadMutation();
    // const dispatch = useDispatch();
    useEffect(() => {
      if (value) setChooseFile(value);
    }, [value]);
    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        setFileValue([]);
        acceptedFiles.forEach((file) => {
          if (file && checkValidFileExtension(file?.name, accept)) {
            if (file.size <= maxSize) {
              // onChange({ file });
              const reader = new FileReader();
              reader.onload = ((theFile: File) => {
                return (e: ProgressEvent<FileReader>) => {
                  setFileValue((prevState: FileData[] | undefined) => [
                    ...(prevState || []),
                    { file: theFile, src: e?.target?.result },
                  ]);
                };
              })(file);
              reader.readAsDataURL(file);
            } else {
              toast.error(ERROR_MESSAGES().FILE_SIZE_ERROR);
            }
          } else {
            // Display error message if the dropped file is of incorrect type
            toast.error(`Please upload only ${accept} file.`);
          }
        });
      },
      [accept, maxSize]
    );

    const handleFileUpload = () => {
      if (fileValue?.length === 0)
        return toast.error('Please select a file to upload');
      const fileList = fileValue as unknown as FileData[];
      const files = convertFilesToFormData(fileList, 'image');
      // eslint-disable-next-line no-restricted-syntax
      files?.forEach((file) => {
        fileUpload({
          payload: file,
          onSuccess: () => {
            setFileValue([]);
            setActiveTab(TABS.LIST_FILES);
          },
          onFailure: (error: ErrorResponse) => {
            toast.error(error?.data?.message);
          },
        });
      });
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
              return (
                <div className="uploaded_pic">
                  <img
                    id="blah"
                    className="uploaded_pic"
                    width={200}
                    src={fileData?.src as unknown as string | undefined}
                    alt="..."
                  />
                  <span>{fileData?.file?.name || ''}</span>
                  <button
                    type="button"
                    className="d-inline-flex align-items-center justify-content-center btn btn44 btn-dange-outline ms-2"
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

    const handleChooseFile = (file: Files[] | undefined) => {
      if (!checkValidFileExtension(file?.[0]?.fileURL, accept)) {
        return toast.error(`Please choose only ${accept} file.`, {
          position: 'top-left',
        });
      }
      if (file?.length) {
        onChange(file?.[0]?.fileURL);
        setChooseFile(file);
        closeModal();
      }
    };

    return (
      <>
        <div className="form-control">
          <Button
            className="btn btn-md my-2  me-2"
            variant="primary"
            onClick={openModal}
          >
            {chooseFile?.length ? 'Change file' : 'Choose file'}
          </Button>
          {chooseFile && (
            <span className="uploaded_file">
              <FileRenderer
                fileURL={chooseFile?.[0]?.fileURL || chooseFile?.[0]?.url}
              />
            </span>
          )}
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
                className="custom_tabs"
                unmountOnExit
              >
                <Tab
                  className="tab-body"
                  eventKey={TABS.LIST_FILES}
                  title="Select file"
                >
                  <ListFiles handleChooseFile={handleChooseFile} />
                </Tab>
                <Tab
                  className="tab-body"
                  eventKey={TABS.FILE_UPLOAD}
                  title="Upload File"
                >
                  <>
                    {label && <label className="form-label">{label}</label>}
                    {subLabel && <span>{subLabel}</span>}
                    {accept && (
                      <label>{`Upload only ${accept
                        ?.replace('image/', ' .')
                        .replace('video/', '.')}.`}</label>
                    )}
                    <div className="text-center upload-file">
                      {fileValue?.length ? (
                        renderSelectedFile
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
                              <span>Drop file here</span>
                            </div>
                          ) : (
                            <div className="upload-text">
                              <span>
                                Drop file here, or <br />
                                <small>Click here</small> to browse
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-center mt-3">
                      {fileValue?.length && (
                        <Button
                          className="btn-md"
                          variant="primary"
                          onClick={handleFileUpload}
                        >
                          Upload
                        </Button>
                      )}
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
