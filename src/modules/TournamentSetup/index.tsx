import { FormLabel } from "@components/Form/FormLabel";
import { useTournamentForm } from "./hooks/useTournamentForm";
import { FormInput } from "@components/Form/FormInput";
import { FormSelect } from "@components/Form/FormSelect";
import { tournametTypes } from "./variables/SetupVariables";
import { CharactersFilters } from "./components/CharactersFilters";
import { CharacterCard } from "./components/CharacterCard";

export const TournamentSetup = () => {
  const { formConfig, characters, handleChangeForm } = useTournamentForm();

  return (
    <div className="flex flex-col items-center h-screen max-w-screen pt-20">
      <h1 className="text-6xl">GENSHIN ROYAL RUMBLE </h1>
      <div className="flex flex-col items-center justify-center max-w-4xl min-w-2xl rounded-lg p-4 gap-4">
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
        <FormSelect
          id="tournament_type"
          name="type"
          value={formConfig.type}
          onChange={handleChangeForm}
        >
          {tournametTypes.map((type) => (
            <option id={type} key={type} value={type} disabled={type !== "League"}>
              {type}
            </option>
          ))}
        </FormSelect>
        {/* CHARACTERS */}
        <FormLabel htmlFor="tournament_characters">Characters</FormLabel>
        <div id="tournament_characters" className="flex flex-col items-center">
          <CharactersFilters />
          <div className="flex items-center justify-center flex-wrap gap-4 p-4">
            {characters?.map((char) => <CharacterCard key={char.id} character={char} />)}
          </div>
        </div>
        <label>Categories</label>
      </div>
    </div>
  );
};
