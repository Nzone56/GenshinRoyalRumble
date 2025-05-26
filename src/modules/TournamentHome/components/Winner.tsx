import { useTournament } from "@hooks/useTournament";
import { useTable } from "@modules/TournamentTable/hooks/useTable";


export const Winner = () => {
  const { characters } = useTournament();
  const { getStandings } = useTable();

  const winner = characters[getStandings()[0].id]

  return (
    <div className="text-center p-4 bg-gray-800 text-white rounded-xl shadow-md">
      <h1 className="text-xl mb-2">CONGRATULATIONS</h1>
      <div className="w-[300px] h-[400px]">
      <img
        src={winner.images.portrait}
        alt={winner.name}
        className="w-full h-full object-fill mx-auto rounded-lg mb-2"
      />
        </div>
     
      <h2 className="text-lg text-amber-400">{winner.name}</h2>
    </div>
  );
};