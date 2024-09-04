import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const PROFILE_OVERVIEW_FORM_SCHEMA = {
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
  bidsAvailableLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bids Available Label',
    className: 'col-md-12',
    placeholder: 'Bids Available Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bids Available Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  totalSavingsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Total Savings Label',
    className: 'col-md-12',
    placeholder: 'Total Savings Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Total Savings Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  recentWinsHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Recent Wins Header',
    className: 'col-md-12',
    placeholder: 'Recent Wins Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Recent Wins Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  wonForLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Won For Label',
    className: 'col-md-12',
    placeholder: 'Won For Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Won For Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  placeOrderButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Place Order Button Label',
    className: 'col-md-12',
    placeholder: 'Place Order Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Place Order Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  orderPurchasedButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Order Purchased Button Label',
    className: 'col-md-12',
    placeholder: 'Order Purchased Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Order Purchased Button Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default PROFILE_OVERVIEW_FORM_SCHEMA;
