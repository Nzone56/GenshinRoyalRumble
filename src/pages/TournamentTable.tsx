import { useMemo} from "react";
import { LoadingLogo } from "@components/ui/LoadingLogo";
import { useTournament } from "@hooks/useTournament";
import { CharactersFilters } from "@modules/TournamentSetup/components/CharactersSlide/CharactersFilters";
import { TableColumnsToggle } from "@modules/TournamentTable/components/TableColumnsToggle";
import { TableHeader } from "@modules/TournamentTable/components/TableHeader";
import { TableRow } from "@modules/TournamentTable/components/TableRow";
import { useTable } from "@modules/TournamentTable/hooks/useTable";
import { useTableFilters } from "@modules/TournamentTable/hooks/useTableFilters";

// TODO: Add arrow icons to show the character flow changes on the table
export const TournamentTable = () => {
  const { characters } = useTournament();
  const { getStandings } = useTable();


  const charactersList = useMemo(() => {
    return getStandings().map((character) => ({
      ...character,
      name: characters[character.id]?.name ?? "",
      icon: characters[character.id]?.images?.icon ?? "",
      nation: characters[character.id]?.nation ?? "",
      weapon: characters[character.id]?.weapon ?? "",
      vision: characters[character.id]?.vision ?? "",
      rarity: characters[character.id]?.rarity ?? 0,
    }));
  }, [getStandings, characters]);

  const {
    filteredCharacters,
    visibleColumns,
    filters,
    handleChangeFilter,
    resetFilters,
    toggleColumn,
  } = useTableFilters({
    charactersList,
  });


  if (!filteredCharacters) return <LoadingLogo />;

  return (
    <div
      className={`w-full fade-in-up`}
    >
      <div className="flex flex-col items-center justify-center my-8">
        <CharactersFilters
          filters={filters}
          handleChangeFilter={handleChangeFilter}
          handleResetFilters={resetFilters}
        />
        <TableColumnsToggle visibleColumns={visibleColumns} toggleColumn={toggleColumn} />
      </div>
      <div className="bg-gray-800 p-8 overflow-auto rounded-lg">
        <table className="w-full text-white text-sm text-left">
          <thead>
            <TableHeader visibleColumns={visibleColumns} />
          </thead>
          <tbody>
            {filteredCharacters.map((character) => (
              <TableRow key={character.id} visibleColumns={visibleColumns} character={character} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
