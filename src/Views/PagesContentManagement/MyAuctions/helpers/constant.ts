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
  pastBidsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Past Bids Label',
    className: 'col-md-6',
    placeholder: 'Enter Past Bids Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Past Bids Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  ongoingBidsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Ongoing Bids Label',
    className: 'col-md-6',
    placeholder: 'Ongoing Bids Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Ongoing Bids Label').REQUIRED,
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
