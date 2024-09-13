import React from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import './modal.scss';
import { whiteCross } from '../../../assets';

interface CustomModalProps extends Omit<ModalProps, 'onHide'> {
  title?: string;
  show?: boolean;
  onClose?: () => void;
  showClose?: boolean;
  children?: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl'; // Or adjust size options based on react-bootstrap documentation
}

function CustomModal({
  title = '',
  show = false,
  onClose = () => {},
  showClose = true,
  children = null,
  size = 'lg',
  ...props
}: CustomModalProps) {
  return (
    <Modal
      onHide={onClose}
      show={show}
      size={size}
      centered
      backdrop="static"
      {...props}
    >
      {title && (
        <div className="modal-header px-4">
          <h4 className="modal-title h4 text-start">{title}</h4>
        </div>
      )}
      {showClose && (
        <button type="button" className="close_btn" onClick={onClose}>
          <img src={whiteCross} alt="close" />
        </button>
      )}
      <div className="modal-body px-4">{children}</div>
    </Modal>
  );
}

export default CustomModal;
