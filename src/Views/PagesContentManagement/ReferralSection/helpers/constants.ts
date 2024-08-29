import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const REFERRAL_SECTION_FORM_SCHEMA = {
  joinedHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Joined Header',
    className: 'col-md-6',
    placeholder: 'Joined Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Joined Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  idColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'ID Column Label',
    className: 'col-md-6',
    placeholder: 'ID Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('ID Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  nameColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Name Column Label',
    className: 'col-md-6',
    placeholder: 'Name Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Name Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  joinedColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Joined Column Label',
    className: 'col-md-6',
    placeholder: 'Joined Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Joined Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidsEarnedColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bids Earned Column Label',
    className: 'col-md-6',
    placeholder: 'Bids Earned Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bids Earned Column Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  referralCodeLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Referral Code Label',
    className: 'col-md-6',
    placeholder: 'Referral Code Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Referral Code Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  referralLinkLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Referral Link Label',
    className: 'col-md-6',
    placeholder: 'Referral Link Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Referral Link Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  recievedBonusLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Received Bonus Label',
    className: 'col-md-6',
    placeholder: 'Received Bonus Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Received Bonus Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  referralCodeTagLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Referral Code Tag Label',
    className: 'col-md-6',
    placeholder: 'Referral Code Tag Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Referral Code Tag Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default REFERRAL_SECTION_FORM_SCHEMA;
