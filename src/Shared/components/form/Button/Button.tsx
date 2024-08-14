/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, ReactNode } from 'react';

// Define types for the button size and type
type ButtonSize = 'extraSmall' | 'small' | 'medium' | 'large' | undefined;
type ButtonType = 'primary' | 'secondary' | 'outline';

// Function to return button class based on size and type
export const returnButtonClass = (
  size: ButtonSize,
  btnType: ButtonType
): string => {
  let classname = '';
  switch (size) {
    case 'extraSmall':
      classname = 'btn-xs';
      break;
    case 'small':
      classname = 'btn-sm';
      break;
    case 'medium':
      classname = 'btn-md';
      break;
    case 'large':
      classname = 'btn-lg';
      break;
    default:
      classname = '';
  }
  switch (btnType) {
    case 'primary':
      return `${classname} btn-primary`;
    case 'secondary':
      return `${classname} btn-secondary`;
    case 'outline':
      return `${classname} btn-outline`;
    default:
      return `${classname} btn-primary`;
  }
};

// Define types for the Button component props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  size?: ButtonSize;
  btnType?: ButtonType;
  prepend?: ReactNode;
  append?: ReactNode;
}

function Button({
  onClick = () => {},
  children,
  type = 'button',
  size,
  btnType = 'primary',
  className = '',
  prepend,
  append,
  ...otherProps
}: ButtonProps) {
  const btnClass = returnButtonClass(size, btnType);
  return (
    <button
      className={`btn${btnClass} ${className}`}
      type={type}
      onClick={onClick}
      {...otherProps}
    >
      {prepend}
      {children}
      {append}
    </button>
  );
}

export default Button;
