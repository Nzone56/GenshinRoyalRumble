import { useTournament } from "@hooks/useTournament";
import { useSchedule } from "@modules/TournamentMatches/hooks/useSchedule";

export const FixturePreview = () => {
  const { schedule, currentRound } = useSchedule();
  const { characters } = useTournament();

  if (!schedule?.rounds || schedule.rounds.length === 0) {
    return <div className="text-gray-300">No rounds available.</div>;
  }

  const nextRound = schedule.rounds[currentRound - 1];

  if (!nextRound) {
    return <div className="p-6 bg-gray-800 rounded-2xl">No upcoming fixtures available.</div>;
  }

  return (
    <div className="p-6 bg-gray-800 rounded-2xl w-full">
      <h3 className="text-2xl  text-amber-400">Next Fixture ({nextRound.id})</h3>
      <div className="h-[320px] overflow-auto custom-scrollbar pr-2">
        {nextRound.matches.map((match) => {
          const home = characters[match.home];
          const away = characters[match.away];

          return (
            <div
              key={match.id}
              className="flex items-center justify-between px-3 py-2 bg-gray-800 rounded-xl"
            >
              {/* Home character */}
              <div className="flex items-center gap-3 w-1/3" title={home?.name}>
                <img
                  src={home?.images?.icon}
                  alt={home?.name || "Home character"}
                  className="w-12 h-12 object-cover rounded-full border-2 border-white"
                />
                <span className="text-white  truncate">{home?.name || "--"}</span>
              </div>

              {/* VS label */}
              <div className="w-1/3 text-center text-sm  text-gray-300">VS</div>

              {/* Away character */}
              <div className="flex items-center gap-3 justify-end w-1/3" title={away?.name}>
                <span className="text-white  truncate text-right">{away?.name || "--"}</span>
                <img
                  src={away?.images?.icon}
                  alt={away?.name || "Away character"}
                  className="w-12 h-12 object-contain scale-x-[-1] rounded-full border-2 border-white"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
