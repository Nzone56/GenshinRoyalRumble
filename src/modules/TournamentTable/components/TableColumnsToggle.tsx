import { useState, useRef, useEffect } from "react";
import type { TableColumn } from "@modules/TournamentTable/hooks/useTableFilters";
import { columns } from "../helpers/TableVariables";

type ColumnsToggleDropdownProps = {
  visibleColumns: Record<TableColumn, boolean>;
  toggleColumn: (col: TableColumn) => void;
};

export const TableColumnsToggle = ({ visibleColumns, toggleColumn }: ColumnsToggleDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center w-[185px] p-2.5 rounded-lg border border-gray-600 shadow-sm px-4 py-2 bg-gray-700  text-lg edium text-white hover:bg-gray-600 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Columns
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1 max-h-48 overflow-auto">
            {columns.map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center px-4 py-2 text-sm text-white cursor-pointer hover:bg-gray-700 select-none"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns[key]}
                  onChange={() => toggleColumn(key)}
                  className="mr-2"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
