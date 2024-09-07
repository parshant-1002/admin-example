import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const AUCTION_WON_SECTION_CONTENT = {
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
  timerLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Timer Label',
    className: 'col-md-6',
    placeholder: 'Timer Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Timer Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },

  placeOrderButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Place Order Button Label',
    className: 'col-md-6',
    placeholder: 'Place Order Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Place Order Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  orderPurchasedLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Order Purchased Label',
    className: 'col-md-6',
    placeholder: 'Order Purchased Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Order Purchased Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  wonForValue: {
    type: INPUT_TYPES.TEXT,
    subLabel: 'Use {{price}} for product price value',
    label: 'Won For Value',
    className: 'col-md-6',
    placeholder: 'Enter Won For Value',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Won For Value').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
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

export default AUCTION_WON_SECTION_CONTENT;
