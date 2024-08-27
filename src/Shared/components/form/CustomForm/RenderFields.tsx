/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { Ref, SyntheticEvent, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { INPUT_TYPES } from '../../../constants';
import ColorPicker from '../../ColorPicker';
import CheckBox from '../CheckBox';
import RichText from '../RIchText/RitchText';
import CustomSelect from '../Select';
import { CustomSwitch } from '../Switch/Switch';
import TextField, { ErrorComponent } from '../TextInput/TextInput';
import type { FormDataProps } from './types/Formtypes';

interface RenderFieldProps {
  field: FormDataProps;
  id: string;
  handleRegister: (id: string) => Ref<HTMLInputElement>;
  value: unknown;
  errors: FieldErrors<{
    [x: string]: unknown;
  }>;
  control: unknown;
  handleInputChange?: (id: string, value: unknown) => void;
}

function RenderField({
  field,
  id,
  handleRegister,
  handleInputChange = () => {},
  value,
  errors,
  control,
}: RenderFieldProps) {
  const maxLength =
    typeof field.schema === 'object' &&
    'maxLength' in field.schema &&
    field.schema.maxLength?.value;
  const minLength =
    typeof field.schema === 'object' &&
    'minLength' in field.schema &&
    field.schema.minLength?.value;
  const minDate =
    typeof field.schema === 'object' &&
    'minDate' in field.schema &&
    field.schema.minDate?.value;
  const [inputType, setInputType] = useState(field.type);
  const handleEyeClick = () => {
    setInputType((prev?: string) =>
      prev === INPUT_TYPES.PASSWORD ? INPUT_TYPES.TEXT : INPUT_TYPES.PASSWORD
    );
  };
  const renderInput = () => {
    const className = `${field?.className} form-control`;
    switch (field.type) {
      case INPUT_TYPES.TEXT:
      case INPUT_TYPES.EMAIL:
      case INPUT_TYPES.TEXT_AREA:
      case INPUT_TYPES.PASSWORD:
      case INPUT_TYPES.NUMBER:
      case INPUT_TYPES.PHONE:
      case INPUT_TYPES.DATE:
        return (
          <TextField
            id={id}
            type={inputType}
            readOnly={field.readOnly || false}
            placeholder={field.placeholder}
            accept={field.accept || ''}
            config={field.config}
            onChange={(e: SyntheticEvent) =>
              handleInputChange(id, (e.target as HTMLInputElement).value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (field?.blockInvalidChars) {
                field?.blockInvalidChars(e);
              }
            }}
            maxLength={maxLength || ''}
            minLength={minLength || ''}
            minDate={minDate || ''}
            control={control}
            className={className}
            {...handleRegister(id)}
            {...(field.min ? { min: field.min } : {})}
            {...(field.max ? { max: field.max } : {})}
          />
        );
      case INPUT_TYPES.FILE:
        return (
          <TextField
            id={id}
            type={inputType}
            placeholder={field.placeholder}
            accept={field.accept || ''}
            {...handleRegister(id)}
            onChange={(fileSelected: string) =>
              handleInputChange(id, fileSelected)
            }
            maxLength={maxLength || ''}
            minLength={minLength || ''}
            control={control}
            className={className}
            ratio={field?.ratio}
            imageFileType={field?.imageFileType}
            fetchImageDataConfig={field?.fetchImageDataConfig}
            singleImageSelectionEnabled={field?.singleImageSelectionEnabled}
            value={value}
          />
        );
      case INPUT_TYPES.SELECT:
        return (
          <Controller
            name={INPUT_TYPES.SELECT}
            control={control as Control}
            {...handleRegister(id)}
            render={({
              field: { onChange, onBlur, value: selectValue, name, ref },
            }) => {
              return (
                <CustomSelect
                  ref={ref}
                  name={name}
                  id={id}
                  placeholder={field.placeholder}
                  options={field.options}
                  {...handleRegister(id)}
                  onChange={(selectedValue: unknown) => {
                    onChange(selectedValue);
                    handleInputChange(id, selectedValue);
                  }}
                  onBlur={onBlur}
                  className={className}
                  isMulti={field?.isMulti}
                  value={selectValue}
                />
              );
            }}
          />
        );
      case INPUT_TYPES.RICH_TEXT:
        return (
          <RichText
            placeholder={field.placeholder}
            content={field.value as string}
            {...handleRegister(id)}
            onChange={(richTextValue) => handleInputChange(id, richTextValue)}
          />
        );
      //   case INPUT_TYPES.FILE_UPLOAD:
      //     return (
      //       <FileUpload
      //         id={id}
      //         placeholder={field.placeholder}
      //         accept={field.accept || IMAGE_FILE_TYPES}
      //         maxSize={field.maxSize}
      //         {...handleRegister(id)}
      //         value={value}
      //         onChange={(value) => handleInputChange(id, value)}
      //         control={control}
      //       />
      //     );
      case INPUT_TYPES.SWITCH:
        return (
          <Controller
            name={id}
            control={control as Control}
            render={({ field: ControllableField }) => {
              // Destructure the field state provided by React Hook Form
              const {
                onChange,
                value: checked,
                ...restField
              } = ControllableField;
              return (
                <CustomSwitch
                  {...restField} // Spread rest of the field props (like name, ref, etc.)
                  checked={checked} // Set the checked state
                  onChange={(e) => {
                    onChange((e.target as HTMLInputElement).checked); // Update the React Hook Form state
                    handleInputChange(
                      id,
                      (e.target as HTMLInputElement).checked
                    ); // Perform additional actions
                  }}
                />
              );
            }}
          />
        );
      case INPUT_TYPES.COLOR:
        return <ColorPicker id={id} control={control as Control} />;
      case INPUT_TYPES.CHECKBOX:
        return (
          <Controller
            name={id}
            control={control as Control}
            render={({ field: ControllableField }) => {
              // Destructure the field state provided by React Hook Form
              const {
                onChange,
                value: checked,
                ...restField
              } = ControllableField;
              return (
                <CheckBox
                  {...restField} // Spread rest of the field props (like name, ref, etc.)
                  value={checked as string | undefined} // Set the checked state
                  onChange={(inputValue: unknown) => {
                    onChange(inputValue); // Update the React Hook Form state
                    handleInputChange(id, inputValue); // Perform additional actions
                  }}
                  options={field?.checkOptions || []}
                />
              );
            }}
          />
        );
      // Add more cases for other input types here
      default:
        return null;
    }
  };

  return (
    <div className={`mb-2 modal-form-field ${field?.className || ''}`} key={id}>
      {field.label && (
        <label
          className={
            field?.labelClassName ||
            'relative inline-block min-w-[96px] mq450:text-base '
          }
          htmlFor={id}
        >
          {field.label}
        </label>
      )}
      {field.subLabel && (
        <p className={field?.subLabelClassName || 'text-secondary '}>
          {field.subLabel}
        </p>
      )}
      <div className={field.groupClassName || ''}>
        {renderInput()}
        {field.type === INPUT_TYPES.PASSWORD && (
          <img
            role="button"
            // src={
            //   inputType === INPUT_TYPES.PASSWORD ? ICONS.CloseEye : ICONS.Eye
            // }
            className="h-[30px] w-[30px] z-[1] px-4 cursor-pointer absolute top-[35%] right-0"
            onClick={handleEyeClick}
            onKeyDown={handleEyeClick}
            alt="eye"
          />
        )}
        <ErrorComponent error={errors[id]} render={field.render} />
        {field?.isShowInputCount ? (
          <span className="badge bg-outline-primary rounded-50 ms-auto">
            {field?.isShowInputCount ? (
              <span className="badge bg-outline-primary rounded-50 ms-auto">
                {(value as string)?.length}/
                {typeof field.schema === 'object' &&
                  'maxLength' in field.schema &&
                  field.schema.maxLength?.value}
              </span>
            ) : null}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default RenderField;
