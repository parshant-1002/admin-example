import { INPUT_TYPES, VALIDATION_REGEX } from '../../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const LOGIN_FORM_SCHEMA = {
  email: {
    type: INPUT_TYPES.EMAIL,
    label: '',
    className: 'col-md-12',
    placeholder: 'Email',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Email').REQUIRED,
      pattern: {
        value: VALIDATION_REGEX.EMAIL,
        message: FORM_VALIDATION_MESSAGES().VALID_EMAIL,
      },
    },
  },
};

export default LOGIN_FORM_SCHEMA;
