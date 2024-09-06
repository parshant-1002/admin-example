import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const CANCEL_SUBSCRIPTION_SECTION_CONTENT = {
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Header',
    className: 'col-md-6',
    placeholder: 'Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Header').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  subtitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Subtitle',
    className: 'col-md-6',
    placeholder: 'Enter Subtitle',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Subtitle').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  cancelButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Cancel Button Label',
    className: 'col-md-6',
    placeholder: 'Cancel Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Cancel Button Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
};

export default CANCEL_SUBSCRIPTION_SECTION_CONTENT;
