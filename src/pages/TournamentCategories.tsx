import { useEffect } from "react";
import { FormSelect } from "@components/form/FormSelect";
import { LoadingLogo } from "@components/ui/LoadingLogo";
import { useTournament } from "@hooks/useTournament";
import { CharacterSetup } from "@modules/TournamentCategories/components/CharacterSetup";
import { useTournamentCategories } from "@modules/TournamentCategories/hooks/useTournamentCategories";

export const TournamentCategories = () => {
  const { config, characters, categories } = useTournament();
  const {
    imgError,
    setImgError,
    loading,
    setLoading,
    selectedCharacter,
    handleSelectCharacter,
  } = useTournamentCategories();


  useEffect(() => {
    setLoading(true);
    setImgError(false);

    const img = new Image();
    img.src = `https://genshin.jmp.blue/characters/${selectedCharacter}/gacha-card`;

    img.onload = () => {
      setLoading(false);
    };

    img.onerror = () => {
      setImgError(true);
      setLoading(false);
    };
  }, [selectedCharacter, setImgError, setLoading]);


  if (Object.keys(characters).length === 0) return <LoadingLogo />;

  return (
    <div className={`m-8 fade-in-up`}>
      <div className="flex flex-col items-center justify-between mb-4 gap-4">
        <p className="text-lg">
          Before starting the tournament, you must assign a value to each category for every character.
          <span className="text-amber-400"> This value cannot be changed once the tournament begins. </span>
          In the selection list, characters who still need category values will be highlighted in{" "}
          <span className="text-amber-400">amber</span>. Keep in mind that{" "}
          <span className="text-amber-400">no value can be 0</span>.
        </p>
        <FormSelect
          id="select_character_categories"
          name="selected_character_categories"
          value={selectedCharacter}
          disabled={loading && !imgError}
          onChange={handleSelectCharacter}
        >
          {config.characters.map((curr) => (
            <option
              id={characters[curr].id}
              key={characters[curr].id}
              value={curr}
              className={`${
                Object.values(categories[curr]).every((value) => value > 0) ? "" : "text-amber-400"
              }`}
            >
              {characters[curr].name}
            </option>
          ))}
        </FormSelect>
      </div>
      {loading ? (
        <LoadingLogo />
      ) : (
        <CharacterSetup imgError={imgError} selectedCharacter={selectedCharacter} />
      )}
    </div>
  );
};
