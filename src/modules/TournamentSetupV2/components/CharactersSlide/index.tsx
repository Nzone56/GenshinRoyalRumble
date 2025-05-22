import { memo } from "react";
import { Accordion } from "@components/ui/Accordion";
import { CharactersFilters } from "./CharactersFilters";
import { useCharacterFilters } from "@modules/TournamentSetup/hooks/useCharacterFilters";
import { useTournamentStoreForm } from "../../hooks/useTournamentStoreForm";
import { CharacterGroupCard } from "./CharacterGroupCard";
import { CharacterCard } from "./CharacterCard";

export const CharactersSlide = memo(() => {
  const { filters, filtersSelects, filteredCharacters, handleChangeFilter, handleResetFilters } = useCharacterFilters();
  const { characters, handleAddGroupCard, handleAddCharacter } = useTournamentStoreForm();

  return (
    <div className="flex flex-col items-center mb-5">
      <h3 className="mb-2 text-3xl">Characters</h3>
      <Accordion id="tournament_characters" className="" summary="List of Characters">
        {/* //TODO: Fix flexbox to be start but centered */}
        <div className="flex flex-col items-center m-5">
          <CharactersFilters
            filters={filters}
            filtersSelects={filtersSelects}
            handleChangeFilter={handleChangeFilter}
            handleResetFilters={handleResetFilters}
          />
          <div className="flex items-stretch justify-center flex-wrap gap-4 mt-4 min-w-full max-h-[500px] overflow-y-auto custom-characters-scrollbar">
            {Object.values(filters).every((filter) => filter === "") && (
              //TODO: Make this component for every current filter option
              <CharacterGroupCard
                key={"all"}
                group={{ id: "all", name: "All Characters" }}
                isSelected={characters.length === characters.length}
                handleAddGroupCard={handleAddGroupCard}
              />
            )}

            {filteredCharacters?.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                isSelected={characters.findIndex((item) => item === char.id) !== -1}
                handleAddCharacter={handleAddCharacter}
              />
            ))}
          </div>
        </div>
      </Accordion>
    </div>
  );
});
