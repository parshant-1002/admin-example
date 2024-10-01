import {
  INPUT_TYPES,
  STRINGS,
  VALIDATION_REGEX,
} from '../../../../Shared/constants/constants';
import { FORM_VALIDATION_MESSAGES } from '../../../../Shared/constants/validationMessages';
import OTP_CODE_TYPE from './constants';

const OTP_FORM_SCHEMA = (authenticationType: number) => ({
  otp: {
    type: INPUT_TYPES.NUMBER,
    label: STRINGS.EMPTY_STRING,
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
