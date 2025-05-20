// src/hooks/useCharacterFilters.ts
import { useState } from "react";
import { genders, nations, rarities, visions, weapons } from "../variables/SetupVariables";

export interface FiltersType {
  gender: string;
  vision: string;
  nation: string;
  weapon: string;
  rarity: string;
}

export interface FiltersSelect {
  name: keyof FiltersType;
  variable: string[] | number[];
}

export const filtersSelects: FiltersSelect[] = [
  { name: "gender", variable: genders },
  { name: "vision", variable: visions },
  { name: "nation", variable: nations },
  { name: "weapon", variable: weapons },
  { name: "rarity", variable: rarities },
];

export const useCharacterFilters = () => {
  const [filters, setFilters] = useState<FiltersType>({
    gender: "",
    vision: "",
    nation: "",
    weapon: "",
    rarity: "",
  });

  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    filters,
    filtersSelects,
    handleChangeFilter,
    setFilters,
  };
};
