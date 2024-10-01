/* eslint-disable no-nested-ternary */
import React, { Ref } from 'react';
import { SelectOption } from '../../../../Models/common';
import './style.scss';

type CheckBoxType = string | number | (string | number | undefined)[];
interface CheckBoxProps {
  label?: string;
  onChange?: (value?: CheckBoxType) => void;
  value?: CheckBoxType;
  options?: SelectOption[];
  isMulti?: boolean;
  images?: string[];
}

function CheckBox(
  {
    label = '',
    onChange = () => {},
    value = [],
    options = [],
    isMulti = false,
    images,
  }: CheckBoxProps,
  ref: Ref<HTMLInputElement>
) {
  function updateValue(prevValue: CheckBoxType, optionValue?: string | number) {
    let newValue;

    if (Array.isArray(prevValue)) {
      if (prevValue.includes(optionValue)) {
        newValue = prevValue.filter((v) => v !== optionValue);
      } else {
        newValue = [...prevValue, optionValue];
      }
    } else {
      newValue = [optionValue];
    }

    return newValue;
  }

  // Function to handle the change event
  function handleChange(optionValue: string | number | undefined) {
    if (isMulti) {
      // For multiple selections
      const newValue = updateValue(value, optionValue);
      onChange(newValue);
    } else {
      // For single selection
      onChange(optionValue);
    }
  }

  return (
    <div className="customInput gameBetInput">
      <span className="text-white">{label}</span>
      <div className="row   align-items-center custom-checkbox mt-1">
        {options.map((option) => (
          <div
            key={option.value}
            className="form-check  d-flex align-items-center justify-content-between col-lg-2 col-md-3 col-sm-3"
          >
            {option.icon ? (
              <em className="social-Icon">
                <img
                  src={images?.[option.value as number]}
                  alt="Icon"
                  width="70"
                />
              </em>
            ) : (
              <label
                className="form-check-label"
                htmlFor={`checkbox-${option.value}`}
              >
                {option.label}
              </label>
            )}
            <input
              ref={ref}
              className="custom-input"
              type="checkbox"
              id={`checkbox-${option.value}`}
              value={option.value}
              checked={
                isMulti
                  ? Array.isArray(value) && value.includes(option.value)
                  : value === option.value
              }
            />
            <button
              type="button"
              className="label pointer ms-1 social-checkbox btn btn-transparent"
              onClick={() => handleChange(option.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.forwardRef(CheckBox);
