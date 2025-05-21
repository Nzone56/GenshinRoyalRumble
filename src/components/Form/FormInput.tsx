import React from "react";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const inputBaseClass =
  "block not-odd:p-2.5 border rounded-lg w-sm bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export const FormInput = ({ className = "", ...props }: FormInputProps) => {
  return <input {...props} className={`${inputBaseClass} ${className}`} />;
};
