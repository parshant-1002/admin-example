/* eslint-disable react/jsx-no-useless-fragment */
interface FieldSetWrapperProps {
  title?: string;
  children: React.ReactNode;
}
function FieldSetWrapper({ title, children }: FieldSetWrapperProps) {
  if (title) {
    return (
      <fieldset className="border p-2">
        <legend className="float-none w-auto p-2 text-primary text-capitalize">
          {title}
        </legend>
        {children}
      </fieldset>
    );
  }
  return <>{children}</>;
}

export default FieldSetWrapper;
