import moment from 'moment';
import { toast } from 'react-toastify';
import { ApiError } from '../../Models/Apis/Error';
import { AddContentFormItem, OnQueryStartedArgs } from '../../Models/common';
import { store } from '../../Store';
import { updateDeviceTokenRedux } from '../../Store/Common';
import TruncateText from '../components/TruncateText';
import { FileData } from '../components/form/FileUpload/helpers/modal';
import { API, DATE_FORMATS } from '../constants/constants';
import ERROR_MESSAGES from '../constants/messages';
import HTML_REGEX from '../constants/regex';
import { FORM_VALIDATION_MESSAGES } from '../constants/validationMessages';

// Function to check if the browser is offline
const checkOffline = (): boolean => {
  return !window.navigator.onLine;
};

// Function to remove empty values from an object
function removeEmptyValues<T extends Record<string, unknown>>(
  obj: T = {} as T
): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const cleanedObject: Record<string, unknown> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    // Recursively clean nested objects
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const cleanedValue = removeEmptyValues(value as Record<string, unknown>);
      if (Object.keys(cleanedValue).length > 0) {
        cleanedObject[key] = cleanedValue;
      }
    } else if (value !== null && value !== undefined && value !== '') {
      cleanedObject[key] = value;
    }
  });

  return cleanedObject as T;
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
  fields: AddContentFormItem,
  label: { title?: string; content?: string }
): Record<string, string> => {
  const errorsObject: Record<string, string> = {};
  Object.entries(label).forEach(([key, value]: [string, string]) => {
    if (!fields[key]) {
      errorsObject[key] = FORM_VALIDATION_MESSAGES(value).REQUIRED;
    }
  });
  return errorsObject;
};

// Function to check for errors in a roadmap and update the roadmap with errors
const isErrors = (
  subFromContent: AddContentFormItem[],
  setSubFormContent: React.Dispatch<React.SetStateAction<AddContentFormItem[]>>,
  labels: { title?: string; content?: string }
): boolean => {
  let errors = false;
  subFromContent?.forEach((item, index) => {
    const currentErrors = validateField(item, labels);
    if (Object.keys(currentErrors).length) {
      errors = true;
      // Update the roadmap with the errors
      const updatedRoadMap = subFromContent?.map((items, i) =>
        i === index ? { ...items, errors: currentErrors } : items
      );
      setSubFormContent(updatedRoadMap);
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
      toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
    }
  }
};

const validExtensions = (accept: string) =>
  accept
    .replace(/image\//g, '.')
    .replace(/video\//g, '.')
    .replace(/document\//g, '.')
    .split(',')
    .map((type: string) => type.trim());

const checkValidFileExtension = (
  fileUrl: string | undefined,
  accept: string
): boolean => {
  const validatedExtensions = validExtensions(accept);
  const fileExtension = `.${fileUrl?.split('.').pop()?.toLowerCase() || ''}`;
  return validatedExtensions.includes(fileExtension);
};

const convertToLocale = (
  number?: number | string,
  isCurrency?: boolean
): string => {
  const num = Number(number);
  if (Number.isNaN(num)) {
    return '0';
  }
  const formattedNumber = num
    .toLocaleString('sv-SE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
    .replace(',', '.');
  return isCurrency ? `${formattedNumber} SEK` : formattedNumber;
};

const convertFilesToFormData = (files: FileData[], key: string): FormData[] => {
  return (files || [])?.map((fileObj) => {
    const formData = new FormData();
    formData.append(key, fileObj.file);
    return formData;
  });
};

const addBaseUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url; // Return unchanged if URL is already complete
  }
  return API.BASE_URL + url; // Add base URL if URL is not complete
};

const onQueryStarted = async (
  arg: OnQueryStartedArgs,
  { queryFulfilled }: { queryFulfilled: Promise<{ data: unknown }> }
) => {
  const { onSuccess, onFailure } = arg;
  try {
    const { data } = await queryFulfilled;
    if (onSuccess) {
      onSuccess(data);
    }
  } catch (error) {
    if (error && (error as ApiError)) {
      const apiError = error as ApiError;
      if (onFailure) {
        onFailure(apiError?.error);
      }
    }
  }
};

function capitalizeFirstLetter(str: string): string {
  if (!str) return str; // Return the original string if it is empty

  return str.charAt(0).toUpperCase() + str.slice(1);
}

function daysBetweenDates(date1: Date, date2: Date): number {
  // Convert both dates to milliseconds
  const dateOneMs: number = date1.getTime();
  const dateTwoMs: number = date2.getTime();

  // Calculate the difference in milliseconds
  const diffMs: number = Math.abs(dateTwoMs - dateOneMs);

  // Convert milliseconds to days
  const daysDifference: number = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return daysDifference;
}
function formatDate(
  date: Date | string,
  format = DATE_FORMATS.DISPLAY_DATE_WITH_TIME
): string {
  if (!date) return '';
  return moment(date).format(format);
}

type NestedObject = Record<string, unknown>;

function getValueFromPath(
  obj: NestedObject,
  path: string[]
): string | number | boolean | undefined {
  // Ensure the path is an array of strings
  if (
    !Array.isArray(path) ||
    path.some((segment) => typeof segment !== 'string')
  ) {
    return undefined;
  }

  // Use reduce to traverse the object based on the path array
  const result = path.reduce<unknown>((current, segment) => {
    if (current && typeof current === 'object' && segment in current) {
      return (current as { [key: string]: unknown })[segment];
    }
    // Return undefined if the path is invalid
    return undefined;
  }, obj);

  // Check if the final value is a primitive type
  if (
    typeof result === 'string' ||
    typeof result === 'number' ||
    typeof result === 'boolean'
  ) {
    return result;
  }

  // Return undefined if the final value is not a primitive type
  return undefined;
}

const renderIdWithHash = (
  _: Record<string, unknown> | unknown,
  val: string | number
) => (val ? <TruncateText text={val} /> : '-.-');

const setNotificationDeviceToken = (token: string) => {
  const { dispatch = () => {} } = store;
  dispatch(updateDeviceTokenRedux(token));
};

function containsHTML(text: string) {
  const htmlRegex = HTML_REGEX;
  return htmlRegex.test(text);
}

function htmlToText(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export {
  addBaseUrl,
  capitalizeFirstLetter,
  checkOffline,
  checkValidFileExtension,
  containsHTML,
  convertFilesToFormData,
  convertToLocale,
  copyToClipboard,
  daysBetweenDates,
  formatDate,
  getPaginationLimits,
  getStringValue,
  getValueFromPath,
  htmlToText,
  isErrors,
  validExtensions,
  onQueryStarted,
  removeEmptyValues,
  renderIdWithHash,
  setNotificationDeviceToken,
  validateField,
};
