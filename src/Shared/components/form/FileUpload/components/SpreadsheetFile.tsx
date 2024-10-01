import { cross } from '../../../../../assets';

interface SpreadsheetFileProps {
  name: string;
  index: number;
  handleRemoveFile: (index: number) => void;
}

function SpreadsheetFile({
  name,
  index,
  handleRemoveFile,
}: Readonly<SpreadsheetFileProps>) {
  return (
    <div className="uploaded-pic-grid__item" key={index}>
      <em className="me-2">file</em>
      <div className="uploaded-pic-grid__details">
        <span className="uploaded-pic-grid__filename">{name}</span>
      </div>
      <button
        type="button"
        className="d-inline-flex align-items-center justify-content-center btn btn44 btn-danger-outline ms-2 uploaded-pic-grid__delete-button"
        onClick={() => handleRemoveFile(index)}
      >
        <img src={cross} alt="Remove file" />
      </button>
    </div>
  );
}

export default SpreadsheetFile;
