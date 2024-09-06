import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const LOGOUT_POPUP_SECTION_CONTENT = {
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Header',
    className: 'col-md-6',
    placeholder: 'Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  message: {
    type: INPUT_TYPES.TEXT,
    label: 'Message',
    className: 'col-md-6',
    placeholder: 'Enter Message',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Message').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  logoutButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Logout Button Label',
    className: 'col-md-6',
    placeholder: 'Logout Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Logout Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default LOGOUT_POPUP_SECTION_CONTENT;
