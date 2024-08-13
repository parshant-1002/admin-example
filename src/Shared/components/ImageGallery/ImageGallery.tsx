import { useState } from 'react';
import { ViewMultiData } from '../../../Views/Products/helpers/model';
import FileRenderer from '../form/FileUpload/FileRenderer';
import './ImageGallery.scss';
// Define the ImageGallery component
function ImageGallery({ data }: ViewMultiData) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dataCount = data?.imgData?.length || 0;
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const selectedImage = data?.imgData?.[selectedIndex];
  const thumbnailsToShow = data?.imgData?.slice(
    thumbnailStartIndex,
    thumbnailStartIndex + 5
  );

  const handleNextImage = () => {
    const newIndex = (selectedIndex + 1) % dataCount;
    setSelectedIndex(newIndex);
    if (newIndex + 1 > thumbnailStartIndex + 5) {
      setThumbnailStartIndex(thumbnailStartIndex + 5);
    }
  };

  const handlePrevImage = () => {
    const newIndex = (selectedIndex - 1 + dataCount) % dataCount;
    setSelectedIndex(newIndex);
    if (newIndex < thumbnailStartIndex) {
      setThumbnailStartIndex(thumbnailStartIndex - 5);
    }
  };

  const handleNextThumbnails = () => {
    if (thumbnailStartIndex + 5 < dataCount) {
      setThumbnailStartIndex(thumbnailStartIndex + 5);
    }
  };

  const handlePrevThumbnails = () => {
    if (thumbnailStartIndex - 5 >= 0) {
      setThumbnailStartIndex(thumbnailStartIndex - 5);
    }
  };

  return (
    <div className="p-3 media-view-container">
      {/* Display the selected image with arrow buttons */}
      <div className="selected-image-container">
        <button
          className="arrow-btn"
          type="button"
          onClick={handlePrevImage}
          disabled={selectedIndex === 0}
        >
          ❮
        </button>
        <div className="upload-image">
          <FileRenderer fileURL={selectedImage?.url} />
          <div className="image-title text-primary">{selectedImage?.title}</div>
        </div>
        <button
          className="arrow-btn"
          type="button"
          onClick={handleNextImage}
          disabled={selectedIndex + 1 === dataCount}
        >
          ❯
        </button>
      </div>

      {/* Display the list of thumbnails with arrow buttons */}
      <div className="thumbnail-navigation">
        <button
          type="button"
          className="arrow-btn"
          onClick={handlePrevThumbnails}
          disabled={thumbnailStartIndex === 0}
        >
          ❮
        </button>
        <div className="thumbnails-container">
          {thumbnailsToShow?.map((img, index) => (
            <div
              key={img.url}
              className={`thumbnail-item grid-item ${
                selectedImage?.url === img.url ? 'active' : ''
              }`}
              onClick={() => setSelectedIndex(thumbnailStartIndex + index)}
            >
              <FileRenderer fileURL={img.url} />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="arrow-btn"
          onClick={handleNextThumbnails}
          disabled={thumbnailStartIndex + 5 >= dataCount}
        >
          ❯
        </button>
      </div>
    </div>
  );
}

export default ImageGallery;
