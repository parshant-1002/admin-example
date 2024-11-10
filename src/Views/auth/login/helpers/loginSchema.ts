import {
  INPUT_TYPES,
  VALIDATION_REGEX,
} from '../../../../Shared/constants/constants';
import { FORM_VALIDATION_MESSAGES } from '../../../../Shared/constants/validationMessages';

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
  password: {
    type: INPUT_TYPES.PASSWORD,
    label: '',
    className: 'col-md-12',
    placeholder: 'Password',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Password').REQUIRED,
      pattern: {
        value: VALIDATION_REGEX.PASSWORD,
        message: FORM_VALIDATION_MESSAGES().VALID_PASSWORD,
      },
    },
  },
};

export default LOGIN_FORM_SCHEMA;
