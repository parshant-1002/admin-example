/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-continue */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import moment from 'moment';
import { toast } from 'react-toastify';
import { ApiError, ErrorResponse } from '../../Models/Apis/Error';
import { CustomRouter } from '../../Routes/RootRoutes';
import { AddContentFormItem } from '../../Models/common';
import { FileData } from '../components/form/FileUpload/helpers/modal';
import TruncateText from '../components/TruncateText';
import { API, DATE_FORMATS } from '../constants';
import FORM_VALIDATION_MESSAGES from '../constants/validationMessages';
import ERROR_MESSAGES from '../constants/messages';
import { store } from '../../Store';
import { updateDeviceTokenRedux } from '../../Store/Common';

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

const checkValidFileExtension = (
  fileUrl: string | undefined,
  accept: string
): boolean => {
  const validExtensions = accept
    .replace(/image\//g, '.')
    .replace(/video\//g, '.')
    .split(',')
    .map((type: string) => type.trim());
  const fileExtension = `.${fileUrl?.split('.').pop()?.toLowerCase() || ''}`;
  return validExtensions.includes(fileExtension);
};

const convertToLocale = (
  number: number | string,
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
  if (!url) return;
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
    // Await the result of the query
    // store.dispatch(setLoading(true));
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
  }
};

function capitalizeFirstLetter(str: string): string {
  if (!str) return str; // Return the original string if it is empty

  return str.charAt(0).toUpperCase() + str.slice(1);
}

function matchRoute(pathname: string, routes: Array<CustomRouter>) {
  for (const route of routes) {
    if (!route?.path) continue; // Skip if route or route.path is undefined

    try {
      // Escape only necessary special characters in route.path
      const safePath = route.path.replace(/[-^$*+?.()|[\]{}]/g, '\\$&');

      // Replace route parameters with a regex pattern that matches any non-slash characters
      const regex = new RegExp(`^${safePath.replace(/:\w+/g, '[^/]+')}$`);

      if (regex.test(pathname)) {
        return route.title;
      }
    } catch (error) {
      continue; // Skip to the next route if there is an error with regex creation
    }
  }
  return null;
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

type NestedObject = { [key: string]: unknown };

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

  // Start with the root object
  let current: unknown = obj;

  // Traverse the object based on the path array
  for (const segment of path) {
    if (current && typeof current === 'object' && segment in current) {
      current = (current as { [key: string]: unknown })[segment];
    } else {
      // Return undefined if the path is invalid
      return undefined;
    }
  }

  // Check if the final value is a primitive type
  if (
    typeof current === 'string' ||
    typeof current === 'number' ||
    typeof current === 'boolean'
  ) {
    return current;
  }

  // Return undefined if the final value is not a primitive type
  return undefined;
}

const renderIdWithHash = (
  _: Record<string, unknown> | unknown,
  val: string | number
) => (val ? <TruncateText text={val} /> : '-.-');

function hashCode(str: string) {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return hash;
}

function getBrowserName() {
  const { userAgent } = navigator;
  let browserName = 'Unknown';

  if (userAgent.indexOf('Chrome') !== -1) {
    browserName = 'Chrome';
  } else if (userAgent.indexOf('Firefox') !== -1) {
    browserName = 'Firefox';
  } else if (userAgent.indexOf('Safari') !== -1) {
    browserName = 'Safari';
  } else if (userAgent.indexOf('Edge') !== -1) {
    browserName = 'Edge';
  } else if (
    userAgent.indexOf('Opera') !== -1 ||
    userAgent.indexOf('OPR') !== -1
  ) {
    browserName = 'Opera';
  } else if (userAgent.indexOf('Trident') !== -1) {
    browserName = 'Internet Explorer';
  }

  return browserName;
}
export function getDeviceIdAndBrowserName() {
  // Attempt to retrieve the device ID from local storage
  let deviceId = localStorage.getItem('deviceId');

  // If device ID doesn't exist, generate a new one
  if (!deviceId) {
    // Generate a semi-unique identifier based on userAgent and platform
    deviceId = String(hashCode(navigator.userAgent + navigator.platform));

    // Store the generated device ID in local storage
    localStorage.setItem('deviceId', deviceId);
  }

  // Get the browser name
  const browserName = getBrowserName();

  return { deviceId, browserName };
}
export const setNotificationDeviceToken = (token: string) => {
  const { dispatch = () => {} } = store;
  dispatch(updateDeviceTokenRedux(token));
};

export const updateNotificationToken = ({
  deviceToken = '',
  userToken = '',
  token = '',
}: {
  deviceToken: string | null;
  userToken: string | null;
  token: string | null;
}) => {
  // const { deviceId, browserName } = getDeviceIdAndBrowserName();
  if (userToken && token && deviceToken !== token) {
    // const { dispatch = () => {} } = store;
    // dispatch(
    //   updateFirebaseToken(
    //     {
    //       registrationToken: token,
    //       deviceId,
    //       browserName,
    //     },
    //     (res) => {
    //       if (!res) {
    //         console.log('error in updating firebase/notification token');
    //       }
    //     }
    //   )
    // );
  }
};
export {
  addBaseUrl,
  capitalizeFirstLetter,
  checkOffline,
  checkValidFileExtension,
  convertFilesToFormData,
  convertToLocale,
  copyToClipboard,
  daysBetweenDates,
  formatDate,
  getPaginationLimits,
  getStringValue,
  getValueFromPath,
  isErrors,
  matchRoute,
  onQueryStarted,
  removeEmptyValues,
  renderIdWithHash,
  validateField,
};
