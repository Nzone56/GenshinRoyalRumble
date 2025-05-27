import { DetailedMatch } from "@modules/TournamentMatches/components/DetailedMatch";
import { RoundMatches } from "@modules/TournamentMatches/components/RoundMatches";
import { RoundTabs } from "@modules/TournamentMatches/components/RoundTabs";
import type { Match } from "@mytypes/Tournament";
import { useState } from "react";

export const TournamentMatches = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  return (
    <div className={`flex flex-col m-8 fade-in-up`}>
      {selectedMatch ? (
        <DetailedMatch match={selectedMatch} setSelectedMatch={setSelectedMatch}/>
      ) : (
        <div className="flex flex-col fade-in-up">
          <h3 className="text-2xl">Fixtures</h3>
          <RoundTabs />
          <RoundMatches setSelectedMatch={setSelectedMatch}/>
        </div>
      )}
    </div>
  );
};
