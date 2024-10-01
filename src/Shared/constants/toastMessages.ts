const TOAST_MESSAGES = (...arg: (string | number)[]) => ({
  SELECT_ATLEAST_ONE_FILE: 'Please select at least one file.',
  PLEASE_CHOOSE_ONLY_ACCEPTED_FILES: `Please choose only ${arg[0]} file.`,
  PLEASE_UPLOAD_ONLY_ACCEPTED_FILES: `Please upload only ${arg[0]} file.`,
  IMAGE_RATIO_ERROR: `Please select image of ratio ${arg[0]}:${arg[1]}`,
});

export default TOAST_MESSAGES;
