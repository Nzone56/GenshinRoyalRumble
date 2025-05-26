import { useTournament } from "@hooks/useTournament";
import { useTable } from "@modules/TournamentTable/hooks/useTable";

export const TablePreview = () => {
  const { standings } = useTable();
  const { characters } = useTournament();

  const topFive = standings?.slice(0, 5) || [];

  return (
    <div className="flex flex-col w-full max-w-md p-4 bg-white dark:bg-gray-800 rounded-xl h-[320px]">
      <h3 className="text-xl text-amber-400">Standings</h3>
      <div className="flex flex-col items-center justify-center flex-grow-1 my-2">
        {topFive.map(({ position, id, points }, index) => {
          const name = characters[id]?.name;
          const icon = characters[id]?.images.icon;

          return (
            <div
              key={index}
              className={`w-full flex items-center justify-between p-2.5 ${index === 4 ? "" : "border-b border-gray-200"} dark:border-gray-700`}
            >
              <span className={`w-6 ${index === 0 ? "text-amber-400" : "text-gray-300"}`}>{position}</span>
              <div className="w-8 h-8 mr-3">
                {typeof icon === "string" ? (
                  <img src={icon} alt={`${name} icon`} className="w-full h-full object-contain" />
                ) : (
                  icon
                )}
              </div>
              <span className={`flex-grow ${index === 0 ? "text-amber-400" : "text-gray-100"} truncate`} title={name}>
                {name}
              </span>
              <span className={`w-10 text-right  ${index === 0 ? "text-amber-400" : "text-gray-300"}`}>{points}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
