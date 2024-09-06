import { IMAGE_FILE_TYPES, INPUT_TYPES } from '../../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const AUTOMATIC_BID_RUNNED_OUT_FORM_SCHEMA = {
  isEnabled: {
    type: INPUT_TYPES.SWITCH,
    label: 'Notification Enable',
    className: 'col-md-12 notifications',
  },
  text: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
    className: 'col-md-12',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Title').REQUIRED,
    },
  },
  description: {
    type: INPUT_TYPES.TEXT_AREA,
    label: 'Description',
    subLabel:
      'Use {{auctionName}} to show the name of the auction. Use {{currentBidAmount}} to show the current bid amount.',
    className: 'col-md-12',
    placeholder: 'Description',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Description').REQUIRED,
    },
  },
  icon: {
    type: INPUT_TYPES.FILE,
    label: 'Icon',
    className: 'col-md-12',
    accept: IMAGE_FILE_TYPES,
    placeholder: 'Icon',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Icon').REQUIRED,
    },
  },
  backgroundColor: {
    type: INPUT_TYPES.COLOR,
    label: 'Background Color',
    className: 'col-md-12',
    placeholder: 'Background Color',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Background Color').REQUIRED,
    },
  },
};

export default AUTOMATIC_BID_RUNNED_OUT_FORM_SCHEMA;
