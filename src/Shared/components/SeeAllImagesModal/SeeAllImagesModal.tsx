import { Image } from '../../../Models/common';
import CustomModal from '../CustomModal';
import ImageGallery from '../ImageGallery';

interface SeeAllImagesModalProp {
  show: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'lg' | 'xl';
  images?: Image[];
}

export default function SeeAllImagesModal({
  show,
  onClose,
  title,
  size = 'lg',
  images,
}: SeeAllImagesModalProp) {
  return (
    <CustomModal show={show} onClose={onClose} title={title} size={size}>
      {images?.length ? <ImageGallery data={{ imgData: images }} /> : null}
    </CustomModal>
  );
}
