import { INPUT_TYPES } from '../../../../Shared/constants/constants';
import { FORM_VALIDATION_MESSAGES } from '../../../../Shared/constants/validationMessages';

const REFERRAL_POPUP_SECTION_CONTENT = {
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
    className: 'col-md-6',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Title').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  message: {
    type: INPUT_TYPES.TEXT_AREA,
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
  referralCodeLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'referral Code Label',
    className: 'col-md-6',
    placeholder: 'referral Code Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('referral Code Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  referralCodePlaceholder: {
    type: INPUT_TYPES.TEXT,
    label: ' Referral Code Placeholder',
    className: 'col-md-6',
    placeholder: ' Referral Code Placeholder',
    schema: {
      required: FORM_VALIDATION_MESSAGES(' Referral Code Placeholder').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  submitButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Submit Button Label',
    className: 'col-md-6',
    placeholder: 'Submit Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Submit Button Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
};
export default REFERRAL_POPUP_SECTION_CONTENT;
