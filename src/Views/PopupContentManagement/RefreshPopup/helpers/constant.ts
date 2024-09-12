import { INPUT_TYPES } from '../../../../Shared/constants/constants';
import { FORM_VALIDATION_MESSAGES } from '../../../../Shared/constants/validationMessages';

const REFERRAL_POPUP_SECTION_CONTENT = {
  content: {
    type: INPUT_TYPES.TEXT_AREA,
    label: 'Content',
    className: 'col-md-6',
    placeholder: 'Content',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Content').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  clearButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Clear Button Label',
    className: 'col-md-6',
    placeholder: 'Enter Clear Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Clear Button Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
};
export default REFERRAL_POPUP_SECTION_CONTENT;
