type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
};

export const FormLabel = ({ children, className = "", ...rest }: FormLabelProps) => {
  return (
    <label
      {...rest}
      className={`${className} block mb-2 text-3xl font-medium text-gray-900 dark:text-white`}
    >
      {children}
    </label>
  );
};