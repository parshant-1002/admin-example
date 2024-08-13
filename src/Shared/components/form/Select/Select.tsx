/* eslint-disable react/jsx-props-no-spreading */
import React, { Ref } from 'react';
import Select, { SelectInstance, ActionMeta } from 'react-select';
import './ReactSelect.scss';

type CustomSelectProps = {
  isMulti?: boolean;
  className?: string;
  onChange?: (value: unknown, actionMeta: ActionMeta<unknown>) => void;
  [key: string]: unknown;
};

const CustomSelect = React.forwardRef(
  (
    { isMulti = false, onChange, ...otherProps }: CustomSelectProps,
    ref: Ref<SelectInstance<unknown>>
  ) => {
    return (
      <Select
        ref={ref}
        isMulti={isMulti}
        onChange={onChange}
        closeMenuOnSelect={!isMulti}
        {...otherProps}
      />
    );
  }
);

CustomSelect.displayName = 'CustomSelect'; // Add display name

export default CustomSelect;
