import React, { Ref } from 'react';
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
    ...otherProps
  }: TextFieldProps,
  ref: Ref<HTMLInputElement>
) {
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
    case INPUT_TYPES.FILE:
      return (
        <Controller
          name="file"
          control={control}
          defaultValue={[]}
          {...otherProps}
          render={({ field: { onChange, onBlur, name, ref: fileRef } }) => {
            return (
              <FileInput
                className={className}
                name={name}
                accept={accept}
                ref={fileRef}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
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
