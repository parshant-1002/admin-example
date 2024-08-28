import { IMAGE_FILE_TYPES, INPUT_TYPES } from '../../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const BID_PLAN_PURCHASED_FORM_SCHEMA = {
  text: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
    className: 'col-md-12',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Title').REQUIRED,
    },
  },
  description: {
    type: INPUT_TYPES.TEXT_AREA,
    label: 'Description',
    subLabel:
      'Use {{userName}} to show the name of the user who purchased the bid plan. Use {{planName}} to show the name of the purchased bid plan.',
    className: 'col-md-12',
    placeholder: 'Description',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Description').REQUIRED,
    },
  },
  icon: {
    type: INPUT_TYPES.FILE,
    label: 'Icon',
    className: 'col-md-6',
    accept: IMAGE_FILE_TYPES,
    placeholder: 'Icon',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Icon').REQUIRED,
    },
  },
  backgroundColor: {
    type: INPUT_TYPES.COLOR,
    label: 'Background Color',
    className: 'col-md-6',
    placeholder: 'Background Color',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Background Color').REQUIRED,
    },
  },
  isEnabled: {
    type: INPUT_TYPES.SWITCH,
    label: 'Notification Enable',
    className: 'col-md-12',
  },
};

export default BID_PLAN_PURCHASED_FORM_SCHEMA;
