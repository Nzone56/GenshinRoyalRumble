import { useTournament } from "@hooks/useTournament";
import { useSchedule } from "../hook/useSchedule";

export const RoundMatches = () => {
  const { selectedRound, currentRound, schedule } = useSchedule();
  const { characters } = useTournament();

  const round = schedule?.rounds.find((r) => r.id === selectedRound);
  const isCompleted = selectedRound < currentRound;

  if (!round) {
    return <div className="p-4 text-gray-500">No matches available</div>;
  }

  return (
    <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {round.matches.map((match) => {
        const home = characters[match.home];
        const away = characters[match.away];

        return (
          <div
            key={match.id}
            className="flex justify-between items-center gap-4 p-4 rounded-xl shadow-md transition bg-gray-700"
          >
            {/* Home */}
            <div className="flex items-center gap-2 w-1/3" title={home?.name}>
              <img
                src={home?.images?.iconside || "/placeholder.png"}
                alt={home?.name || "Home character"}
                className="w-8 h-8 object-cover scale-x-[-1] rounded-full"
              />
              <span className="text-white font-medium truncate">{home?.name || "--"}</span>
            </div>

            {/* Score */}
            <div className="text-lg font-bold text-center text-white w-1/3">
              {isCompleted ? (
                <span>
                  {match.homePoints} - {match.awayPoints}
                </span>
              ) : (
                <span className="text-gray-400">VS</span>
              )}
            </div>

            {/* Away */}
            <div className="flex items-center gap-2 justify-end w-1/3" title={away?.name}>
              <span className="text-white font-medium truncate text-right">{away?.name || "--"}</span>
              <img
                src={away?.images?.iconside || "/placeholder.png"}
                alt={away?.name || "Away character"}
                className="w-8 h-8 object-contain rounded-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
