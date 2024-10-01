import { HTMLProps, ReactNode } from 'react';
import Breadcrumbs from '../layouts/components/breadcrumb/Breadcrumb';

interface CustomCardWrapperProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  showBreadCrumbs?: boolean;
}

function CustomCardWrapper({
  children,
  className = '',
  showBreadCrumbs = true,
  ...rest
}: Readonly<CustomCardWrapperProps>) {
  return (
    <>
      {showBreadCrumbs ? <Breadcrumbs /> : null}
      <div className={`card ${className}`} {...rest}>
        <div className="card-body">{children}</div>
      </div>
    </>
  );
}

export default CustomCardWrapper;
