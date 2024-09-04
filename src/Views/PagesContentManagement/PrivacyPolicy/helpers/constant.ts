import {
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
} from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const PRIVACY_POLICY_FORM_SCHEMA = {
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
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
  description: {
    type: INPUT_TYPES.RICH_TEXT,
    label: 'Description',
    className: 'col-md-12',
    placeholder: 'Privacy policy Description',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
    // addHorizontalLine: true,
  },
  image: {
    type: INPUT_TYPES.FILE,
    label: 'Header Image',
    className: 'col-md-12',
    accept: IMAGE_FILE_TYPES,
    placeholder: 'Header Image',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  moreInformationTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Privacy policy more Information Title',
    className: 'col-md-12',
    placeholder: 'Privacy policy more Information Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
    // addHorizontalLine: true,
  },
};

export default PRIVACY_POLICY_FORM_SCHEMA;
