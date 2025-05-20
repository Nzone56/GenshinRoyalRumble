import React from "react";

type FormSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  children?: React.ReactNode;
};

export const FormSelect = ({ className = "", children, ...props }: FormSelectProps) => {
  return (
    <select
      {...props}
      className={`
        form-select block w-sm p-2.5 border rounded-lg 
        bg-gray-50 
        border-gray-300 
        text-gray-900 
        focus:outline-none 
        focus:ring-blue-500 
        focus:border-blue-500 
        dark:bg-gray-700 
        dark:border-gray-600 
        dark:placeholder-gray-400 
        dark:text-white 
        dark:focus:ring-blue-500 
        dark:focus:border-blue-500;
        ${className}`}
    >
      {children}
    </select>
  );
};
