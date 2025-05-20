import { FormSelect } from "@components/Form/FormSelect";
import { useCharacterFilters } from "../hooks/useCharacterFilters";

export const CharactersFilters = () => {

  const { filters, filtersSelects, handleChangeFilter } = useCharacterFilters();

 return (
    <div>
      {filtersSelects.map((filter) => (
        <FormSelect
          key={filter.name}
          id={filter.name}
          className="w-xs"
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
    </div>
  );
};