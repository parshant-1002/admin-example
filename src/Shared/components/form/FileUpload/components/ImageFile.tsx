import { cross } from '../../../../../assets';

interface ImageFileProps {
  name: string;
  src: string;
  index: number;
  handleRemoveFile: (index: number) => void;
}

function ImageFile({
  name,
  src,
  index,
  handleRemoveFile,
}: Readonly<ImageFileProps>) {
  return (
    <div className="uploaded-pic-grid__item" key={index}>
      <img
        className="uploaded-pic-grid__image"
        width={200}
        src={src}
        alt={name}
      />
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

export default ImageFile;