import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Delete } from '../../../../assets';
import FileRenderer from './FileRenderer';
import { Files } from './helpers/modal';
import { Image } from '../../../../Models/common';
import { BUTTON_LABELS, STRINGS } from '../../../constants';

interface ListFilesProps {
  chooseFile: Image[];
  isProductAuction: boolean;
  handleChooseFile: (selectedFiles: Files[]) => void;
  data: { files: Files[] };
  handleDeleteFile: (fileId: (string | undefined)[]) => void;
}
function ListFiles({
  chooseFile,
  isProductAuction,
  handleChooseFile,
  data,
  handleDeleteFile,
}: ListFilesProps) {
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
  const files = data?.files;
  const toggleFileSelection = (file: Files) => {
    if (!file) return;
    setSelectedFiles((prevSelectedFiles) => {
      const foundIndex = prevSelectedFiles.findIndex((f) => f._id === file._id);
      if (foundIndex > -1) {
        return prevSelectedFiles.filter((f) => f._id !== file._id);
      }
      // if (selectedFiles?.length >= 1) {
      //   toast.error('Only one file can be selected');
      //   return prevSelectedFiles;
      // }
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
        {selectedFiles?.length ? (
          <Button
            className="mt-2 px-4 button_danger"
            onClick={() => {
              handleDeleteFile(selectedFiles.map((file) => file._id));
              setSelectedFiles([]);
            }}
          >
            {BUTTON_LABELS.DELETE}
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
