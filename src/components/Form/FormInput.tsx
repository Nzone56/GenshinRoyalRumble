import React from "react";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  sizeClass?: string; 
};

const inputBaseClass = "block p-2.5 border rounded-lg bg-gray-500 border-gray-300 text-gray-900 focus:ring-blue-500 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export const FormInput = ({ className = "", sizeClass = "w-sm",  ...props }: FormInputProps) => {
  return <input {...props} className={`${sizeClass} ${className} ${inputBaseClass}`} />;
};
