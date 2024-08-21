import {
  INPUT_TYPES,
  VALIDATION_REGEX,
} from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';
import OTP_CODE_TYPE from './constants';

const OTP_FORM_SCHEMA = (authenticationType: number) => ({
  otp: {
    type: INPUT_TYPES.NUMBER,
    label:
      authenticationType === OTP_CODE_TYPE.OTP
        ? 'Enter Authenticator Code'
        : 'Enter Recovery Code',
    className: 'col-md-12',
    placeholder:
      authenticationType === OTP_CODE_TYPE.OTP
        ? 'Enter Authenticator Code'
        : 'Enter Recovery Code',
    schema: {
      required: FORM_VALIDATION_MESSAGES(
        authenticationType === OTP_CODE_TYPE.OTP
          ? 'Enter Authenticator Code'
          : 'Enter Recovery Code'
      ).REQUIRED,
      pattern: {
        value: VALIDATION_REGEX.OTP,
        message: FORM_VALIDATION_MESSAGES().OTP,
      },
    },
  },
});
export default OTP_FORM_SCHEMA;
