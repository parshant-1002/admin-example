/* eslint-disable no-nested-ternary */
import React, { Ref } from 'react';
import { SelectOption } from '../../../../Models/common';
import { SOCIAL_MEDIA_PLATFORMS_ICONS } from '../../../../Views/Auction/AuctionDetails/Helpers/constants';
import './style.scss';

interface CheckBoxProps {
  label?: string;
  onChange?: (
    value: string | number | undefined | (string | number | undefined)[]
  ) => void;
  value?: string | number | undefined | (string | number | undefined)[];
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
  function handleChange(optionValue: string | number | undefined) {
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
      <div className="row   align-items-center custom-checkbox mt-1">
        {options.map((option) => (
          <div
            key={option.value}
            className="form-check  d-flex align-items-center justify-content-between col-lg-2 col-md-3 col-sm-3"
          >
            {option.icon ? (
              <em className="social-Icon">
                <img
                  src={SOCIAL_MEDIA_PLATFORMS_ICONS[option.value as number]}
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
              ref={ref as Ref<HTMLInputElement>}
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
            <span
              className="label pointer ms-1 social-checkbox"
              onClick={() => handleChange(option.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.forwardRef(CheckBox);
