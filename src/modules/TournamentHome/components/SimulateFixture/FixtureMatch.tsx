import { useTournament } from "@hooks/useTournament";
import { useMatchSimulation } from "@modules/TournamentHome/hooks/useMatchSimulation";
import type { Character } from "@mytypes/Character";

type Props = {
  home: Character;
  away: Character;
};

export const FixtureMatch = ({ home, away }: Props) => {
  const { categories } = useTournament();

  const { selectedCategories, comparisons, totalHomePoints, totalAwayPoints } = useMatchSimulation(
    categories[home.id],
    categories[away.id],
  );

  console.log("=== Simulación de Partido ===");
  console.log(`Categorías seleccionadas: ${selectedCategories.join(", ")}`);
  console.log("Comparación por categoría:");

  comparisons.forEach(({ category, homeRaw, awayRaw, weight, homeWeighted, awayWeighted }) => {
    console.log(
      `- ${category} (Peso: ${weight.toFixed(2)}): ` +
        `Home: ${homeRaw} x ${weight.toFixed(2)} = ${homeWeighted.toFixed(2)} | ` +
        `Away: ${awayRaw} x ${weight.toFixed(2)} = ${awayWeighted.toFixed(2)}`,
    );
  });

  console.log("-----");
  console.log(`Total puntos Home: ${totalHomePoints.toFixed(2)}`);
  console.log(`Total puntos Away: ${totalAwayPoints.toFixed(2)}`);

  if (totalHomePoints > totalAwayPoints) {
    console.log("Resultado: ¡Home gana! 🎉");
  } else if (totalAwayPoints > totalHomePoints) {
    console.log("Resultado: ¡Away gana! 🎉");
  } else {
    console.log("Resultado: Empate 🤝");
  }
  console.log("============================");
  return (
    <div className="flex items-center justify-between px-3 py-2">
      {/* Home character */}
      <div className="flex flex-col justify-center items-center gap-3 w-1/3 ">
        <h2 className="text-3xl">{home?.name}</h2>
        <img src={home?.images?.portrait} alt={home?.name || "Home character"} className="w-[500px] h-[500px]" />
      </div>

      <div className="flex flex-col justify-center items-center gap-4 max-w-xl">
        {comparisons.map(({ category, homeWeighted, awayWeighted }) => {
          const homeVal = Number(homeWeighted.toFixed(1));
          const awayVal = Number(awayWeighted.toFixed(1));
          const homeDiff = homeVal - awayVal > 0 ? (homeVal - awayVal).toFixed(1) : "0.0";
          const awayDiff = awayVal - homeVal > 0 ? (awayVal - homeVal).toFixed(1) : "0.0";

          return (
            <div key={category} className="flex justify-between items-center w-full px-4 gap-8">
              <span className={`w-8 text-right ${homeVal > awayVal ? "text-amber-400" : ""}`}>{homeDiff}</span>
              <span className="flex-grow text-center">{category.toUpperCase()}</span>
              <span className={`w-8 text-left ${awayVal > homeVal ? "text-amber-400" : ""}`}>{awayDiff}</span>
            </div>
          );
        })}
        <hr className="my-4 w-full border-gray-400" />
        <div className="flex justify-between items-center w-full px-4 font-bold text-xl max-w-xl">
          <span className={`w-8 text-right ${totalHomePoints > totalAwayPoints ? "text-amber-400" : ""}`}>
            {totalHomePoints.toFixed(1)}
          </span>
          <span className="flex-grow text-center">TOTAL</span>
          <span className={`w-8 text-left ${totalAwayPoints > totalHomePoints ? "text-amber-400" : ""}`}>
            {totalAwayPoints.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Away character */}
      <div className="flex flex-col justify-center items-center gap-3 w-1/3 ">
        <h2 className="text-3xl">{away?.name || "--"}</h2>
        <img src={away?.images?.portrait} alt={away?.name || "Home character"} className="w-[500px] h-[500px]" />
      </div>
    </div>
  );
};
