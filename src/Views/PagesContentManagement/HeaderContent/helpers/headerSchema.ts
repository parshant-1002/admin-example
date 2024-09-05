import { IMAGE_FILE_TYPES, INPUT_TYPES } from '../../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const HEADER_CONTENT_FORM_SCHEMA = {
  isVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide Header Content',
    className: 'col-md-12 notifications',
  },
  logoText: {
    type: INPUT_TYPES.TEXT,
    label: 'Header Logo Text',
    className: 'col-md-6',
    placeholder: 'Header Logo Text',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  homeLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Home Label',
    className: 'col-md-6',
    placeholder: 'Home Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  howItWorksLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'How It Works Label',
    className: 'col-md-6',
    placeholder: 'How It Works Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  auctionsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Auctions Label',
    className: 'col-md-6',
    placeholder: 'Auctions Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  buyCreditsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Buy Credits Label',
    className: 'col-md-6',
    placeholder: 'Buy Credits Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  searchPlaceholder: {
    type: INPUT_TYPES.TEXT,
    label: 'Search Placeholder',
    className: 'col-md-6',
    placeholder: 'Search Placeholder',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  loginButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Login Button Label',
    className: 'col-md-6',
    placeholder: 'Login Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  // registerButtonLabel: {
  //   type: INPUT_TYPES.TEXT,
  //   label: 'Register Button Label',
  //   className: 'col-md-6',
  //   placeholder: 'Register Button Label',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES().REQUIRED,
  //   },
  // },
  userProfileIcon: {
    type: INPUT_TYPES.FILE,
    label: 'User Profile Icon',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-6',
    placeholder: 'User Profile Icon',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  logoutIcon: {
    type: INPUT_TYPES.FILE,
    label: 'Logout Icon',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-6',
    placeholder: 'Logout Icon',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  notificationIcon: {
    type: INPUT_TYPES.FILE,
    label: 'Notification Icon',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-6',
    placeholder: 'Notification Icon',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  walletIcon: {
    type: INPUT_TYPES.FILE,
    label: 'Wallet Icon',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-6',
    placeholder: 'Wallet Icon',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
};

export default HEADER_CONTENT_FORM_SCHEMA;
