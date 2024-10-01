import { INPUT_TYPES } from '../../../../Shared/constants/constants';
import { FORM_VALIDATION_MESSAGES } from '../../../../Shared/constants/validationMessages';

const PLACE_ORDER_POPUP_SECTION_CONTENT = {
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
    className: 'col-md-6',
    placeholder: 'Enter title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Title').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Title').MIN_LENGTH,
      },
    },
  },
  subtitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Subtitle',
    className: 'col-md-6',
    placeholder: 'Enter subtitle',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Subtitle').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Subtitle').MIN_LENGTH,
      },
    },
  },
  firstNameLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'First Name',
    className: 'col-md-6',
    placeholder: 'Enter first name',
    schema: {
      required: FORM_VALIDATION_MESSAGES('First Name').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('First Name').MIN_LENGTH,
      },
    },
  },
  firstNamePlaceholder: {
    type: INPUT_TYPES.TEXT,
    label: 'First Name Placeholder',
    className: 'col-md-6',
    placeholder: 'Enter first name placeholder',
    schema: {
      required: FORM_VALIDATION_MESSAGES('First Name Placeholder').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('First Name Placeholder').MIN_LENGTH,
      },
    },
  },
  lastNameLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Last Name',
    className: 'col-md-6',
    placeholder: 'Enter last name',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Last Name').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Last Name').MIN_LENGTH,
      },
    },
  },
  lastNamePlaceholder: {
    type: INPUT_TYPES.TEXT,
    label: 'Last Name Placeholder',
    className: 'col-md-6',
    placeholder: 'Enter last name placeholder',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Last Name Placeholder').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Last Name Placeholder').MIN_LENGTH,
      },
    },
  },
  emailLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Email',
    className: 'col-md-6',
    placeholder: 'Enter email',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Email').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Email').MIN_LENGTH,
      },
    },
  },
  emailPlaceholder: {
    type: INPUT_TYPES.TEXT,
    label: 'Email Placeholder',
    className: 'col-md-6',
    placeholder: 'Enter email placeholder',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Email Placeholder').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Email Placeholder').MIN_LENGTH,
      },
    },
  },
  phoneNumberLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Phone Number',
    className: 'col-md-6',
    placeholder: 'Enter phone number',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Phone Number').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Phone Number').MIN_LENGTH,
      },
    },
  },
  addressHeader: {
    type: INPUT_TYPES.TEXT,
    label: 'Phone Number PlaceHolder',
    className: 'col-md-6',
    placeholder: 'Enter Phone Number PlaceHolder',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Phone Number PlaceHolder').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Phone Number PlaceHolder')
          .MIN_LENGTH,
      },
    },
  },
  countryLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Country',
    className: 'col-md-6',
    placeholder: 'Enter country',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Country').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Country').MIN_LENGTH,
      },
    },
  },
  countryPlaceholder: {
    type: INPUT_TYPES.TEXT,
    label: 'Country Placeholder',
    className: 'col-md-6',
    placeholder: 'Enter country placeholder',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Country Placeholder').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Country Placeholder').MIN_LENGTH,
      },
    },
  },
  // stateLabel: {
  //   type: INPUT_TYPES.TEXT,
  //   label: 'State',
  //   className: 'col-md-6',
  //   placeholder: 'Enter state',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('State').REQUIRED,
  //     minLength: {
  //       value: 3,
  //       message: FORM_VALIDATION_MESSAGES('State').MIN_LENGTH,
  //     },
  //   },
  // },
  // statePlaceholder: {
  //   type: INPUT_TYPES.TEXT,
  //   label: 'State Placeholder',
  //   className: 'col-md-6',
  //   placeholder: 'Enter state placeholder',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('State Placeholder').REQUIRED,
  //     minLength: {
  //       value: 3,
  //       message: FORM_VALIDATION_MESSAGES('State Placeholder').MIN_LENGTH,
  //     },
  //   },
  // },
  cityLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'City',
    className: 'col-md-6',
    placeholder: 'Enter city',
    schema: {
      required: FORM_VALIDATION_MESSAGES('City').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('City').MIN_LENGTH,
      },
    },
  },
  cityPlaceholder: {
    type: INPUT_TYPES.TEXT,
    label: 'City Placeholder',
    className: 'col-md-6',
    placeholder: 'Enter city placeholder',
    schema: {
      required: FORM_VALIDATION_MESSAGES('City Placeholder').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('City Placeholder').MIN_LENGTH,
      },
    },
  },
  pincodeLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Pincode',
    className: 'col-md-6',
    placeholder: 'Enter pincode',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Pincode').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Pincode').MIN_LENGTH,
      },
    },
  },
  pincodePlaceholder: {
    type: INPUT_TYPES.TEXT,
    label: 'Pincode Placeholder',
    className: 'col-md-6',
    placeholder: 'Enter pincode placeholder',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Pincode Placeholder').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Pincode Placeholder').MIN_LENGTH,
      },
    },
  },
  addressLine1Label: {
    type: INPUT_TYPES.TEXT,
    label: 'Address Line 1',
    className: 'col-md-6',
    placeholder: 'Enter address line 1',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Address Line 1').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Address Line 1').MIN_LENGTH,
      },
    },
  },
  addressLine1Placeholder: {
    type: INPUT_TYPES.TEXT,
    label: 'Address Line 1 Placeholder',
    className: 'col-md-6',
    placeholder: 'Enter address line 1 placeholder',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Address Line 1 Placeholder').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Address Line 1 Placeholder')
          .MIN_LENGTH,
      },
    },
  },
  addressLine2Label: {
    type: INPUT_TYPES.TEXT,
    label: 'Address Line 2',
    className: 'col-md-6',
    placeholder: 'Enter address line 2',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Address Line 2').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Address Line 2').MIN_LENGTH,
      },
    },
  },
  addressLine2Placeholder: {
    type: INPUT_TYPES.TEXT,
    label: 'Address Line 2 Placeholder',
    className: 'col-md-6',
    placeholder: 'Enter address line 2 placeholder',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Address Line 2 Placeholder').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Address Line 2 Placeholder')
          .MIN_LENGTH,
      },
    },
  },
  placeOrderButtonLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Place Order Button Label',
    className: 'col-md-6',
    placeholder: 'Enter place order button label',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Place Order Button Label').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES('Place Order Button Label')
          .MIN_LENGTH,
      },
    },
  },
};

export default PLACE_ORDER_POPUP_SECTION_CONTENT;
