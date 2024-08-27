import { ImageConfig } from '../../../../../Models/common';

export interface FormSchema {
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  minDate?: {
    value: string;
    message: string;
  };

  maxLength?: {
    value: number;
    message: string;
  };
  validate?: (value: string) => string | true;
}
export interface FormDataProps {
  type?: string;
  imageFileType?: string;
  ratio?: number[];
  readOnly?: boolean;
  placeholder?: string;
  accept?: string;
  min?: string | number;
  max?: string | number;
  groupClassName?: string;
  schema?: FormSchema | ((value: string) => FormSchema);
  options?: unknown[];
  value?: unknown;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  label?: string;
  render?: () => JSX.Element;
  isShowInputCount?: boolean;
  name?: string;
  addHorizontalLine?: boolean;
  addHorizontalTitle?: string;
  blockInvalidChars?: (
    e: React.KeyboardEvent<HTMLInputElement>,
    chars?: string[]
  ) => void;
  checkOptions?: {
    label: string;
    value: string;
  }[];
  isMulti?: boolean;
  config?: {
    type: string;
    min?: number;
  };
  fetchImageDataConfig?: ImageConfig[];
  singleImageSelectionEnabled?: boolean;
  subLabel?: string;
  subLabelClassName?: string;
}
