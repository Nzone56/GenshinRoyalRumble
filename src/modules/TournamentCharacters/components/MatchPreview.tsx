import { capitalize } from "@helpers/string";
import type { Match } from "@mytypes/Tournament";

type MatchPreviewProps = {
  match: Match;
  currentRound: number;
  setSelectedMatch: (match: Match) => void;
};

export const MatchPreview = ({ match, currentRound, setSelectedMatch }: MatchPreviewProps) => {

  const PLAYED = currentRound >  match.round
  const handleSelectMatch =(match:Match) => {
    if(PLAYED) {
      setSelectedMatch(match)
    }
  }
  return (
    <div
      className={`flex flex-col items-center gap-2 ${PLAYED ? "hover:bg-gray-600 cursor-pointer" : ""} transition duration-400 px-4`}
      onClick={() => handleSelectMatch(match)}
    >
      <span className="text-xs">{match.round}</span>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <img
            src={`https://genshin.jmp.blue/characters/${match.home}/icon`}
            alt={match.home}
            title={capitalize(String(match.home))}
            className="w-12 h-12"
          />
          <span className={`${match?.homePoints > match?.awayPoints ? "text-amber-400" : ""}`}>
            {PLAYED ? match.homePoints : "N/A"}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <img
            src={`https://genshin.jmp.blue/characters/${match.away}/icon`}
            title={capitalize(String(match.away))}
            alt={match.away}
            className="w-12 h-12"
          />
          <span className={`${match?.awayPoints > match?.homePoints ? "text-amber-400" : ""}`}>
            {PLAYED ? match.awayPoints : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};
