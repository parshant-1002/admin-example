import { INPUT_TYPES } from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const FAQ_CONTENT_FORM_SCHEMA = {
  faqTagLabel: {
    type: INPUT_TYPES.TEXT,
    label: 'Faqs Tag Label',
    className: 'col-md-12',
    placeholder: 'Faqs Tag Label',
    schema: {
      // required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
    addHorizontalLine: true,
  },
  // companyLogo:{
  //     type: INPUT_TYPES.FILE,
  //     label: 'Images',
  //     accept: IMAGE_FILE_TYPES,
  //     className: 'col-md-12',
  //     placeholder: 'Images',
  //     schema: {
  //         required: FORM_VALIDATION_MESSAGES().REQUIRED,
  //     }
  // },
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Faqs Title',
    className: 'col-md-12',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  isVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide Faq Content',
    className: 'col-md-12',
  },
};

export default FAQ_CONTENT_FORM_SCHEMA;
