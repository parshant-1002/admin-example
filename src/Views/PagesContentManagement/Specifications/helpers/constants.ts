import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const SPECIFICATIONS_FORM_SCHEMA = {
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
  modelHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Body Type Label',
    className: 'col-md-6',
    placeholder: 'Body Type Label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Body Type Label').REQUIRED,
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
};

export default SPECIFICATIONS_FORM_SCHEMA;
