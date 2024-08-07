import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import FileRenderer from './FileRenderer';
import { Files } from './helpers/modal';

interface ListFilesProps {
  handleChooseFile: (selectedFiles: Files[]) => void;
}
function ListFiles({ handleChooseFile }: ListFilesProps) {
  const dispatch = useDispatch();
  const [files] = useState<Files[]>();
  const [selectedFiles, setSelectedFiles] = useState<Files[]>([]);
  const listAllFiles = () => {
    // dispatch(
    //   getAllFiles('', (res, statusCode) => {
    //     if (statusCode === STATUS_CODES.SUCCESS && res.files) {
    //       setFiles(res.files);
    //     } else {
    //       toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
    //     }
    //   })
    // );
  };
  useEffect(() => {
    listAllFiles();
  }, [dispatch]);

  const handleDeleteFile = () => {
    // dispatch(
    //   deleteFiles([fileId], (res, status) => {
    //     if (status === STATUS.SUCCESS) {
    //       toast.success('File deleted successfully');
    //       listAllFiles();
    //     }
    //   })
    // );
  };

  const toggleFileSelection = (file: Files) => {
    if (!file) return;
    setSelectedFiles([file]);
    // setSelectedFiles((prevSelectedFiles) => {
    //     const foundIndex = prevSelectedFiles.findIndex((f) => f._id === file._id);
    //     if (foundIndex > -1) {
    //         return prevSelectedFiles.filter((f) => f._id !== file._id);
    //     } else {
    //         if (selectedFiles.length >= 1) {
    //             toast.error('Only one file can be selected');
    //             return prevSelectedFiles;
    //         } else {
    //             return [...prevSelectedFiles, file];
    //         }
    //     }
    // });
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
                >
                  <div className="d-flex align-items-center img_card">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFileSelection(file)}
                    />
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
                    className="btn btn44 btn-danger"
                    onClick={() => handleDeleteFile(file._id)}
                  >
                    <i className="bi bi-trash" />
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
      <div className="choose-file-button-container d-flex justify-content-center">
        <Button
          className="mt-2"
          onClick={() => handleChooseFile(selectedFiles)}
        >
          Choose file
        </Button>
      </div>
    </div>
  );
}

export default ListFiles;
