import CustomModal from '../CustomModal';
import Button from '../form/Button';
import './style.scss';

interface ConfirmationModalProps {
  icon?: string;
  open?: boolean;
  title?: string;
  subTitle?: string;
  submitButtonText?: string;
  handleSubmit?: () => void;
  handleClose?: () => void;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  showClose?: boolean;
  size?: 'sm' | 'lg' | 'xl' | undefined; // Adjust sizes based on your CustomModal component
}

function ConfirmationModal({
  icon,
  open = false,
  title = 'Are you sure?',
  subTitle = '',
  submitButtonText = 'Delete',
  handleSubmit,
  handleClose,
  showCancelButton = false,
  cancelButtonText = 'Cancel',
  showClose,
  size = 'sm',
}: ConfirmationModalProps) {
  return (
    <CustomModal
      show={open}
      onClose={handleClose}
      className="confirmation_modal"
      size={size}
      showClose={showClose}
    >
      <div className="p-4 text-center">
        {icon && (
          <em>
            <img src={icon} alt="Icon" width="40" height="40" />
          </em>
        )}
        <h5 className="h5 pt-3">{title}</h5>
        <p className="text-muted">{subTitle}</p>
        <div className="d-flex justify-content-center gap-3 pt-3">
          {showCancelButton && (
            <Button
              type="button"
              onClick={handleClose}
              className="btn btn-sm btn-outline-primary "
            >
              {cancelButtonText}
            </Button>
          )}
          <Button
            type="button"
            onClick={handleSubmit}
            className="btn btn-sm btn-primary"
          >
            {submitButtonText}
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}

export default ConfirmationModal;
