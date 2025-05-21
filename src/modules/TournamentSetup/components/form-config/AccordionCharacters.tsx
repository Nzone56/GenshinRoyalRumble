import { memo } from "react";
import { CharacterCard } from "../CharacterCard";
import { Accordion } from "@components/ui/Accordion";
import { FormLabel } from "@components/form/FormLabel";
import { CharactersFilters } from "../CharactersFilters";
import { CharacterGroupCard } from "../CharacterGroupCard";
import { useCharacterFilters } from "@modules/TournamentSetup/hooks/useCharacterFilters";
import type { PreviewCharacter } from "@mytypes/Character";

interface AccordionCharactersProps {
  formCharacters: string[],
  characters: PreviewCharacter[]
  handleAddGroupCard: (id: string) => void
  handleAddCharacter: (id: string) => void
}

export const AccordionCharacters = memo(({formCharacters, characters, handleAddGroupCard, handleAddCharacter}: AccordionCharactersProps) => {
  
  const { filters, filtersSelects, filteredCharacters, handleChangeFilter, handleResetFilters } = useCharacterFilters({characters});

  return (
    <fieldset className="flex flex-col items-center mb-5">
    <FormLabel htmlFor="tournament_characters">Characters</FormLabel>
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
              isSelected={formCharacters.length === characters.length}
              handleAddGroupCard={handleAddGroupCard}
            />
          )}

          {filteredCharacters?.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              isSelected={formCharacters.findIndex((item) => item === char.id) !== -1}
              handleAddCharacter={handleAddCharacter}
            />
          ))}
        </div>
      </div>
    </Accordion>
  </fieldset>
  );
});
