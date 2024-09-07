import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const MY_AUCTIONS_SECTION_CONTENT = {
  header: {
    type: INPUT_TYPES.TEXT,
    label: 'Header',
    className: 'col-md-6',
    placeholder: 'Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  filterPlaceholder: {
    type: INPUT_TYPES.TEXT,
    label: 'Filter Place Holder',
    className: 'col-md-6',
    placeholder: 'Enter Filter Place Holder',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Filter Place Holder').REQUIRED,
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
    placeholder: 'Clear Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Clear Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  noDataFound: {
    type: INPUT_TYPES.TEXT,
    label: 'No Data Found Label',
    className: 'col-md-6',
    placeholder: 'No Data Found Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('No Data Found Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default MY_AUCTIONS_SECTION_CONTENT;
