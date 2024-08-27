import { IMAGE_FILE_TYPES, INPUT_TYPES } from '../../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const AUCTION_ENDED_FORM_SCHEMA = {
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
      "Use {{auctionName}} to show the name of the auction. Use {{winningBidAmount}} to show the winning bid amount if applicable. Use {{winnerName}} to show the winner's name if applicable.",
    className: 'col-md-12',
    placeholder: 'Description',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Description').REQUIRED,
    },
  },
  icon: {
    type: INPUT_TYPES.FILE,
    label: 'Icon',
    className: 'col-md-6',
    accept: IMAGE_FILE_TYPES,
    placeholder: 'Icon',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Icon').REQUIRED,
    },
  },
  backgroundColor: {
    type: INPUT_TYPES.COLOR,
    label: 'Background Color',
    className: 'col-md-6',
    placeholder: 'Background Color',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Background Color').REQUIRED,
    },
  },
  isEnabled: {
    type: INPUT_TYPES.SWITCH,
    label: 'Notification Enable',
    className: 'col-md-12',
  },
};

export default AUCTION_ENDED_FORM_SCHEMA;
