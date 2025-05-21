import React from "react";

type FormCheckProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  sizeClass?: string;
};

const checkboxBaseClass = "rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600";

export const FormCheck = ({ className = "", sizeClass = "", ...props }: FormCheckProps) => {
  return (
    <input
      type="checkbox"
      {...props}
      className={`${sizeClass} ${className} ${checkboxBaseClass}`}
    />
  );
};