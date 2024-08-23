import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Delete } from '../../../../assets';
import FileRenderer from './FileRenderer';
import { Files } from './helpers/modal';

interface ListFilesProps {
  handleChooseFile: (selectedFiles: Files[]) => void;
  data: { files: Files[] };
  handleDeleteFile: (fileId: (string | undefined)[]) => void;
  singleImageSelectionEnabled?: boolean;
}
function ListFiles({
  handleChooseFile,
  data,
  handleDeleteFile,
  singleImageSelectionEnabled = false,
}: ListFilesProps) {
  const [selectedFiles, setSelectedFiles] = useState<Files[]>([]);
  const files = data?.files;

  const toggleFileSelection = (file: Files) => {
    if (!file) return;
    if (
      selectedFiles.length >= 1 &&
      !selectedFiles.some((f) => f._id === file._id) &&
      singleImageSelectionEnabled
    ) {
      toast.error('Only one file can be selected');
      return;
    }
    setSelectedFiles((prevSelectedFiles) => {
      const foundIndex = prevSelectedFiles.findIndex((f) => f._id === file._id);
      if (foundIndex > -1) {
        return prevSelectedFiles.filter((f) => f._id !== file._id);
      }
      return [...prevSelectedFiles, file];
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
            if (
              file.createdAt &&
              file.fileName &&
              file.fileURL &&
              file.updatedAt &&
              file._id
            ) {
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
            No files found
          </div>
        )}
      </div>
      <div className="choose-file-button-container d-flex gap-3 justify-content-center ps-2">
        {selectedFiles?.length ? (
          <Button
            className="mt-2 px-4 button_danger"
            onClick={() => {
              handleDeleteFile(selectedFiles.map((file) => file._id));
              setSelectedFiles([]);
            }}
          >
            Delete
          </Button>
        ) : null}
        <Button
          className="mt-2 px-3"
          onClick={() => handleChooseFile(selectedFiles)}
        >
          Choose file
        </Button>
      </div>
    </div>
  );
}

export default ListFiles;
