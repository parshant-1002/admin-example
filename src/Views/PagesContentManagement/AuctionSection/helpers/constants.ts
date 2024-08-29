import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const USER_PROFILE_SECTION_FORM_SCHEMA = {
  currentPriceLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Current Price Label',
    className: 'col-md-12',
    placeholder: 'Current Price Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Current Price Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  reservePriceNotMetLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Reserve Price Not Met Label',
    className: 'col-md-12',
    placeholder: 'Reserve Price Not Met Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Not Met Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  usersNotJoinedLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Users Not Joined Label',
    className: 'col-md-12',
    placeholder: 'Users Not Joined Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Users Not Joined Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  reservePriceLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Reserve Price Label',
    className: 'col-md-12',
    placeholder: 'Reserve Price Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  joinListButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Join List Button Label',
    className: 'col-md-12',
    placeholder: 'Join List Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Join List Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  placeBidButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Place Bid Button Label',
    className: 'col-md-12',
    placeholder: 'Place Bid Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Place Bid Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  moreInformationLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'More Information Label',
    className: 'col-md-12',
    placeholder: 'More Information Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('More Information Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  historyButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'History Button Label',
    className: 'col-md-12',
    placeholder: 'History Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('History Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default USER_PROFILE_SECTION_FORM_SCHEMA;
