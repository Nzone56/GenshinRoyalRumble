import { useState } from "react";
// import { useTournament } from "@hooks/useTournament";
import { useSchedule } from "@modules/TournamentMatches/hooks/useSchedule";
import { FixtureMatch } from "./FixtureMatch";
import { useMatchSimulation } from "@modules/TournamentHome/hooks/useMatchSimulation";

export const FixtureResults = ({handleContinueNextRound}: {handleContinueNextRound: () => void}) => {
  const { schedule, currentRound } = useSchedule();
  // const { characters } = useTournament();
  const [currentIndex, setCurrentIndex] = useState(0);

  const allCurrentRound = schedule?.rounds[currentRound - 2];
  const matches = allCurrentRound?.matches;

  useMatchSimulation();

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < (matches?.length || 0) - 1 ? prev + 1 : prev));
  };

  return (
    <div className="flex flex-col items-center gap-4 m-8">
      <h3 className="text-2xl text-amber-400">FIXTURE {currentRound}</h3>
      <button
            type="button"
            onClick={handleContinueNextRound}
            className={`mt-4 px-8 py-3 rounded-xl text-white  transition duration-300 bg-amber-400 hover:scale-110 cursor-pointer`}
          >
            Back to home
          </button>
      <div>
        {/* Match */}
        <FixtureMatch match={matches?.[currentIndex]} />

        {/* Controls */}
        <div className="flex justify-between mt-4 px-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 bg-gray-700 text-white rounded-xl ${currentIndex === 0 ? "cursor-not-allowed opacity-30" : "hover:bg-gray-600 hover:scale-105 transittion duration-300 cursor-pointer"} `}
          >
            ⬅️ Previous
          </button>
          <span className="text-gray-300 self-center">
            {currentIndex + 1} / {matches?.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === (matches?.length || 0) - 1}
            className={`px-4 py-2 bg-gray-700 text-white rounded-xl ${currentIndex === (matches?.length || 0) - 1 ? "cursor-not-allowed opacity-30" : "hover:bg-gray-600 hover:scale-105 transittion duration-300 cursor-pointer"} `}
          >
            Next ➡️
          </button>
          
        </div>
       
      </div>
    </div>
  );
};
