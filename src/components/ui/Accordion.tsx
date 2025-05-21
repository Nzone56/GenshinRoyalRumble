import React, { useState } from "react";

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  summary: string;
  className?: string;
  children?: React.ReactNode;
};

const selectBaseClass = "w-full max-w-6xl mb-4 bg-slate-800 rounded-xl shadow-md overflow-hidden";

export const Accordion = ({ summary, className = "", children, ...props }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div {...props} className={`${selectBaseClass} ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-white bg-slate-700 hover:bg-slate-600 transition-all cursor-pointer"
      >
        <span>{summary}</span>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden flex ${
          isOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
