/// <reference types="vite-plugin-svgr/client" />
import { FormSelect } from "@components/form/FormSelect";
import FILTER from "@assets/images/icons/reset-filters.svg?react";
import type { FiltersType } from "@mytypes/Filters";
import { filtersSelects } from "@modules/TournamentSetup/hooks/useCharacterFilters";

type CharactersFiltersProps = {
  filters: FiltersType;
  handleChangeFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleResetFilters: () => void;
};

export const CharactersFilters = ({ filters, handleChangeFilter, handleResetFilters }: CharactersFiltersProps) => {
  return (
    <div className="flex items-stretch justify-center gap-4 p-4 flex-grow flex-wrap">
      {filtersSelects.map((filter) => (
        <FormSelect
          key={filter.name}
          id={filter.name}
          className="max-w-[185px]"
          name={filter.name}
          value={filters[filter.name]}
          onChange={handleChangeFilter}
        >
          <option value="">Select {filter.name}</option>
          {filter.variable.map((option) => (
            <option key={option.toString()} value={option.toString()}>
              {option}
            </option>
          ))}
        </FormSelect>
      ))}
      <div
        className="flex items-stretch px-2 bg-gray-700 rounded-md border border-gray-600 hover:border-blue-500 cursor-pointer transition-colors duration-300 min-h-[46px]"
        onClick={handleResetFilters}
      >
        <FILTER className="w-4 h-full fill-white" />
      </div>
    </div>
  );
};
