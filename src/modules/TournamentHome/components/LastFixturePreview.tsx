import { useTournament } from "@hooks/useTournament";
import { useSchedule } from "@modules/TournamentMatches/hooks/useSchedule";

export const LastFixturePreview = () => {
  const { schedule } = useSchedule();
  const { characters } = useTournament();
  if (!schedule?.rounds || schedule.rounds.length === 0) {
    return <div className="text-gray-600 dark:text-gray-300 italic h-[320px]">No rounds available.</div>;
  }

  const { currentRound, rounds } = schedule;

  const lastPlayedRound = currentRound === 1 ? null : rounds[currentRound - 1];

  if (!lastPlayedRound) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-800 rounded-xl h-[320px]">
        No previous results available.
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-gray-800">
      <h3 className="text-lg text-amber-400 ">Last Fixture ({lastPlayedRound.id})</h3>
      <div className="space-y-2 h-[260px] overflow-auto custom-scrollbar">
        {lastPlayedRound.matches.map((match) => {
          const home = characters[match.home];
          const away = characters[match.away];
          return (
            <div key={match.id} className="flex items-center justify-between px-3 py-2 ">
              {/* Home character */}
              <div className="flex items-center gap-2 w-1/3" title={home?.name}>
                <img
                  src={home?.images?.iconside}
                  alt={home?.name || "Home character"}
                  className="w-8 h-8 object-cover scale-x-[-1] rounded-full"
                />
                <span className="text-white edium truncate">{home?.name || "--"}</span>
              </div>

              {/* Score */}
              <div className="w-1/3 text-center  text-sm ">
                {match.homePoints} - {match.awayPoints}
              </div>

              {/* Away character */}
              <div className="flex items-center gap-2 justify-end w-1/3" title={away?.name}>
                <span className="text-white edium truncate text-right">{away?.name || "--"}</span>
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
