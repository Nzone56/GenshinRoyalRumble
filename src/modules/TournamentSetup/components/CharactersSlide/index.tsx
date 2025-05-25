import { memo } from "react";
import { CharactersFilters } from "./CharactersFilters";
import { useCharacterFilters } from "@modules/TournamentSetup/hooks/useCharacterFilters";
import { useTournamentStoreForm } from "../../hooks/useTournamentStoreForm";
import { CharacterGroupCard } from "./CharacterGroupCard";
import { CharacterCard } from "./CharacterCard";

export const CharactersSlide = memo(() => {
  const { filters, filtersSelects, filteredCharacters, handleChangeFilter, handleResetFilters } = useCharacterFilters();
  const { characters, charactersList, charactersValidation, handleAddGroupCard, handleAddCharacter } =
    useTournamentStoreForm();

  return (
    <div className="flex flex-col items-center gap-5 mb-5 text-center justify-center h-full animate-fade-in px-8">
      <h3 className="text-4xl font-semibold text-white">CHOOSE THE CHARACTERS</h3>
      <p className="leading-loose text-lg max-w-3xl text-gray-300">
        Finally, the last step: choose the characters that will compete in your tournament.
        <span className="text-amber-400"> Keep in mind the total number required</span> — it varies depending on the
        tournament type!
      </p>

      {/* //TODO: Fix flexbox to be start but centered */}
      <div className="flex flex-col items-center m-5">
        <CharactersFilters
          filters={filters}
          filtersSelects={filtersSelects}
          handleChangeFilter={handleChangeFilter}
          handleResetFilters={handleResetFilters}
        />
        {!charactersValidation.isValid && <span className="text-amber-400">{charactersValidation.message}</span>}
        <div className="flex items-stretch justify-center flex-wrap gap-4 mt-4 max-h-[300px] overflow-y-auto px-2 custom-scrollbar">
          {Object.values(filters).every((filter) => filter === "") && (
            //TODO: Make this component for every current filter option
            <CharacterGroupCard
              key={"all"}
              group={{ id: "all", name: "All Characters" }}
              isSelected={characters.length === charactersList.length}
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
    </div>
  );
});
