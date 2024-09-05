import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const CONTACT_US_FORM_SCHEMA = {
  topAuctionsIsVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide Top Auctions Section',
    className: 'col-md-12 notifications',
  },
  topAuctionsTabLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Top Auctions Tab Label',
    className: 'col-md-6',
    placeholder: 'Top Auctions Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Top Auctions Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  topAuctionsTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Top Auctions Title',
    className: 'col-md-6',
    placeholder: 'Enter Top Auctions Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Top Auctions Title').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  marketValueLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Market Value Label',
    className: 'col-md-6',
    placeholder: 'Market Value Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Market Value Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  reservePriceMetLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Reserve Price Met Label',
    className: 'col-md-6',
    placeholder: 'Enter Reserve Price Met Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Met Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  reservePriceNotMetLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Reserve Price Not Met Label',
    className: 'col-md-6',
    placeholder: 'Enter Reserve Price Not Met Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Not Met Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  placeBetButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Place Bet Tab Label',
    className: 'col-md-6',
    placeholder: 'Place Bet Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Place Bet Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  timeLeftLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Time Left Label',
    className: 'col-md-6',
    placeholder: 'Enter Time Left Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Time Left Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  reservePriceLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Reserve Price Label',
    className: 'col-md-6',
    placeholder: 'Reserve Price Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  moreInformationLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'More Information Label',
    className: 'col-md-6',
    placeholder: 'Enter More Information Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('More Information Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  historyLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'History Label',
    className: 'col-md-6',
    placeholder: 'Enter History Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('History Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default CONTACT_US_FORM_SCHEMA;
