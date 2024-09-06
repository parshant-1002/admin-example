import { INPUT_TYPES } from '../../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const HOW_IT_WORKS_FORM_SCHEMA = {
  isVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide How It Works Content',
    className: 'col-md-12 notifications',
  },
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'How It Works Title',
    className: 'col-md-12',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Title').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  tagLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'How It Works Tag Label',
    className: 'col-md-12',
    placeholder: 'How It Works Tag Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('How It Works Tag Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default HOW_IT_WORKS_FORM_SCHEMA;
