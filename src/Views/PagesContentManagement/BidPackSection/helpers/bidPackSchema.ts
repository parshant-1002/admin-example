import { INPUT_TYPES } from '../../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const BID_PACK_CONTENT_FORM_SCHEMA = {
  bidPackIsVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide Bid Pack Content',
    className: 'col-md-12 notifications',
  },
  bidPackTagLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Pack Tag Label',
    className: 'col-md-6',
    placeholder: 'Bid Pack Tag Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Pack Tag Label').REQUIRED,
    },
  },
  bidPackTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Pack Title',
    className: 'col-md-6',
    placeholder: 'Bid Pack Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Pack Title').REQUIRED,
    },
  },
  bidPackPurchaseButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Pack Purchase Button Label',
    className: 'col-md-6',
    placeholder: 'Bid Pack Purchase Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Pack Purchase Button Label')
        .REQUIRED,
    },
  },
  moreInformationLabel: {
    type: INPUT_TYPES.TEXT,
    label: ' More Information Label',
    className: 'col-md-6',
    placeholder: ' More Information Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('More Information Label').REQUIRED,
    },
  },
  monthlyTagLabel: {
    type: INPUT_TYPES.TEXT,
    label: ' Monthly Tag Label',
    className: 'col-md-6',
    placeholder: ' Monthly Tag Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Monthly Tag Label').REQUIRED,
    },
  },
  yearlyTagLabel: {
    type: INPUT_TYPES.TEXT,
    label: ' Yearly Tag Label',
    className: 'col-md-6',
    placeholder: ' Yearly Tag Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Yearly Tag Label').REQUIRED,
    },
  },

  mostPopularLabel: {
    type: INPUT_TYPES.TEXT,
    label: ' Most Popular Label',
    className: 'col-md-6',
    placeholder: ' Most Popular Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Most Popular Label').REQUIRED,
    },
  },
  creditsLabel: {
    type: INPUT_TYPES.TEXT,
    label: ' Credits Label',
    className: 'col-md-6',
    placeholder: ' Credits Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Credits Label').REQUIRED,
    },
  },
  creditsValue: {
    type: INPUT_TYPES.TEXT,
    label: ' Credits Value',
    subLabel: 'Use {{creditValue}} to show number of bids to credit',
    className: 'col-md-6',
    placeholder: ' Credits Value',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Credits Value').REQUIRED,
    },
  },
  priceLabel: {
    type: INPUT_TYPES.TEXT,
    label: ' Price Label',
    className: 'col-md-6',
    placeholder: ' Price Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Price Label').REQUIRED,
    },
  },
  priceValue: {
    type: INPUT_TYPES.TEXT,
    label: ' Price Value',
    subLabel: 'Use {{priceValue}} to show the pack price',
    className: 'col-md-6',
    placeholder: ' Price Value',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Price Value').REQUIRED,
    },
  },
};

export default BID_PACK_CONTENT_FORM_SCHEMA;
