type ValidationMessages = {
  REQUIRED: string;
  MIN_LENGTH: string;
  MAX_LENGTH: string;
  VALID_EMAIL: string;
  VALID_PASSWORD: string;
  VALID_USERNAME: string;
  CONFIRM_PASSWORD: string;
  VIDEO_NAME: string;
  VALID_LINK: string;
  OTP: string;
  ANSWER_REQUIRED: string;
  LONGER_ANSWER_REQUIRED: string;
  MAX_NUMBER: string;
};

const FORM_VALIDATION_MESSAGES = (...args: number[]): ValidationMessages => ({
  REQUIRED: 'This is required.',
  MIN_LENGTH: `This input requires a minimum of ${args[0]} characters.`,
  MAX_LENGTH: `This input exceeded the maximum length of ${args[0]} characters.`,
  VALID_EMAIL: 'Please enter a valid email.',
  OTP: 'Please enter a 6 digit code',
  VALID_PASSWORD:
    'Use a password between 6 to 20 characters that contains at least one numeric digit, one uppercase, and one lowercase letter.',
  VALID_USERNAME:
    'Use a username between 5 to 18 lowercase alphanumeric characters; special characters and spaces are not allowed.',
  CONFIRM_PASSWORD: 'Your passwords do not match.',
  VIDEO_NAME:
    'Use a filename between 5 to 18 alphanumeric characters; special characters are not allowed.',
  VALID_LINK: 'Please enter a valid link.',
  ANSWER_REQUIRED: 'Please add your answer to join this squad.',
  LONGER_ANSWER_REQUIRED: 'Please provide a longer answer.',
  MAX_NUMBER: `Maximum value should be less than ${args[0]}.`,
});

export default FORM_VALIDATION_MESSAGES;
