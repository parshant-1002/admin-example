/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dispatch, LegacyRef, ReactNode, SetStateAction } from 'react';
import { Tab, Tabs } from 'react-bootstrap'; // Assuming you're using react-bootstrap
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import { Image } from '../../../../../Models/common';
import { STRINGS } from '../../../../constants/constants'; // Import your constants
import CustomModal from '../../../CustomModal';
import { TABS } from '../helpers/constants';
import { FileData, Files } from '../helpers/modal';
import ImageUploadBox from './ImageUploadBox';
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
  handleFileUpload: (fileValueList: FileData[]) => void;
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
          <ImageUploadBox
            label={label}
            subLabel={subLabel}
            accept={accept}
            renderSelectedFile={renderSelectedFile}
            fileValue={fileValue}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            ref={ref}
            ratio={ratio}
            isDragActive={isDragActive}
            handleFileUpload={handleFileUpload}
          />
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
