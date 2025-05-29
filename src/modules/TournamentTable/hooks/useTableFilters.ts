import type { FiltersType } from "@mytypes/Filters";
import type { CharacterTable } from "@mytypes/Tournament";
import { useEffect, useState } from "react";

export type TableColumn =
  | "nation"
  | "vision"
  | "weapon"
  | "icon"
  | "name"
  | "battles"
  | "wins"
  | "draws"
  | "losses"
  | "pointsF"
  | "pointsA"
  | "diffP"
  | "points";

const initialFilters: FiltersType = {
  gender: "",
  vision: "",
  nation: "",
  weapon: "",
  rarity: "",
};

const initialColumns: Record<TableColumn, boolean> = {
  icon: true,
  name: true,
  nation: true,
  vision: true,
  weapon: true,

  battles: true,
  wins: true,
  draws: true,
  losses: true,
  pointsF: true,
  pointsA: true,
  diffP: true,
  points: true,
};

export const useTableFilters = ({ charactersList }: { charactersList: CharacterTable[] }) => {
  const [visibleColumns, setVisibleColumns] = useState<Record<TableColumn, boolean>>(initialColumns);
  const [filteredCharacters, setFilteredCharacters] = useState([...charactersList]);
  const [filters, setFilters] = useState<FiltersType>(initialFilters);
  const [tableColors, setTableColors] = useState(true);

  const toggleColumn = (col: TableColumn) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFilteredCharacters(() => {
      return charactersList?.filter((character) => {
        return Object.entries(filters).every(([key, value]) => {
          if (value === "") return true;
          if (key === "rarity") {
            return character[key] === Number(value);
          }
          return character[key as keyof CharacterTable] === value;
        });
      });
    });
  }, [filters, charactersList]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const resetColumns = () => {
    setVisibleColumns(initialColumns);
  };

  return {
    filteredCharacters,
    filters,
    setFilters,
    visibleColumns,
    handleChangeFilter,
    toggleColumn,
    resetFilters,
    resetColumns,
    tableColors,
    setTableColors,
  };
};
