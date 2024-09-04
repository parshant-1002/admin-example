import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const PROFILE_PAGE_FORM_SCHEMA = {
  joinedOnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Joined On Label',
    className: 'col-md-12',
    placeholder: 'Joined On Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Joined On Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  overviewTabLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Overview Tab Label',
    className: 'col-md-12',
    placeholder: 'Overview Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Overview Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  auctionTabLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Auction Tab Label',
    className: 'col-md-12',
    placeholder: 'Auction Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Auction Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  pennyAuctionTabLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Penny Auction Tab Label',
    className: 'col-md-12',
    placeholder: 'Penny Auction Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Penny Auction Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  currentBidTabLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Current Bid Tab Label',
    className: 'col-md-12',
    placeholder: 'Current Bid Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Current Bid Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  walletTabLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Wallet Tab Label',
    className: 'col-md-12',
    placeholder: 'Wallet Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Wallet Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  referralTabLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Referral Tab Label',
    className: 'col-md-12',
    placeholder: 'Referral Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Referral Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default PROFILE_PAGE_FORM_SCHEMA;
