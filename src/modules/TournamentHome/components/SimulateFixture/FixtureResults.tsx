import { useState } from "react";
import { useTournament } from "@hooks/useTournament";
import { useSchedule } from "@modules/TournamentMatches/hooks/useSchedule";
import { FixtureMatch } from "./FixtureMatch";

export const FixtureResults = () => {
  const { schedule } = useSchedule();
  const { characters } = useTournament();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!schedule?.rounds || schedule.rounds.length === 0) {
    return <div className="text-gray-300">Unexpected error.</div>;
  }

  const { currentRound: currentRoundIndex, rounds } = schedule;
  const currentRound = rounds[currentRoundIndex - 1];

  const matches = currentRound.matches;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < matches.length - 1 ? prev + 1 : prev));
  };

  const match = matches[currentIndex];
  const home = characters[match.home];
  const away = characters[match.away];

  return (
    <div className="flex flex-col items-center gap-8">
      <h3 className="text-2xl text-amber-400">FIXTURE {currentRoundIndex}</h3>

      <div className="">
        {/* Match */}
        <FixtureMatch home={home} away={away} />

        {/* Controls */}
        <div className="flex justify-between mt-4 px-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-30"
          >
            ⬅️ Previous
          </button>
          <span className="text-gray-300 self-center">
            {currentIndex + 1} / {matches.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === matches.length - 1}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-30"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};
