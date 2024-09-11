import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const AUCTION_WON_DETAILS_SECTION_CONTENT = {
  wonForLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Won For Label',
    className: 'col-md-6',
    placeholder: 'Won For Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Won For Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  wonForValue: {
    type: INPUT_TYPES.TEXT,
    label: 'Won For Value',
    subLabel: 'Use {{wonForValue}} to show won for amount',
    className: 'col-md-6',
    placeholder: 'Won For Value',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Won For Value').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  placedAddressTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Placed Address Title',
    className: 'col-md-6',
    placeholder: 'Placed Address Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Placed Address Title').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
};

export default AUCTION_WON_DETAILS_SECTION_CONTENT;
