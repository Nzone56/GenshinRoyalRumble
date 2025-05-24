import { LoadingLogo } from "@components/ui/LoadingLogo";
import { CharacterCarrousel } from "@modules/TournamentCharacters/components/CharacterCarrousel";
import { CharacterInformation } from "@modules/TournamentCharacters/components/CharacterInformation";
import { useCharacter } from "@modules/TournamentCharacters/hooks/useCharacter";

export const TournamentCharacters = () => {
  const { currentCharacter } = useCharacter();

  if (!currentCharacter) return <LoadingLogo />;

  return (
    <div className="flex justify-around h-full m-4">
      <CharacterCarrousel />
      <CharacterInformation />
    </div>
  );
};
