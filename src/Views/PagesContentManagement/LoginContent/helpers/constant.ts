import {
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
} from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const LOGIN_SECTION_CONTENT = {
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
    className: 'col-md-6',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Title').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  buttonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Button Label',
    className: 'col-md-6',
    placeholder: 'Enter Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Button Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  image: {
    type: INPUT_TYPES.FILE,
    label: 'Icon',
    className: 'col-md-12',
    accept: IMAGE_FILE_TYPES,
    placeholder: 'Icon',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Icon').REQUIRED,
    },
  },
};

export default LOGIN_SECTION_CONTENT;
