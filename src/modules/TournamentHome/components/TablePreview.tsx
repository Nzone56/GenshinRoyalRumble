import { useTournament } from "@hooks/useTournament";
import { useCharacter } from "@modules/TournamentCharacters/hooks/useCharacter";
import { getPrevPositionIcon } from "@modules/TournamentTable/helpers/TableVariables";
import { useTable } from "@modules/TournamentTable/hooks/useTable";
import { useNavigate } from "react-router";

export const TablePreview = () => {
  const navigate = useNavigate();
  const { getStandings } = useTable();
  const { characters } = useTournament();
  const { characterIds, setSelectedCharacterIndex } = useCharacter();

  const topFive = getStandings()?.slice(0, 5) || [];

  const handleSelectCharacter = (id: string) => {
    setSelectedCharacterIndex(characterIds.findIndex((char: string) => char === id));
    navigate("/tournament/characters");
  };

  return (
    <div 
    className="flex flex-col w-full p-4 bg-white dark:bg-gray-800 rounded-xl h-[320px] flex-grow-1"

    >
      
      <h3 className="text-xl text-amber-400">Standings</h3>
      <div className="flex flex-col items-center justify-center flex-grow-1 my-2">
        {topFive.map((character, index) => {
          const { position, id, points } = character
          const name = characters[id]?.name;
          const icon = characters[id]?.images.icon;

          return (
            <div
              key={index}
              className={`w-full flex items-center justify-between p-2.5 ${index === 4 ? "" : "border-b border-gray-200"} border-gray-700 hover:bg-gray-700 transition duration-300 cursor-pointer`}
              onClick={() => handleSelectCharacter(id)}
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
              <span className={`w-10 mr-4 text-right  ${index === 0 ? "text-amber-400" : "text-gray-300"}`}>{points}</span>
              <span >{getPrevPositionIcon(character)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
