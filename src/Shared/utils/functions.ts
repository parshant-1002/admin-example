/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { toast } from 'react-toastify';
import { ApiError, ErrorResponse } from '../../Models/Apis/Error';
import { setLoading } from '../../Store/Loader';
import { store } from '../../Store';

interface OnQueryStartedArgs {
  onSuccess?: (data: unknown) => void;
  onFailure?: (error: ErrorResponse) => void;
}

// Function to check if the browser is offline
const checkOffline = (): boolean => {
  return !window.navigator.onLine;
};

// Function to remove empty values from an object
function removeEmptyValues<T extends Record<string, unknown>>(
  obj: T = {} as T
): T {
  try {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        delete obj[key];
      }
    }
  } catch (e) {
    obj = {} as T;
  }
  return obj;
}

// Function to get pagination limits based on window width
const getPaginationLimits = (): number => {
  const width = window.innerWidth;
  return width > 600 ? 1 : 0;
};

// Function to get a string value or return an empty string
const getStringValue = (value: unknown): string => {
  if (typeof value === 'string' && value.length) {
    return value;
  }
  return '';
};

// Function to validate fields and return errors
const validateField = (
  fields: Record<string, unknown>
): Record<string, string> => {
  const errorsObject: Record<string, string> = {};
  Object.keys(fields).forEach((key) => {
    if (!fields[key]) {
      errorsObject[key] = `${key} is required`;
    }
  });
  return errorsObject;
};

// Function to check for errors in a roadmap and update the roadmap with errors
const isErrors = (
  roadMap: Record<string, unknown>[],
  setRoadMap: React.Dispatch<React.SetStateAction<Record<string, unknown>[]>>
): boolean => {
  let errors = false;
  roadMap.forEach((item, index) => {
    const currentErrors = validateField(item);
    if (Object.keys(currentErrors).length) {
      errors = true;
      // Update the roadmap with the errors
      const updatedRoadMap = roadMap.map((items, i) =>
        i === index ? { ...items, errors: currentErrors } : items
      );
      setRoadMap(updatedRoadMap);
    }
  });
  // Scroll to the first error field
  const firstErrorField = document.querySelector('.error.invalid-feedback');
  if (firstErrorField) {
    firstErrorField.scrollIntoView({ behavior: 'smooth' });
  }
  return errors;
};

// Function to copy text to clipboard and show a success toast
const copyToClipboard = async (
  value?: string | number | undefined
): Promise<void> => {
  try {
    if (!value) return;
    await navigator.clipboard.writeText(`${value}`);
    toast.success('Copied to clipboard');
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(`Failed to copy text to clipboard: ${error.message}`);
    } else {
      toast.error('An unknown error occurred');
    }
  }
};

const checkValidFileExtension = (
  fileUrl: string | undefined,
  accept: string
): boolean => {
  const validExtensions = accept
    .replace('image/', '.')
    .replace('video/', '.')
    .split(',')
    .map((type: string) => type.trim());
  const fileExtension = `.${fileUrl?.split('.').pop()?.toLowerCase() || ''}`;
  return validExtensions.includes(fileExtension);
};

const convertToLocale = (number: number | string): string => {
  if (Number.isNaN(Number(number))) {
    return String(number);
  }
  const num = Number(number);
  const formattedNumber = Number.isInteger(num) ? num : num.toFixed(2);
  const localeCode = 'en-US';
  return formattedNumber.toLocaleString(localeCode);
};

interface FileWithSrc {
  file: File;
  src?: string;
}

const convertFilesToFormData = (files: FileWithSrc[]): FormData[] => {
  return files.map((fileObj) => {
    const formData = new FormData();
    formData.append('image', fileObj.file);
    return formData;
  });
};

const onQueryStarted = async (
  arg: OnQueryStartedArgs,
  { queryFulfilled }: { queryFulfilled: Promise<{ data: unknown }> }
) => {
  const { onSuccess, onFailure } = arg;
  try {
    // Await the result of the query
    store.dispatch(setLoading(true));
    const { data } = await queryFulfilled;
    // Call onSuccess callback if provided
    if (onSuccess) {
      onSuccess(data);
    }
  } catch (error) {
    // Check if the error is an instance of ApiError
    if (error && (error as ApiError)) {
      const apiError = error as ApiError;
      // Call onFailure callback if provided
      if (onFailure) {
        onFailure(apiError?.error);
      }
    }
  } finally {
    store.dispatch(setLoading(false));
  }
};

export {
  onQueryStarted,
  checkOffline,
  removeEmptyValues,
  convertFilesToFormData,
  convertToLocale,
  copyToClipboard,
  checkValidFileExtension,
  getPaginationLimits,
  getStringValue,
  validateField,
  isErrors,
};
