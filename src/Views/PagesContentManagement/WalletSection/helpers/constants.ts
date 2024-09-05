import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const WALLET_SECTION_FORM_SCHEMA = {
  availabeBidsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Available Bids Label',
    className: 'col-md-6',
    placeholder: 'Available Bids Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Available Bids Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidSpentLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Spent Label',
    className: 'col-md-6',
    placeholder: 'Bid Spent Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Spent Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidPurchaseLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Purchase Label',
    className: 'col-md-6',
    placeholder: 'Bid Purchase Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Purchase Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  currentSubscriptionLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Current Subscription Label',
    className: 'col-md-6',
    placeholder: 'Current Subscription Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Current Subscription Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  topUpBidsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Top Up Bids Label',
    className: 'col-md-6',
    placeholder: 'Top Up Bids Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Top Up Bids Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidsSpentTabLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bids Spent Tab Label',
    className: 'col-md-6',
    placeholder: 'Bids Spent Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bids Spent Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  transactionsTabLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Transactions Tab Label',
    className: 'col-md-6',
    placeholder: 'Transactions Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Transactions Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidSpentIdLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Spent ID Label',
    className: 'col-md-6',
    placeholder: 'Bid Spent ID Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Spent ID Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  bidSpentProductLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Spent Product Label',
    className: 'col-md-6',
    placeholder: 'Bid Spent Product Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Spent Product Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidSpentDateLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Spent Date Label',
    className: 'col-md-6',
    placeholder: 'Bid Spent Date Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Spent Date Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidSpentSpentColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Spent Column Label',
    className: 'col-md-6',
    placeholder: 'Bid Spent Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Spent Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidSpentReportColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Spent Report Column Label',
    className: 'col-md-6',
    placeholder: 'Bid Spent Report Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Spent Report Column Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidSpentViewDetailsColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Spent View Details Column Label',
    className: 'col-md-6',
    placeholder: 'Bid Spent View Details Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Spent View Details Column Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  transactionIdLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Transaction ID Label',
    className: 'col-md-6',
    placeholder: 'Transaction ID Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Transaction ID Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  transactionAuctionLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bids Purchase Label',
    className: 'col-md-6',
    placeholder: 'Bids Purchase Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bids Purchase Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  transactionProductNameLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Plan name Label',
    className: 'col-md-6',
    placeholder: 'Plan name Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Plan name Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  transactiionProductPriceLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Transaction Product Price Label',
    className: 'col-md-6',
    placeholder: 'Transaction Product Price Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Transaction Product Price Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  transactionDateLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Transaction Date Label',
    className: 'col-md-6',
    placeholder: 'Transaction Date Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Transaction Date Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default WALLET_SECTION_FORM_SCHEMA;
