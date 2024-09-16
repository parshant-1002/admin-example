import { cross } from '../../../../../assets';

interface DefaultFileProps {
  name: string;
  index: number;
  handleRemoveFile: (index: number) => void;
}

function DefaultFile({ name, index, handleRemoveFile }: DefaultFileProps) {
  return (
    <div className="uploaded-pic-grid__item" key={index}>
      <div className="uploaded-pic-grid__details">
        <span className="uploaded-pic-grid__filename">{name}</span>
      </div>
      <button
        type="button"
        className="uploaded-pic-grid__delete-button"
        onClick={() => handleRemoveFile(index)}
      >
        <img src={cross} alt="Remove file" />
      </button>
    </div>
  );
}

export default DefaultFile;
