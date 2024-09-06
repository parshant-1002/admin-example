import { Fragment, Ref, SyntheticEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button';
import type { FormDataProps, FormSchema } from './types/Formtypes';
// import { ALIGNMENT } from '../../../../Shared/Constants';
import RenderField from './RenderFields';
import { INPUT_TYPES, blockInvalidChar } from '../../../constants';
import FORM_VALIDATION_MESSAGES from '../../../constants/validationMessages';

function AddHorizontalTitle({
  isLine,
  title,
}: {
  isLine: boolean | undefined;
  title: string | undefined;
}) {
  if (isLine && !title) {
    return <hr className="mt-4 hr_line" />;
  }
  if (isLine && title) {
    return (
      <div className="col-12">
        <div className="text-center hr_line title-line">
          <h2 className="h4 mb-0">{title}</h2>
          <hr className="hr_line" />
        </div>
      </div>
    );
  }
  if (title) {
    return <h2 className="h2 mt-2 hr_title">{title}</h2>;
  }
  return null;
}

interface CustomFormProps {
  submitText?: string;
  preSubmitElement?: JSX.Element;
  onSubmit?: (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    reset: () => void
  ) => void;
  id: string;
  defaultValues?: Record<string, unknown>;
  formData?: Record<string, FormDataProps>;
  handleStateDataChange?: (prop: {
    name: string;
    value: unknown;
    type: string;
    setValue: (name: string, value: unknown) => void;
    values?: Record<string, unknown>;
  }) => void;
  secondaryBtnText?: string;
  handleSecondaryButtonClick?: () => void;
  secondaryButtonType?: 'submit' | 'button';
  className?: string;
  isShowSubmit?: boolean;
  isShowSecondaryBtn?: boolean;
  submitBtnClassName?: string;
  alignFormActionBtns?: string;
  secondaryBtnClassName?: string;
  postSubmitElement?: JSX.Element;
}

function CustomForm({
  submitText = 'Submit',
  preSubmitElement,
  onSubmit = () => {},
  id = 'hook-form',
  defaultValues = {},
  formData = {},
  handleStateDataChange = () => {},
  secondaryBtnText = '',
  handleSecondaryButtonClick,
  secondaryButtonType = 'button',
  className = '',
  isShowSubmit = true,
  isShowSecondaryBtn = false,
  submitBtnClassName = 'btn-md',
  alignFormActionBtns = 'center',
  secondaryBtnClassName = 'btn-md text-captialize w-100',
  postSubmitElement,
}: CustomFormProps) {
  const [isResetForm, setIsResetForm] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setError,
    control,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: { ...defaultValues } });
  const handleInputChange = (name: string, value: unknown) => {
    setValue(name, value);
    // onChangeValues(name, value);
  };

  useEffect(() => {
    if (Object.keys(defaultValues).length && isResetForm) {
      reset({ ...defaultValues });
    }
  }, [defaultValues, isResetForm, reset]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (errors[String(name)] && value[String(name)]) {
        setError(String(name), {});
      }

      if (name && type) {
        handleStateDataChange({
          name,
          value: value[name],
          type,
          setValue,
          values: value,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [errors, handleStateDataChange, setError, setValue, watch, formData]);

  const handleRegister = (key: string) => {
    if (typeof formData[key].schema === 'function') {
      const schemaFunction = formData[key].schema as (
        password: string
      ) => FormSchema;
      const schema = schemaFunction(watch('password') as string);

      return register(key, schema as unknown as FormDataProps);
    }
    if (
      [INPUT_TYPES.TEXT, INPUT_TYPES.TEXT_AREA]?.includes(
        `${formData?.[key]?.type}`
      )
    ) {
      const schema = {
        ...(formData[key].schema || {}),
        validate: (value: string) =>
          value.trim() !== '' ||
          FORM_VALIDATION_MESSAGES(`${formData?.[key].label}`).REQUIRED,
      };
      return register(key, schema as unknown as FormDataProps);
    }
    if (formData[key]?.type === INPUT_TYPES.NUMBER) {
      const schema = {
        ...(formData[key].schema || {}),
        blockInvalidChars: blockInvalidChar,
      };
      return register(key, schema as unknown as FormDataProps);
    }
    return register(key, formData[key].schema as unknown as FormDataProps);
  };
  const getAlignmentForFormActionBtn = () => {
    switch (alignFormActionBtns) {
      case 'left':
        return 'd-flex btn_groups gap-2 mt-4 mb-3 justify-content-start items-center';
      case 'right':
        return 'd-flex btn_groups gap-2 mt-4 mb-3 justify-content-end items-center';
      default:
        return 'd-flex btn_groups gap-2 mt-4 mb-3 justify-content-center items-center';
    }
  };

  const handleSubmitClick = (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    resetFn: () => void
  ) => {
    event.preventDefault();
    onSubmit(data, event, resetFn);
    setIsResetForm(false);
  };
  return (
    <form
      id={id}
      className={className}
      // onSubmit={handleSubmit(onSubmit)}
    >
      {Object.keys(formData).map((key) => {
        let field = { ...formData[key] };
        if (formData[key].type === INPUT_TYPES.NUMBER) {
          field = { ...formData[key], blockInvalidChars: blockInvalidChar };
        }
        return (
          <Fragment key={key}>
            <AddHorizontalTitle
              isLine={formData[key]?.addHorizontalLine}
              title={formData[key]?.addHorizontalTitle}
            />
            <RenderField
              id={key}
              field={field}
              handleRegister={
                handleRegister as unknown as () => Ref<HTMLInputElement>
              }
              handleInputChange={handleInputChange}
              value={getValues()?.[key]}
              errors={errors}
              control={control}
            />
          </Fragment>
        );
      })}
      {preSubmitElement}
      <div className={getAlignmentForFormActionBtn()}>
        {isShowSecondaryBtn && (
          <Button
            btnType="secondary"
            size="large"
            data-content={secondaryBtnText}
            type={secondaryButtonType}
            onClick={
              secondaryButtonType === 'submit'
                ? handleSubmit(
                    handleSecondaryButtonClick as SubmitHandler<{
                      [x: string]: unknown;
                    }>
                  )
                : handleSecondaryButtonClick
            }
            className={secondaryBtnClassName}
          >
            {secondaryBtnText}
          </Button>
        )}
        {isShowSubmit ? (
          <Button
            btnType="primary"
            size="large"
            onClick={handleSubmit((data, event) =>
              handleSubmitClick(data, event as SyntheticEvent, reset)
            )}
            type="submit"
            className={submitBtnClassName}
          >
            {submitText}
          </Button>
        ) : null}
      </div>
      {postSubmitElement}
    </form>
  );
}

export default CustomForm;
