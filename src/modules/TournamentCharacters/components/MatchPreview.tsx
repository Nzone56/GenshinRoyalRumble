import type { Match } from "@mytypes/Tournament";

type MatchPreviewProps = {
  match: Match;
};

export const MatchPreview = ({ match }: MatchPreviewProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs">{match.round}</span>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <img src={`https://genshin.jmp.blue/characters/${match.home}/icon`} alt={match.home} className="w-12 h-12" />
          <span className={`${match?.homePoints > match?.awayPoints ? "text-amber-400" : ""}`}>
            {match.homePoints || "N/A"}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <img src={`https://genshin.jmp.blue/characters/${match.away}/icon`} alt={match.away} className="w-12 h-12" />
          <span className={`${match?.awayPoints > match?.homePoints ? "text-amber-400" : ""}`}>
            {match.awayPoints || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};
