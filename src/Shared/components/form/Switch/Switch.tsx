/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Control, FieldValues } from 'react-hook-form';
import './styles.scss'; // You can define your styles in this CSS file

type SwitchProps = {
  onChange: (newState: boolean) => void;
  checked: boolean;
};

function Switch({ onChange, checked }: Readonly<SwitchProps>) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange(newState);
  };

  return (
    <button type="button" className="switch-container" onClick={handleToggle}>
      <div className={`switch ${isChecked ? 'checked' : ''}`}>
        <div className="switch-toggle" />
      </div>
    </button>
  );
}

// Define the props for CustomSwitch
type CustomSwitchProps = {
  className?: string;
  control?: Control<FieldValues>; // Use Control from react-hook-form
} & React.InputHTMLAttributes<HTMLInputElement>; // Allow other input attributes

// eslint-disable-next-line react/display-name
export const CustomSwitch = React.forwardRef<
  HTMLInputElement,
  CustomSwitchProps
>(({ className = 'form-control', control, ...otherProps }, ref) => {
  return (
    <label className="switch">
      <input type="checkbox" className={className} ref={ref} {...otherProps} />
      <span className="slider round" />
    </label>
  );
});

export default Switch;
