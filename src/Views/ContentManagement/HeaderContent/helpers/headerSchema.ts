import { INPUT_TYPES } from '../../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const HEADER_CONTENT_FORM_SCHEMA = {
  logoText: {
    type: INPUT_TYPES.TEXT,
    label: 'Header Logo Text',
    className: 'col-md-12',
    placeholder: 'Header Logo Text',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  homeLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Home Label',
    className: 'col-md-12',
    placeholder: 'Home Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  howItWorksLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'How It Works Label',
    className: 'col-md-12',
    placeholder: 'How It Works Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  auctionsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Auctions Label',
    className: 'col-md-12',
    placeholder: 'Auctions Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  buyCreditsLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Buy Credits Label',
    className: 'col-md-12',
    placeholder: 'Buy Credits Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  searchPlaceholder: {
    type: INPUT_TYPES.TEXT,
    label: 'Search Placeholder',
    className: 'col-md-12',
    placeholder: 'Search Placeholder',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  loginButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Login Button Label',
    className: 'col-md-12',
    placeholder: 'Login Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  registerButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Register Button Label',
    className: 'col-md-12',
    placeholder: 'Register Button Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },

  isVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide Header Content',
    className: 'col-md-12',
  },
};

export default HEADER_CONTENT_FORM_SCHEMA;
