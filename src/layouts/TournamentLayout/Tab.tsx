import { useNavigate } from "react-router";

export const Tab = ({
  title,
  selected,
  className = "",
}: {
  title: string;
  selected: boolean,
  className?: string;
}) => {

  const navigate = useNavigate()

  const handleChangeTab = () => {
    navigate(`tournament/${title.toLowerCase()}`)
  }

  return (
    <span
      className={`
        ${className} 
        relative group text-lg cursor-pointer px-4 py-2
        transition-all duration-300
        rounded-md
        ${selected ? "text-amber-400" : "hover:text-gray-950"}
      `}
      onClick={handleChangeTab}
    >
      <span className="relative z-10">{title}</span>

      {/* Glow circular solo visible por debajo */}
      <span
        className="
          pointer-events-none
          absolute left-1/2 bottom-[-40%] -translate-x-1/2
          w-28 h-28
          rounded-full 
          bg-amber-500 
          opacity-0 
          group-hover:opacity-100 
          blur-2xl 
          transition-opacity duration-500
        "
      />
    </span>
  );
};
