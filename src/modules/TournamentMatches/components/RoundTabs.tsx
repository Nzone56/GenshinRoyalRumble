import { useSchedule } from "../hooks/useSchedule";

export const RoundTabs = () => {
  const { schedule, currentRound, selectedRound, setSelectedRound } = useSchedule();

  return (
    <div className="flex gap-2 overflow-x-auto p-2 rounded-xl custom-scrollbar ">
      {schedule?.rounds.map((round) => (
        <button
          key={round.id}
          onClick={() => setSelectedRound(round.id)}
          className={`
           cursor-pointer min-w-[40px] py-2 rounded-lg text-sm font-semibold transition duration-200
            ${
              selectedRound === round.id
                ? "bg-amber-500 text-white border-amber-600 r"
                : currentRound > round.id
                  ? "bg-green-200 text-green-600 border-green-300 hover:bg-green-300"
                  : "bg-gray-700 text-white border-gray-300 hover:bg-amber-300 hover:text-white"
            }
            `}
        >
          {round.id}
        </button>
      ))}
    </div>
  );
};
