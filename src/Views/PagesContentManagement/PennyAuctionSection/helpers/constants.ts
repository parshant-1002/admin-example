import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const PENNY_AUCTION_SECTION_FORM_SCHEMA = {
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

export default PENNY_AUCTION_SECTION_FORM_SCHEMA;
