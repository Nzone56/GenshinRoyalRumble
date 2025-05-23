import { LoadingLogo } from "@components/ui/LoadingLogo";
import { CharacterCarrousel } from "@modules/TournamentCharacters/components/CharacterCarrousel";
import { CharacterStats } from "@modules/TournamentCharacters/components/CharacterStats";
import { useCharacter } from "@modules/TournamentCharacters/hooks/useCharacter";

export const TournamentCharacters = () => {
  const { currentCharacter } = useCharacter();

  if (!currentCharacter) return <LoadingLogo />;

  return (
    <div className="flex justify-between items-center h-full m-4">
      <CharacterCarrousel />
      <CharacterStats />
    </div>
  );
};
