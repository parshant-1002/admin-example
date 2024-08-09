import { HTMLProps, ReactNode } from 'react';

interface CustomCardWrapperProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

function CustomCardWrapper({
  children,
  className = '',
  ...rest
}: CustomCardWrapperProps) {
  return (
    <div className={`card ${className}`} {...rest}>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default CustomCardWrapper;
