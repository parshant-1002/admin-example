import React, { Ref } from 'react';
import { SelectOption } from '../../../../Models/common';

interface CheckBoxProps {
  label?: string;
  onChange?: (value: string[] | string) => void;
  value?: string | string[];
  options?: SelectOption[];
  isMulti?: boolean;
}

function CheckBox(
  {
    label = '',
    onChange = () => {},
    value = [],
    options = [],
    isMulti = false,
  }: CheckBoxProps,
  ref: Ref<HTMLInputElement>
) {
  // Function to handle the change event
  function handleChange(optionValue: string) {
    if (isMulti) {
      // For multiple selections
      const newValue = Array.isArray(value)
        ? value.includes(optionValue)
          ? value.filter((v) => v !== optionValue)
          : [...value, optionValue]
        : [optionValue];
      onChange(newValue);
    } else {
      // For single selection
      onChange(optionValue);
    }
  }

  return (
    <div className="customInput gameBetInput">
      <span className="text-white">{label}</span>
      <div className="d-flex">
        {options.map((option) => (
          <div key={option.value} className="form-check form-check-inline">
            <input
              ref={ref as Ref<HTMLInputElement>}
              className="form-check-input"
              type="checkbox"
              id={`checkbox-${option.value}`}
              value={option.value}
              checked={
                isMulti
                  ? Array.isArray(value) && value.includes(String(option.value))
                  : value === option.value
              }
              onChange={() => handleChange(String(option.value))}
            />
            <div className="checkbox-custom" />
            <label
              className="form-check-label"
              htmlFor={`checkbox-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.forwardRef(CheckBox);
