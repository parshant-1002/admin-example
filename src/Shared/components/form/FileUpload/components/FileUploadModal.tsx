/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dispatch, LegacyRef, ReactNode, SetStateAction } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap'; // Assuming you're using react-bootstrap
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import { Image } from '../../../../../Models/common';
import { BUTTON_LABELS, STRINGS } from '../../../../constants/constants'; // Import your constants
import { validExtensions } from '../../../../utils/functions';
import CustomModal from '../../../CustomModal';
import { TABS } from '../helpers/constants';
import { FileData, Files } from '../helpers/modal';
import ListFiles from './ListFiles';

interface FileUploadModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  label?: string;
  subLabel?: string;
  accept?: string;
  ratio?: number[];
  selectedFiles: Files[];
  setSelectedFiles: Dispatch<SetStateAction<Files[]>>;
  chooseFile: Image[];
  handleChooseFile: (selectedFiles: Files[]) => void;
  imageList: { files: Files[] };
  handleDeleteFile: (fileId: (string | undefined)[]) => void;
  singleImageSelectionEnabled: boolean;
  handleFileUpload: () => void;
  renderSelectedFile: ReactNode;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  fileValue?: FileData[];
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  isDragActive: boolean;
  hideListSelection: boolean;
  ref: LegacyRef<HTMLInputElement> | undefined;
}

function FileUploadModal({
  showModal,
  handleCloseModal,
  getRootProps,
  getInputProps,
  isDragActive,
  fileValue,
  label,
  subLabel,
  accept,
  ratio,
  selectedFiles,
  setSelectedFiles,
  chooseFile,
  handleChooseFile,
  imageList,
  handleDeleteFile,
  singleImageSelectionEnabled,
  handleFileUpload,
  renderSelectedFile,
  activeTab,
  setActiveTab,
  hideListSelection,
  ref,
}: Readonly<FileUploadModalProps>) {
  const getRatioDescription = (ratioRequired?: number[]) => {
    if (ratioRequired?.length) {
      const shapeType =
        ratioRequired[0] === ratioRequired[1] ? 'square' : 'rectangular';
      const size = `${ratioRequired[0] * 378} * ${ratioRequired[1] * 378}`;
      return `of ${shapeType} shape, example: of ratio (${ratioRequired[0]} : ${ratioRequired[1]}) / size (${size})`;
    }
    return '.';
  };

  const renderUploadInstructions = (
    acceptFormat: string,
    ratioRequired?: number[]
  ) => {
    // Convert the `accept` string to a more readable format
    const fileTypes = validExtensions(acceptFormat).join(', ');

    // Determine the aspect ratio description
    const ratioDescription = getRatioDescription(ratioRequired);

    return `Upload only ${fileTypes} ${ratioDescription}`;
  };
  const tabSchema = () => {
    return [
      hideListSelection
        ? {}
        : {
            eventKey: TABS.LIST_FILES,
            title: 'Select file',
            content: (
              <ListFiles
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                chooseFile={chooseFile}
                handleChooseFile={handleChooseFile}
                data={imageList}
                handleDeleteFile={handleDeleteFile}
                singleImageSelectionEnabled={singleImageSelectionEnabled}
              />
            ),
          },
      {
        eventKey: TABS.FILE_UPLOAD,
        title: 'Upload File',
        content: (
          <>
            {label && <label className="form-label">{label}</label>}
            {subLabel && <span>{subLabel}</span>}
            {accept && <p>{renderUploadInstructions(accept, ratio)}</p>}
            <div className="text-center upload-file">
              {fileValue?.length ? (
                <div className="uploaded-pic-grid">{renderSelectedFile}</div>
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
              {fileValue?.length && (
                <Button
                  className="btn-md"
                  variant="primary"
                  onClick={handleFileUpload}
                >
                  {BUTTON_LABELS.UPLOAD}
                </Button>
              )}
            </div>
          </>
        ),
      },
    ];
  };

  return (
    <CustomModal
      title="Choose and upload file"
      show={showModal}
      onClose={handleCloseModal}
    >
      <div className="modal-body">
        <Tabs
          id="controlled-tab-example"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k ?? STRINGS.EMPTY_STRING)}
          className="custom_tabs mb-2"
          unmountOnExit
        >
          {tabSchema().map(({ eventKey, title, content }) => (
            <Tab
              className="tab-body"
              eventKey={eventKey}
              title={title}
              key={eventKey}
            >
              {content}
            </Tab>
          ))}
        </Tabs>
      </div>
    </CustomModal>
  );
}

export default FileUploadModal;
