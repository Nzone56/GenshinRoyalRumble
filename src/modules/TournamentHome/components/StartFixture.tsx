import { useSchedule } from "@modules/TournamentMatches/hooks/useSchedule";

export const StartFixture = ({ handleStartFixture }: { handleStartFixture: () => void }) => {
  const { currentRound } = useSchedule();

  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        onClick={handleStartFixture}
        // disabled={filledCharacters.length < config.characters.length}
        className={`
            px-8 py-3  rounded-xl text-white  transition duration-300
            bg-gray-800 hover:bg-amber-400 hover:scale-110 cursor-pointer
          `}
      >
        Start Fixture {currentRound}
      </button>
    </div>
  );
};
