import { useTournament } from "@hooks/useTournament";
import { useSchedule } from "@modules/TournamentMatches/hooks/useSchedule";
import clsx from "clsx"; // Asegúrate de tenerlo instalado

export const LastFixturePreview = () => {
  const { schedule, currentRound } = useSchedule();
  const { characters } = useTournament();

  if (!schedule?.rounds || schedule.rounds.length === 0) {
    return <div className="text-gray-600 dark:text-gray-300 italic h-[320px]">No rounds available.</div>;
  }

  const lastPlayedRound = currentRound === 1 ? null : schedule.rounds[currentRound - 2];

  if (!lastPlayedRound) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-800 rounded-xl h-[320px] flex-grow-1 max-w-[500px]">
        No previous results available.
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-gray-800 flex-grow-1 max-w-[500px]">
      <h3 className="text-lg text-amber-400">Last Fixture ({lastPlayedRound.id})</h3>
      <div className="space-y-2 h-[260px] overflow-auto custom-scrollbar">
        {lastPlayedRound.matches.map((match) => {
          const home = characters[match.home];
          const away = characters[match.away];

          const isDraw = match.homePoints === match.awayPoints;
          const homeWinner = match.homePoints > match.awayPoints;
          const awayWinner = match.awayPoints > match.homePoints;

          const homeNameClass = clsx("truncate", {
            "text-white": !homeWinner,
            "text-amber-400": homeWinner,
          });

          const awayNameClass = clsx("truncate text-right", {
            "text-white": !awayWinner,
            "text-amber-400": awayWinner,
          });

          const scoreClass = (team: "home" | "away") =>
            clsx({
              "text-amber-400": (team === "home" && homeWinner) || (team === "away" && awayWinner),
              "text-white": isDraw || (!homeWinner && !awayWinner),
            });

          return (
            <div key={match.id} className="flex items-center justify-between px-3 py-2">
              {/* Home character */}
              <div className="flex items-center gap-2 w-1/3" title={home?.name}>
                <img
                  src={home?.images?.iconside}
                  alt={home?.name || "Home character"}
                  className="w-8 h-8 object-cover scale-x-[-1] rounded-full"
                />
                <span className={homeNameClass}>{home?.name || "--"}</span>
              </div>

              {/* Score */}
              <div className="w-1/3 text-center text-sm">
                <span className={scoreClass("home")}>{match.homePoints}</span>
                {" - "}
                <span className={scoreClass("away")}>{match.awayPoints}</span>
              </div>

              {/* Away character */}
              <div className="flex items-center gap-2 justify-end w-1/3" title={away?.name}>
                <span className={awayNameClass}>{away?.name || "--"}</span>
                <img
                  src={away?.images?.iconside}
                  alt={away?.name || "Away character"}
                  className="w-8 h-8 object-contain rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
