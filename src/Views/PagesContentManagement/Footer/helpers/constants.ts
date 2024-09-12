import { INPUT_TYPES } from '../../../../Shared/constants/constants';
import { FORM_VALIDATION_MESSAGES } from '../../../../Shared/constants/validationMessages';

const CONTACT_US_FORM_SCHEMA = {
  isVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide Footer Section',
    className: 'col-md-12 notifications',
  },
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
    className: 'col-md-12',
    placeholder: 'Upload Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Title').REQUIRED,
    },
  },
  description: {
    type: INPUT_TYPES.TEXT,
    label: 'Description',
    className: 'col-md-6',
    placeholder: 'Enter Description',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Description').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  socialConnectTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Social Connect Title',
    className: 'col-md-6',
    placeholder: 'Enter Social Connect Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Social Connect Title').REQUIRED,
      minLength: {
        value: 10,
        message: FORM_VALIDATION_MESSAGES(10).MIN_LENGTH,
      },
    },
  },
  copyrightLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Copy Right Label',
    className: 'col-md-6',
    placeholder: 'Enter Copy Right Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Copy Right Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  sectionTitle1: {
    type: INPUT_TYPES.TEXT,
    label: 'Section Title1',
    className: 'col-md-6',
    placeholder: 'Enter Section Title1',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Section Title1').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  sectionTitle2: {
    type: INPUT_TYPES.TEXT,
    label: 'Section Title2',
    className: 'col-md-6',
    placeholder: 'Enter Section Title2',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Section Title2').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  sectionTitle3: {
    type: INPUT_TYPES.TEXT,
    label: 'Section Title3',
    className: 'col-md-6',
    placeholder: 'Enter Section Title3',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Section Title3').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default CONTACT_US_FORM_SCHEMA;
