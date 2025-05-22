type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  isSelected: boolean;
};

export const Card = ({ children, isSelected, className = "", ...rest }: CardProps) => {
  return (
    <div
      className={`${isSelected ? "border-blue-500" : "border-transparent hover:border-[#98b6e1]"} relative bg-gray-700 w-[225px] p-3 rounded cursor-pointer border-2 transition-colors duration-300 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
