import { Dispatch, SetStateAction } from 'react';
import CustomModal from '../../../../Shared/components/CustomModal';
import ImageGallery from '../../../../Shared/components/ImageGallery/ImageGallery';
import { ViewMultiData } from '../../../Products/helpers/model';

interface ViewMultiTableItemProp {
  show: ViewMultiData;
  setShow: Dispatch<SetStateAction<ViewMultiData>>;
}

export default function ViewMultiTableItem({
  show: { show, data },
  setShow,
}: ViewMultiTableItemProp) {
  return (
    <CustomModal
      show={show}
      onClose={() => setShow({ show: false, data: null })}
      title={data?.title}
      size={data?.size}
    >
      {data?.categories?.length ? (
        <div className="p-3 categories-container">
          {data?.categories?.map((category, index) => (
            <div key={category?._id} className="category-item">
              <span className="category-index">{index + 1}.</span>
              <span className="category-name">{category?.name}</span>
            </div>
          ))}
        </div>
      ) : null}
      {data?.imgData?.length ? <ImageGallery data={data} /> : null}
    </CustomModal>
  );
}
