import {
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
} from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const HERO_CONTENT_FORM_SCHEMA = {
  heroImageIsVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide Hero Content',
    className: 'col-md-12 notifications',
  },
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
    className: 'col-md-12',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Title').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  subtitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Sub Title',
    className: 'col-md-12',
    placeholder: 'Sub Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Sub Title').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  description: {
    type: INPUT_TYPES.TEXT,
    label: 'Description',
    className: 'col-md-12',
    placeholder: 'Description',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Description').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  buttonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Button Label',
    className: 'col-md-12',
    placeholder: 'Button Label',
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
    label: 'Image',
    className: 'col-md-12',
    placeholder: 'Image',
    accept: IMAGE_FILE_TYPES,
    schema: {
      required: FORM_VALIDATION_MESSAGES('Button Label').REQUIRED,
    },
  },
};

export default HERO_CONTENT_FORM_SCHEMA;
