import {
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
} from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const ABOUT_US_FORM_SCHEMA = {
  modelHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Model Header',
    className: 'col-md-12',
    placeholder: 'Model Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Model Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  modelIcon: {
    type: INPUT_TYPES.FILE,
    label: 'Model Icon',
    className: 'col-md-12',
    placeholder: 'Model Icon',
    accept: IMAGE_FILE_TYPES,
    schema: {
      required: FORM_VALIDATION_MESSAGES('Model Icon').REQUIRED,
    },
  },
  fuelHeaderHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Fuel Header',
    className: 'col-md-12',
    placeholder: 'Fuel Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Fuel Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  fuelIcon: {
    type: INPUT_TYPES.FILE,
    label: 'Fuel Icon',
    className: 'col-md-12',
    placeholder: 'Fuel Icon',
    accept: IMAGE_FILE_TYPES,
    schema: {
      required: FORM_VALIDATION_MESSAGES('Fuel Icon').REQUIRED,
    },
  },
  engineHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Engine Header',
    className: 'col-md-12',
    placeholder: 'Engine Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Engine Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  engineIcon: {
    type: INPUT_TYPES.FILE,
    label: 'Engine Icon',
    className: 'col-md-12',
    placeholder: 'Engine Icon',
    accept: IMAGE_FILE_TYPES,
    schema: {
      required: FORM_VALIDATION_MESSAGES('Engine Icon').REQUIRED,
    },
  },
  gearboxHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'GearBox Header',
    className: 'col-md-12',
    placeholder: 'GearBox Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('GearBox Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  gearboxIcon: {
    type: INPUT_TYPES.FILE,
    label: 'GearBox Icon',
    className: 'col-md-12',
    placeholder: 'GearBox Icon',
    accept: IMAGE_FILE_TYPES,
    schema: {
      required: FORM_VALIDATION_MESSAGES('GearBox Icon').REQUIRED,
    },
  },
  numberOfSeatsHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Number Of Seats Header',
    className: 'col-md-12',
    placeholder: 'Number Of Seats Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Number Of Seats Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  numberOfSeatsIcon: {
    type: INPUT_TYPES.FILE,
    label: 'Number Of Seats Icon',
    className: 'col-md-12',
    placeholder: 'Number Of Seats Icon',
    accept: IMAGE_FILE_TYPES,
    schema: {
      required: FORM_VALIDATION_MESSAGES('Number Of Seats Icon').REQUIRED,
    },
  },
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
  specificationsHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Specifications Header',
    className: 'col-md-6',
    placeholder: 'Specifications Header',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Specifications Header').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  registrationNumberLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Registration Number Label',
    className: 'col-md-6',
    placeholder: 'Registration Number Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Registration Number Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  modelYearLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Model Year Label',
    className: 'col-md-6',
    placeholder: 'Model Year Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Model Year Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  paintLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Paint Label',
    className: 'col-md-6',
    placeholder: 'Paint Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Paint Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  fuelLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Fuel Label',
    className: 'col-md-6',
    placeholder: 'Fuel Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Fuel Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  motorLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Motor Label',
    className: 'col-md-6',
    placeholder: 'Motor Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Motor Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  gearboxLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Gearbox Label',
    className: 'col-md-6',
    placeholder: 'Gearbox Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Gearbox Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  gearCountLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Gear Count Label',
    className: 'col-md-6',
    placeholder: 'Gear Count Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Gear Count Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  seatCountLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Seat Count Label',
    className: 'col-md-6',
    placeholder: 'Seat Count Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Seat Count Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  securityLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Security Label',
    className: 'col-md-6',
    placeholder: 'Security Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Security Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  comfortLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Comfort Label',
    className: 'col-md-6',
    placeholder: 'Comfort Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Comfort Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  appearanceLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Appearance Label',
    className: 'col-md-6',
    placeholder: 'Appearance Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Appearance Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
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
  },
  currentPriceLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Current Price Label',
    className: 'col-md-6',
    placeholder: 'Current Price Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Current Price Label').REQUIRED,
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
    placeholder: 'Reserve Price Not Met Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price Not Met Label')
        .REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  biddersRequiredLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Bidders Required Label',
    className: 'col-md-6',
    placeholder: 'Bidders Required Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bidders Required Label').REQUIRED,
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
  placeBidButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Place Bid Button Label',
    className: 'col-md-6',
    placeholder: 'Place Bid Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Place Bid Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  moreInormationLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'More Information Label',
    className: 'col-md-6',
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
    className: 'col-md-6',
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

export default ABOUT_US_FORM_SCHEMA;
