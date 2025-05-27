import { LoadingLogo } from "@components/ui/LoadingLogo";
import { CharacterCarrousel } from "@modules/TournamentCharacters/components/CharacterCarrousel";
import { CharacterInformation } from "@modules/TournamentCharacters/components/CharacterInformation";
import { useCharacter } from "@modules/TournamentCharacters/hooks/useCharacter";
import { useEffect, useState } from "react";

export const TournamentCharacters = () => {
  const { currentCharacter } = useCharacter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 10); 
    return () => clearTimeout(timeout);
  }, []);

  if (!currentCharacter) return <LoadingLogo />;

  return (
    <div
      className={`flex justify-around h-full m-4 transition-all duration-500 ease-out transform ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <CharacterCarrousel />
      <CharacterInformation />
    </div>
  );
};
