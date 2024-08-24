import { INPUT_TYPES } from '../../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const BID_PACK_CONTENT_FORM_SCHEMA = {
  bidPackTagLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Pack Tag Label',
    className: 'col-md-12',
    placeholder: 'Bid Pack Tag Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Pack Tag Label').REQUIRED,
    },
  },
  bidPackTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Pack Title',
    className: 'col-md-12',
    placeholder: 'Bid Pack Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Pack Title').REQUIRED,
    },
  },
  bidPackPurchaseButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Pack Purchase Button Label',
    className: 'col-md-12',
    placeholder: 'Bid Pack Purchase Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Pack Purchase Button Label')
        .REQUIRED,
    },
  },
  bidPackMoreInformationLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Pack More Information Label',
    className: 'col-md-12',
    placeholder: 'Bid Pack More Information Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Pack More Information Label')
        .REQUIRED,
    },
  },

  bidPackIsVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide Bid Pack Content',
    className: 'col-md-12',
  },
};

export default BID_PACK_CONTENT_FORM_SCHEMA;
