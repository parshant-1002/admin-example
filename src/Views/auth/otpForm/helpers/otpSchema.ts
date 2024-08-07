import { INPUT_TYPES, VALIDATION_REGEX } from '../../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const OTP_FORM_SCHEMA = {
  otp: {
    type: INPUT_TYPES.NUMBER,
    label: '',
    className: 'col-md-12',
    placeholder: 'Enter Code',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      pattern: {
        value: VALIDATION_REGEX.OTP,
        message: FORM_VALIDATION_MESSAGES().OTP,
      },
    },
  },
};
export default OTP_FORM_SCHEMA;
