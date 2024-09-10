import {
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
} from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const ABOUT_US_FORM_SCHEMA = {
  currentPriceHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Current Price Header',
    className: 'col-md-12',
    placeholder: 'Current Price Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Current Price Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  currentPriceValue: {
    type: INPUT_TYPES.TEXT,
    subLabel: 'Use {{currentPrice}} to show current price',
    label: 'Current Price Value',
    className: 'col-md-6',
    placeholder: 'Enter Current Price Value',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Current Price Value').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  reservePriceValue: {
    type: INPUT_TYPES.TEXT,
    label: 'Reserve Price Value',
    subLabel: 'Use {{reservePrice}} to show reserve price',
    className: 'col-md-6',
    placeholder: 'Enter Reserve Price Value',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Value').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  reservePriceHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Reserve Price Header',
    className: 'col-md-6',
    placeholder: 'Reserve Price Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  auctionTimeLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Auction Time Label',
    className: 'col-md-6',
    placeholder: 'Auction Time Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Auction Time Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  placeBidsButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Place Bids Button Label',
    className: 'col-md-6',
    placeholder: 'Place Bids Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Place Bids Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  joinListButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Join List Button Label',
    className: 'col-md-6',
    placeholder: 'Join List Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Join List Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  placeAutomaticBidsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Place Automatic Bids Label',
    className: 'col-md-6',
    placeholder: 'Place Automatic Bids Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Place Automatic Bids Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  shareAuctionHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Share Auction Header',
    subLabel: 'Use {{earnBids}}  to show bids to earn with social share',
    className: 'col-md-6',
    placeholder: 'Share Auction Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Share Auction Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  automaticBidLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Automatic Bid Label',
    className: 'col-md-6',
    placeholder: 'Automatic Bid Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Automatic Bid Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  automaticBidCancelLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Automatic Bid Cancel Label',
    className: 'col-md-6',
    placeholder: 'Automatic Bid Cancel Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Automatic Bid Cancel Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  automaticBidValue: {
    type: INPUT_TYPES.TEXT,
    label: 'Automatic Bid Value',
    subLabel:
      'Use {{automaticBidsLeft}} and {{automaticTotalBids}} to show automatic bids left and total bids',
    className: 'col-md-6',
    placeholder: 'Automatic Bid Value',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Automatic Bid Value').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  manualBidRBLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Manual Bid Radio Button Label',
    className: 'col-md-6',
    placeholder: 'Manual Bid Radio Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Manual Bid Radio Button Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  automaticBidRBLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Automatic Bid Radio Button Label',
    className: 'col-md-6',
    placeholder: 'Automatic Bid Radio Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Automatic Bid Radio Button Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  placedBidLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Placed Bid Label',
    className: 'col-md-6',
    placeholder: 'Placed Bid Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Placed Bid Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  placedBidValue: {
    type: INPUT_TYPES.TEXT,
    subLabel: 'Use {{placedBid}} to show total placed bids',
    label: 'Total Bids Placed Value',
    className: 'col-md-6',
    placeholder: 'Enter Total Bids Placed Value',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Total Bids Placed Value').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  placedBidIconData: {
    type: INPUT_TYPES.FILE,
    accept: IMAGE_FILE_TYPES,
    label: 'Total Bids Icon',
    className: 'col-md-6',
    placeholder: 'Total Bids Icon',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Total Bids Icon').REQUIRED,
    },
  },

  // recent bids
  recentBidsTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
    subLabel: 'Use {{bidsCount}} to show recent bids count',
    className: 'col-md-6',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Title').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
    addHorizontalLine: true,
    addHorizontalTitle: 'Recent Bids Section',
  },
  userColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'User Column Label',
    className: 'col-md-6',
    placeholder: 'User Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('User Column Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  bidColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Column Label',
    className: 'col-md-6',
    placeholder: 'Bid Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Column Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  timeColumnLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Time Column Label',
    className: 'col-md-6',
    placeholder: 'Time Column Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Time Column Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  exploreMoreAuctionsHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Explore More Auctions Header',
    className: 'col-md-6',
    placeholder: 'Explore More Auctions Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Explore More Auctions Header')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
    addHorizontalLine: true,
    addHorizontalTitle: 'Explore More  Section',
  },
};

export default ABOUT_US_FORM_SCHEMA;
