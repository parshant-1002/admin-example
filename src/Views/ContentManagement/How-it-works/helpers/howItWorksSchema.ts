import { INPUT_TYPES } from '../../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const HOW_IT_WORKS_FORM_SCHEMA = {
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'How It Works Title',
    className: 'col-md-12',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  isVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide How It Works Content',
    className: 'col-md-12',
  },
};

export default HOW_IT_WORKS_FORM_SCHEMA;
