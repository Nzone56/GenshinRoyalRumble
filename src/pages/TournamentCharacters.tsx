import { LoadingLogo } from "@components/ui/LoadingLogo";
import { CharacterCarrousel } from "@modules/TournamentCharacters/components/CharacterCarrousel";
import { CharacterInformation } from "@modules/TournamentCharacters/components/CharacterInformation";
import { useCharacter } from "@modules/TournamentCharacters/hooks/useCharacter";
import { DetailedMatch } from "@modules/TournamentMatches/components/DetailedMatch";
import type { Match } from "@mytypes/Tournament";
import { useState } from "react";

export const TournamentCharacters = () => {
  const { currentCharacter } = useCharacter();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  if (!currentCharacter) return <LoadingLogo />;

  return (
    <div className={`flex justify-around h-full m-4 fade-in-up`}>
      {selectedMatch ? (
        <DetailedMatch match={selectedMatch} setSelectedMatch={setSelectedMatch} />
      ) : (
        <div className="flex justify-around h-full fade-in-up">
          <CharacterCarrousel />
          <CharacterInformation setSelectedMatch={setSelectedMatch}/>
        </div>
      )}
    </div>
  );
};
