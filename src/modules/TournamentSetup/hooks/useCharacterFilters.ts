// src/hooks/useCharacterFilters.ts
import { useEffect, useState } from "react";
import { genders, nations, rarities, visions, weapons } from "../variables/SetupVariables";
import type { FiltersSelect, FiltersType } from "@mytypes/Filters";
import type { PreviewCharacter } from "@mytypes/Character";
import { useTournamentStoreForm } from "@modules/TournamentSetup/hooks/useTournamentStoreForm";

export const filtersSelects: FiltersSelect[] = [
  { name: "gender", variable: genders },
  { name: "vision", variable: visions },
  { name: "nation", variable: nations },
  { name: "weapon", variable: weapons },
  { name: "rarity", variable: rarities },
];

const initialFilters: FiltersType = {
  gender: "",
  vision: "",
  nation: "",
  weapon: "",
  rarity: "",
};

export const useCharacterFilters = () => {
  const { charactersList } = useTournamentStoreForm();

  const [filters, setFilters] = useState<FiltersType>(initialFilters);
  const [filteredCharacters, setFilteredCharacters] = useState([...charactersList]);

  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  useEffect(() => {
    setFilteredCharacters(() => {
      return charactersList.filter((character) => {
        return Object.entries(filters).every(([key, value]) => {
          if (value === "") return true;
          if (key === "rarity") {
            return character[key] === Number(value);
          }
          return character[key as keyof PreviewCharacter] === value;
        });
      });
    });
  }, [filters, charactersList]);

  return {
    filters,
    filteredCharacters,
    filtersSelects,
    handleChangeFilter,
    handleResetFilters,
    setFilters,
  };
};
