import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const TOP_AUCTION_SECTION_CONTENT = {
  topAuctionsIsVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide Top Auctions Section',
    className: 'col-md-12 notifications',
  },
  topAuctionsTabLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Top Auctions Tab Label',
    className: 'col-md-6',
    placeholder: 'Top Auctions Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Top Auctions Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  topAuctionsTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Top Auctions Title',
    className: 'col-md-6',
    placeholder: 'Enter Top Auctions Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Top Auctions Title').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  exploreMoreAuctionsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Explore More Auctions Label',
    className: 'col-md-6',
    placeholder: 'Enter Explore More Auctions Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Explore More Auctions Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  noAuctionsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'No Auctions Label',
    className: 'col-md-6',
    placeholder: 'Enter No Auctions Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('No Auctions Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default TOP_AUCTION_SECTION_CONTENT;
