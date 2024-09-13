import { Dispatch, SetStateAction } from 'react';
import FileRenderer from '../form/FileUpload/components/FileRenderer';
import { ViewMultiData } from '../../../Views/Products/helpers/model';

// Define the types for the props
interface ImageWithCountProps {
  title?: string;
  imgData: Array<{
    url: string;
    // Add other properties for imgData objects if necessary
  }>;
  setShowMultiItemView: Dispatch<SetStateAction<ViewMultiData>>;
  count: number;
}

function ImageWithCount({
  title,
  imgData,
  setShowMultiItemView,
  count,
}: ImageWithCountProps) {
  return (
    <div className="d-lg-flex align-items-center gap-2">
      <div
        className="d-inline-flex align-items-center uploaded_file pointer"
        onClick={() =>
          setShowMultiItemView({
            show: true,
            data: { title: 'Product Images', size: 'lg', imgData },
          })
        }
      >
        {imgData?.map((img, index) =>
          index < count ? (
            <figure key={img.url} className="position-relative">
              {imgData.length > count ? (
                <button
                  type="button"
                  className="count_btn"
                  onClick={() =>
                    setShowMultiItemView({
                      show: true,
                      data: {
                        title: 'Product Images',
                        size: 'lg',
                        imgData,
                      },
                    })
                  }
                >
                  {`+${imgData.length - count}`}
                </button>
              ) : null}
              <FileRenderer fileURL={img.url} />
            </figure>
          ) : null
        )}
      </div>
      {title ? <div>{title}</div> : null}
    </div>
  );
}

export default ImageWithCount;
