import { FormLabel } from "@components/form/FormLabel";
import { useTournamentForm } from "./hooks/useTournamentForm";
import { FormInput } from "@components/form/FormInput";
import { FormSelect } from "@components/form/FormSelect";
import { tournametTypes } from "./variables/SetupVariables";
import { CharactersFilters } from "./components/CharactersFilters";
import { CharacterCard } from "./components/CharacterCard";
import { LoadingLogo } from "@components/ui/LoadingLogo";
import { CharacterGroupCard } from "./components/CharacterGroupCard";
import { useCharacterFilters } from "./hooks/useCharacterFilters";
import { Accordion } from "@components/ui/Accordion";

export const TournamentSetup = () => {
  const { formConfig, characters, handleChangeForm, handleAddCharacter, handleAddGroupCard, loading } =
    useTournamentForm();

  const { filteredCharacters, filters, filtersSelects, handleChangeFilter, handleResetFilters } = useCharacterFilters({
    characters,
  });

  if (loading) return <LoadingLogo />;

  return (
    <div className="fade-in flex flex-col items-center h-screen max-w-screen pt-20">
      <h1 className="text-6xl">GENSHIN ROYAL RUMBLE </h1>
      <div className="flex flex-col items-center justify-center max-w-6xl min-w-3xl rounded-lg p-4 gap-4">
        {/* NAME */}
        <FormLabel htmlFor="tournament_name">Tournament Name</FormLabel>
        <FormInput
          id="tournament_name"
          name="name"
          value={formConfig.name}
          placeholder="Name"
          onChange={handleChangeForm}
          required
        />
        {/* TYPE */}
        <FormLabel htmlFor="tournament_type">Tournament Type</FormLabel>
        <FormSelect id="tournament_type" name="type" value={formConfig.type} onChange={handleChangeForm}>
          {tournametTypes.map((type) => (
            <option id={type} key={type} value={type} disabled={type !== "League"}>
              {type}
            </option>
          ))}
        </FormSelect>
        {/* CHARACTERS */}
        <FormLabel htmlFor="tournament_characters">Characters</FormLabel>
        {/* CHARACTERS */}
        <Accordion id="tournament_characters" className="" summary="List of Characters">
          {/* //TODO: Fix flexbox to be start but centered */}
          <div className="flex flex-col items-center m-5">
            <CharactersFilters
              filters={filters}
              filtersSelects={filtersSelects}
              handleChangeFilter={handleChangeFilter}
              handleResetFilters={handleResetFilters}
            />
            <div className="flex items-stretch justify-center flex-wrap gap-4 mt-4 min-w-full">
              {Object.values(filters).every((filter) => filter === "") && (
                <CharacterGroupCard
                  key={"all"}
                  group={{ id: "all", name: "All Characters" }}
                  isSelected={formConfig.characters.length === characters.length}
                  handleAddGroupCard={handleAddGroupCard}
                />
              )}

              {filteredCharacters?.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  isSelected={formConfig.characters.findIndex((item) => item === char.id) !== -1}
                  handleAddCharacter={handleAddCharacter}
                />
              ))}
            </div>
          </div>
        </Accordion>
        <FormLabel htmlFor="tournament_categories">Characters</FormLabel>
      </div>
    </div>
  );
};
