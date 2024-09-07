import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const USER_PROFILE_SECTION_FORM_SCHEMA = {
  emalLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Email Label',
    className: 'col-md-12',
    placeholder: 'Email Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Email Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  phoneNumberLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Phone Number Label',
    className: 'col-md-12',
    placeholder: 'Phone Number Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Phone Number Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  addressLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Address Label',
    className: 'col-md-12',
    placeholder: 'Address Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Address Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bankAccountLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bank Account Label',
    className: 'col-md-12',
    placeholder: 'Bank Account Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bank Account Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  sslNumberLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'SSL Number Label',
    className: 'col-md-12',
    placeholder: 'SSL Number Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('SSL Number Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  currentSubscriptionLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Current Subscription Label',
    className: 'col-md-12',
    placeholder: 'Current Subscription Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Current Subscription Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  paymentMethodLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Payment Method Label',
    className: 'col-md-12',
    placeholder: 'Payment Method Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Payment Method Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  totalBidsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Total Bids Label',
    className: 'col-md-12',
    placeholder: 'Total Bids Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Total Bids Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  auctionsWonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Auctions Won Label',
    className: 'col-md-12',
    placeholder: 'Auctions Won Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Auctions Won Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default USER_PROFILE_SECTION_FORM_SCHEMA;
