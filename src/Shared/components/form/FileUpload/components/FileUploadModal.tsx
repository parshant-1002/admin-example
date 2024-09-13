/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dispatch, LegacyRef, ReactNode, SetStateAction } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap'; // Assuming you're using react-bootstrap
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import { Image } from '../../../../../Models/common';
import { BUTTON_LABELS, STRINGS } from '../../../../constants/constants'; // Import your constants
import CustomModal from '../../../CustomModal';
import TABS from '../helpers/constants';
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
  ref,
}: FileUploadModalProps) {
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
    <CustomModal
      title="Choose and upload file"
      show={showModal}
      onClose={handleCloseModal}
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
  );
}

export default FileUploadModal;
