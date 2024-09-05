import {
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
} from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const CONTACT_US_FORM_SCHEMA = {
  contactUsIsVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide Contact Us Section',
    className: 'col-md-12 notifications',
  },
  phoneNumberImageURL: {
    type: INPUT_TYPES.FILE,
    label: 'Phone Number Image',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-12',
    placeholder: 'Upload Phone Number Image',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  phoneNumberTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Phone Number Title',
    className: 'col-md-6',
    placeholder: 'Enter Phone Number Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  phoneNumber: {
    type: INPUT_TYPES.TEXT,
    label: 'Phone Number',
    className: 'col-md-6',
    placeholder: 'Enter Phone Number',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 10,
        message: FORM_VALIDATION_MESSAGES(10).MIN_LENGTH,
      },
    },
  },
  emailImageURL: {
    type: INPUT_TYPES.FILE,
    label: 'Email Image',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-12',
    placeholder: 'Upload Email Image',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  emailTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Email Title',
    className: 'col-md-6',
    placeholder: 'Enter Email Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  email: {
    type: INPUT_TYPES.TEXT,
    label: 'Email Address',
    className: 'col-md-6',
    placeholder: 'Enter Email Address',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  addressImageURL: {
    type: INPUT_TYPES.FILE,
    label: 'Address Image',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-12',
    placeholder: 'Upload Address Image',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  addressTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'Address Title',
    className: 'col-md-6',
    placeholder: 'Enter Address Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  address: {
    type: INPUT_TYPES.TEXT,
    label: 'Address',
    className: 'col-md-6',
    placeholder: 'Enter Address',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 10,
        message: FORM_VALIDATION_MESSAGES(10).MIN_LENGTH,
      },
    },
  },
  contactUsMapLatitude: {
    type: INPUT_TYPES.NUMBER,
    label: 'Map Latitude',
    className: 'col-md-6',
    placeholder: 'Enter Map Latitude',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  contactUsMapLongitude: {
    type: INPUT_TYPES.NUMBER,
    label: 'Map Longitude',
    className: 'col-md-6',
    placeholder: 'Enter Map Longitude',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  // socialConnectTitle: {
  //   type: INPUT_TYPES.TEXT,
  //   label: 'Social Connect Title',
  //   className: 'col-md-6',
  //   placeholder: 'Enter Social Connect Title',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES().REQUIRED,
  //     minLength: {
  //       value: 3,
  //       message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
  //     },
  //   },
  // },
  // socialConnectImageURL: {
  //     type: INPUT_TYPES.FILE,
  //     label: 'Social Icon Image',
  //     accept: IMAGE_FILE_TYPES,
  //     className: 'col-md-12',
  //     placeholder: 'Upload Social Icon Image',
  //     schema: {
  //         required: FORM_VALIDATION_MESSAGES().REQUIRED,
  //     }
  // },
  // socialConnectURL: {
  //     type: INPUT_TYPES.TEXT,
  //     label: 'Social URL',
  //     className: 'col-md-6',
  //     placeholder: 'Enter Social URL',
  //     schema: {
  //         required: FORM_VALIDATION_MESSAGES().REQUIRED,
  //     }
  // }
};

export default CONTACT_US_FORM_SCHEMA;
