export const FORM_VALIDATION_MESSAGES = (...args) => ({
  REQUIRED: 'This is required.',
  MIN_LENGTH: `This input required minimum (${args[0]}) character`,
  MAX_LENGTH: `This input exceeded maxLength (${args[0]})`,
  VALID_EMAIL: 'Please enter the valid email',
  VALID_PASSWORD:
    'Use a password between 6 to 20 characters that contain at least one numeric digit, one uppercase, and one lowercase letter.',
  VALID_USERNAME:
    'Use a username between 5 to 18 lowercase alphanumeric characters, special characters and spaces are not allowed.',
  CONFIRM_PASSWORD: 'Your passwords do not match',
  VIDEO_NAME:
    'Use a filename between 5 to 18 alphanumeric characters, special characters are not allowed.',
  VALID_LINK: 'Please enter valid link.',
  ANSWER_REQUIRED: 'Please add your answer to join this squad',
  LONDER_ANSWER_REQUIRED: 'Please provide a longer answer',
  MAX_NUMBER: `Maximum value should be less than (${args[0]})`,
});
