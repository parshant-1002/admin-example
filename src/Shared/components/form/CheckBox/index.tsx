import React, { Ref } from 'react';

function CheckBox(
  {
    label = '',
    onChange = () => {},
    value,
    options = [],
  }: {
    label?: string;
    onChange?: (value: string) => void;
    value?: string;
    options?: { label: string; value: string }[];
  },
  ref: Ref<HTMLInputElement>
) {
  return (
    <div className="customInput gameBetInput">
      <span className="text-white">{label}</span>
      <div className="">
        {options.map((option) => (
          <div key={option.value} className="form-check form-check-inline">
            <input
              ref={ref as Ref<HTMLInputElement>}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <label
              className="form-check-label text-white"
              htmlFor="inlineCheckbox1"
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
