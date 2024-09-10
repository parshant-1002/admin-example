import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const TOP_AUCTION_SECTION_CONTENT = {
  // recent bids
  recentBidsTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
    subLabel: 'Use {{bidsCount}} to show recent bids count',
    className: 'col-md-6',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Title').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  userColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'User Column Label',
    className: 'col-md-6',
    placeholder: 'User Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('User Column Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  bidColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Column Label',
    className: 'col-md-6',
    placeholder: 'Bid Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Column Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  timeColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Time Column Label',
    className: 'col-md-6',
    placeholder: 'Time Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Time Column Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
};

export default TOP_AUCTION_SECTION_CONTENT;
