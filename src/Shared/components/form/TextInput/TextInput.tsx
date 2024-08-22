import React, { Ref, useRef } from 'react';
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form';
import { INPUT_TYPES } from '../../../constants';
import FileInput from '../FileUpload/FileUpload';

export function ErrorComponent({
  error,
  render,
}: {
  error: FieldErrorsImpl<object> | undefined;
  render?: (error: FieldErrorsImpl<object> | undefined) => JSX.Element;
}) {
  if (render) {
    return render(error);
  }
  return (
    <span className="block error text-md mt-1">
      {(error as { message: string })?.message}
    </span>
  );
}

interface TextFieldProps {
  type: string;
  placeholder?: string;
  className?: string;
  control?: Control;
  accept?: string;
  value?: number | string | undefined;
  config?: object | undefined;
  minDate: string;
  [key: string]: unknown;
}

const TextField = React.forwardRef(function TextField(
  {
    type,
    placeholder,
    className = 'form-control',
    control,
    accept,
    value,
    minDate,
    config,
    ...otherProps
  }: TextFieldProps,
  ref: Ref<HTMLInputElement>
) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Programmatically open the date picker
    }
  };
  switch (type) {
    case INPUT_TYPES.TEXT_AREA:
      return (
        <textarea
          className={className}
          placeholder={placeholder}
          ref={ref as Ref<HTMLTextAreaElement>}
          {...otherProps}
        />
      );
    case INPUT_TYPES.TEXT:
      return (
        <input
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={className}
          value={value}
          {...otherProps}
        />
      );
    case INPUT_TYPES.DATE:
      return (
        <Controller
          name={otherProps.name as string}
          control={control}
          defaultValue={[]}
          {...otherProps}
          render={({ field: { ...rest } }) => {
            return (
              <input
                type="date"
                {...rest}
                min={minDate}
                className={className}
                ref={dateInputRef}
                onClick={handleInputClick}
              />
            );
          }}
        />
      );
    case INPUT_TYPES.FILE:
      return (
        <Controller
          name={otherProps.name as string}
          control={control}
          defaultValue={[]}
          {...otherProps}
          render={({
            field: { onChange, onBlur, name, ref: fileRef, value: fileValue },
          }) => {
            return (
              <FileInput
                className={className}
                name={name}
                accept={accept}
                ref={fileRef}
                onChange={onChange}
                onBlur={onBlur}
                value={fileValue}
                {...otherProps}
              />
            );
          }}
        />
      );
    default:
      return (
        <input
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={className}
          {...otherProps}
        />
      );
  }
});

export default TextField;
