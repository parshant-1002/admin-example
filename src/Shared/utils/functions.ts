/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { toast } from 'react-toastify';

// Function to check if the browser is offline
export const checkOffline = (): boolean => {
  return !window.navigator.onLine;
};

// Function to remove empty values from an object
export function removeEmptyValues<T extends Record<string, unknown>>(
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
export const getPaginationLimits = (): number => {
  const width = window.innerWidth;
  return width > 600 ? 1 : 0;
};

// Function to get a string value or return an empty string
export const getStringValue = (value: unknown): string => {
  if (typeof value === 'string' && value.length) {
    return value;
  }
  return '';
};

// Function to validate fields and return errors
export const validateField = (
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
export const isErrors = (
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
export const copyToClipboard = async (
  value?: string | number | undefined
): Promise<void> => {
  try {
    if (!value) return;
    await navigator.clipboard.writeText(`${value}`);
    toast.success('Copied to clipboard');
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
  }
};

export const checkValidFileExtension = (
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

export const convertToLocale = (number: number | string): string => {
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

export const convertFilesToFormData = (files: FileWithSrc[]): FormData[] => {
  return files.map((fileObj) => {
    const formData = new FormData();
    formData.append('image', fileObj.file);
    return formData;
  });
};
