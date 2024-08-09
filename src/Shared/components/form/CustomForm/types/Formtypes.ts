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
  maxLength?: {
    value: number;
    message: string;
  };
  validate?: (value: string) => string | true;
}
export interface FormDataProps {
  type: string;
  readOnly?: boolean;
  placeholder: string;
  accept?: string;
  max?: string | number;
  groupClassName?: string;
  schema?: FormSchema | ((value: string) => FormSchema);
  options?: unknown[];
  value?: unknown;
  className: string;
  containerClassName?: string;
  labelClassName?: string;
  label: string;
  render?: () => JSX.Element;
  isShowInputCount?: boolean;
  name?: string;
  addHorizontalLine?: boolean;
  addHorizontalTitle?: string;
  checkOptions?: {
    label: string;
    value: string;
  }[];
  isMulti?: boolean;
}
