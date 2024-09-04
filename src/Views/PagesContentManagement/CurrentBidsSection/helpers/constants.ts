import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const USER_PROFILE_SECTION_FORM_SCHEMA = {
  productColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Product Column Label',
    className: 'col-md-6',
    placeholder: 'Product Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Product Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  auctonStartedColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Auction Started Column Label',
    className: 'col-md-6',
    placeholder: 'Auction Started Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Auction Started Column Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidsColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bids Column Label',
    className: 'col-md-6',
    placeholder: 'Bids Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bids Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidPlacedOnColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Placed On Column Label',
    className: 'col-md-6',
    placeholder: 'Bid Placed On Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Placed On Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  reservePriceColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Reserve Price Column Label',
    className: 'col-md-6',
    placeholder: 'Reserve Price Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  yourBidColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Your Bid Column Label',
    className: 'col-md-6',
    placeholder: 'Your Bid Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Your Bid Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  currentBidColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Current Bid Column Label',
    className: 'col-md-6',
    placeholder: 'Current Bid Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Current Bid Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  timeLeftColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Time Left Column Label',
    className: 'col-md-6',
    placeholder: 'Time Left Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Time Left Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  actionColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Action Column Label',
    className: 'col-md-6',
    placeholder: 'Action Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Action Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  placeBidButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Place Bid Button Label',
    className: 'col-md-6',
    placeholder: 'Place Bid Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Place Bid Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  finishedLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Finished Label',
    className: 'col-md-6',
    placeholder: 'Finished Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Finished Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default USER_PROFILE_SECTION_FORM_SCHEMA;
