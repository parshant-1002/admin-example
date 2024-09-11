import {
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
} from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const TOP_AUCTION_SECTION_CONTENT = {
  biddersRequiredLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bidders Required Label',
    subLabel: 'Use {{biddersRequiredLabel}} to show bidders required count',
    className: 'col-md-6',
    placeholder: 'Bidders Required Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bidders Required Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  biddersRequiredValue: {
    type: INPUT_TYPES.TEXT,
    label: 'Bidders Required Label',
    subLabel:
      'Use {{currentlySubscribedUser}} and {{preAuctionUsersCount}} to show currently subscribed users and users required count',
    className: 'col-md-6',
    placeholder: 'Bidders Required Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bidders Required Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  currentBidLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Current Bid Label',
    className: 'col-md-6',
    placeholder: 'Enter Current Bid Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Current Bid Label').REQUIRED,
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
  currentBidValue: {
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
  totalBidsValue: {
    type: INPUT_TYPES.TEXT,
    subLabel: 'Use {{totalBids}} to show Total Bids',
    label: 'Total Bids Value',
    className: 'col-md-6',
    placeholder: 'Enter Total Bids Value',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Total Bids Value').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  reservePriceMetLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Reserve Price Met Label',
    className: 'col-md-6',
    placeholder: 'Enter Reserve Price Met Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Met Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  reservePriceNotMetLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Reserve Price Not Met Label',
    className: 'col-md-6',
    placeholder: 'Enter Reserve Price Not Met Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Not Met Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  placeBetButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Place Bet Tab Label',
    className: 'col-md-6',
    placeholder: 'Place Bet Tab Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Place Bet Tab Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  timeLeftLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Time Left Label',
    className: 'col-md-6',
    placeholder: 'Enter Time Left Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Time Left Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  reservePriceLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Reserve Price Label',
    className: 'col-md-6',
    placeholder: 'Reserve Price Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  moreInformationLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'More Information Label',
    className: 'col-md-6',
    placeholder: 'Enter More Information Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('More Information Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  historyLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'History Label',
    className: 'col-md-6',
    placeholder: 'Enter History Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('History Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  bidPlacedLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bid Placed Label',
    className: 'col-md-6',
    placeholder: 'Bid Placed Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bid Placed Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },

  auctionEndedLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Auction Ended Label',
    className: 'col-md-6',
    placeholder: 'Auction Ended Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Auction Ended Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  alreadyJoinedLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Already Joined Label',
    className: 'col-md-6',
    placeholder: 'Already Joined Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Already Joined Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  auctionStartsInLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Auction Starts In Label',
    className: 'col-md-6',
    placeholder: 'Auction Starts In Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Auction Starts In Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  auctionEndsInLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Auction Ends In Label',
    className: 'col-md-6',
    placeholder: 'Auction Ends In Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Auction Ends In Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  placeBidsByLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Place Bids By Label',
    className: 'col-md-6',
    placeholder: 'Place Bids By Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Place Bids By Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },

  joinTheContentLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Join The Contest Label',
    className: 'col-md-6',
    placeholder: 'Join The Contest Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Join The Contest Label').REQUIRED,
      minLength: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
      },
    },
  },
  totalBidsImage: {
    type: INPUT_TYPES.FILE,
    accept: IMAGE_FILE_TYPES,
    label: 'Total Bids Icon',
    className: 'col-md-6',
    placeholder: 'Total Bids Icon',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Total Bids Icon').REQUIRED,
    },
  },
  historyImage: {
    type: INPUT_TYPES.FILE,
    accept: IMAGE_FILE_TYPES,
    label: 'History Icon',
    className: 'col-md-6',
    placeholder: 'History Icon',
    schema: {
      required: FORM_VALIDATION_MESSAGES('History Icon').REQUIRED,
    },
  },
};

export default TOP_AUCTION_SECTION_CONTENT;
