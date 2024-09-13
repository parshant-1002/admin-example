import { Dispatch, SetStateAction } from 'react';
import { Button } from 'react-bootstrap';
import { Delete } from '../../../../../assets';
import { Image } from '../../../../../Models/common';
import { BUTTON_LABELS, STRINGS } from '../../../../constants/constants';
import FileRenderer from './FileRenderer';
import { Files } from '../helpers/modal';

interface ListFilesProps {
  chooseFile: Image[];
  selectedFiles: Files[];
  setSelectedFiles: Dispatch<SetStateAction<Files[]>>;
  handleChooseFile: (selectedFiles: Files[]) => void;
  data: { files: Files[] };
  handleDeleteFile: (
    fileId: (string | undefined)[],
    isMultiDelete?: boolean
  ) => void;
  singleImageSelectionEnabled?: boolean;
}
function ListFiles({
  chooseFile = [],
  selectedFiles,
  setSelectedFiles,
  handleChooseFile,
  data,
  handleDeleteFile,
  singleImageSelectionEnabled = false,
}: ListFilesProps) {
  const files = data?.files;
  const toggleFileSelection = (file: Files) => {
    if (!file) return;

    setSelectedFiles((prevSelectedFiles) => {
      const isFileSelected = prevSelectedFiles.some((f) => f._id === file._id);

      // If the file is already selected, deselect it
      if (isFileSelected) {
        return prevSelectedFiles.filter((f) => f._id !== file._id);
      }

      // If single image selection is enabled, replace the selected file with the new one
      if (singleImageSelectionEnabled) {
        return [{ ...file, assigned: true }];
      }

      // Otherwise, add the new file to the selection
      return [...prevSelectedFiles, { ...file, assigned: true }];
    });
  };

  return (
    <div>
      <div className="d-flex flex-md-wrap file-group">
        {files?.length ? (
          files.map((file: Files) => {
            const isSelected =
              selectedFiles.findIndex((f: Files) => f._id === file._id) > -1;
            // Remaining rendering logic
            if (file.fileName && file.fileURL && file._id) {
              return (
                <div
                  key={file._id}
                  className={`card-file d-flex align-items-center justify-content-between ${
                    isSelected ? 'selected' : ''
                  }`}
                  onClick={() => toggleFileSelection(file)}
                >
                  <div className="d-flex align-items-center img_card">
                    <div className="custom-checkbox 1111">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={isSelected}
                      />
                      <div className="checkbox-custom" />
                    </div>
                    <figure>
                      <FileRenderer
                        fileURL={file?.fileURL}
                        alt={file.fileName}
                      />
                    </figure>
                    <div className="image-card__info">
                      <h6 className="h6">{file.fileName}</h6>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn  btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFile([file._id || '']);
                    }}
                  >
                    <img src={Delete} alt="delete" />
                  </button>
                </div>
              );
            }
            return null;
          })
        ) : (
          <div className="w-100 d-flex justify-content-center align-items-center no_results">
            {STRINGS.NO_FILES_FOUND}
          </div>
        )}
      </div>
      <div className="choose-file-button-container d-flex gap-3 justify-content-center ps-2">
        {selectedFiles?.length &&
        selectedFiles?.length > 1 &&
        !singleImageSelectionEnabled ? (
          <Button
            className="mt-2 px-4 button_danger"
            onClick={() => {
              handleDeleteFile(
                selectedFiles.map((file) => file._id),
                true
              );
              // setSelectedFiles([]);
            }}
          >
            {BUTTON_LABELS.DELETE_SELECTION}
          </Button>
        ) : null}
        <Button
          className="mt-2 px-3"
          onClick={() => handleChooseFile(selectedFiles)}
        >
          {chooseFile?.length
            ? BUTTON_LABELS.UPDATE_SELECTION
            : BUTTON_LABELS.SELECT_FILES}
        </Button>
      </div>
    </div>
  );
}

export default ListFiles;
