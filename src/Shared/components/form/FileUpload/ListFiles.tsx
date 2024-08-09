import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useGetFilesQuery } from '../../../../Services/Api/module/file';
import FileRenderer from './FileRenderer';
import { Files } from './helpers/modal';
import { Delete } from '../../../../assets';

interface ListFilesProps {
  handleChooseFile: (selectedFiles: Files[]) => void;
}
function ListFiles({ handleChooseFile }: ListFilesProps) {
  const [selectedFiles, setSelectedFiles] = useState<Files[]>([]);
  const { data } = useGetFilesQuery({ startDate: '', endDate: '' });
  const files = data?.files;

  const handleDeleteFile = (fileId: string | undefined) => {
    fileId?.includes('0');
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
                  <div
                    className="d-flex align-items-center img_card"
                    onClick={() => toggleFileSelection(file)}
                  >
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
                    className="btn  btn-danger"
                    onClick={() => handleDeleteFile(file._id)}
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
