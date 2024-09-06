import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const TOPUP_POPUP_SECTION_CONTENT = {
  header: {
    type: INPUT_TYPES.TEXT,
    label: 'Header',
    className: 'col-md-6',
    placeholder: 'Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Header').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  creditsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'CreditsLabel',
    className: 'col-md-6',
    placeholder: 'Enter CreditsLabel',
    schema: {
      required: FORM_VALIDATION_MESSAGES('CreditsLabel').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  priceLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Price Label',
    className: 'col-md-6',
    placeholder: 'Price Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Price Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  purchasePackageButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: ' Purchase Package Button Label',
    className: 'col-md-6',
    placeholder: ' Purchase Package Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES(' Purchase Package Button Label')
        .REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  moreInformationLabel: {
    type: INPUT_TYPES.TEXT,
    label: ' More Information Label',
    className: 'col-md-6',
    placeholder: ' More Information Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES(' More Information Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
};
export default TOPUP_POPUP_SECTION_CONTENT;
