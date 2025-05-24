import React from "react";

type FormSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  width?: string;
  padding?: string;
  children?: React.ReactNode;
};

const selectBaseClass =
  "form-select block  border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export const FormSelect = ({ className = "", width = "", padding = "", children, ...props }: FormSelectProps) => {
  return (
    <select
      {...props}
      className={`${className} ${selectBaseClass} ${width ? width : "w-sm"} ${padding ? padding : "p-2.5"}`}
    >
      {children}
    </select>
  );
};
