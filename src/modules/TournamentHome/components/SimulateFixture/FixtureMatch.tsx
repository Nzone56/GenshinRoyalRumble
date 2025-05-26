import { LoadingLogo } from "@components/ui/LoadingLogo";
import { useTournament } from "@hooks/useTournament";
import type { Match } from "@mytypes/Tournament";
import { useEffect, useState } from "react";

type Props = {
  match: Match | undefined;
};

export const FixtureMatch = ({ match }: Props) => {

  const [imagesLoaded, setImagesLoaded] = useState([false, false]);
  const { characters } = useTournament()

  useEffect(() => {
    setImagesLoaded([false, false])
  }, [match]);
  
  if(!match) return <span> Unexpected Error </span>


  const allImagesLoaded = imagesLoaded.every(Boolean);

  return (
    <div className="relative">
      {!allImagesLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-950">
          <LoadingLogo />
        </div>
      )}

      <div className={`flex items-center justify-between px-3 py-2 transition-opacity ${allImagesLoaded ? "opacity-100" : "opacity-0"} duration-500`}>
        {/* Home character */}
        <div className="flex flex-col justify-center items-center gap-3 w-1/3">
          <h2 className="text-3xl">{characters[match?.home].name}</h2>
          <img
            src={characters[match?.home]?.images?.portrait}
            alt={characters[match?.home]?.name || "Home character"}
            className="w-[500px] h-[500px]"
            onLoad={() => setImagesLoaded((prev) => [true, prev[1]])}
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-4 max-w-xl">
          {match.categoriesResults.map(({ category, homeWeighted, awayWeighted }) => {
          
            const homeVal = Number(homeWeighted.toFixed(1));
            const awayVal = Number(awayWeighted.toFixed(1));
            const homeDiff = homeVal > awayVal ? (homeVal - awayVal).toFixed(1) : "0.0";
            const awayDiff = awayVal > homeVal ? (awayVal - homeVal).toFixed(1) : "0.0";

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
            <span className={`w-8 text-right ${match?.homePoints > match?.awayPoints ? "text-amber-400" : ""}`}>
              {match?.homePoints.toFixed(1)}
            </span>
            <span className="flex-grow text-center">TOTAL</span>
            <span className={`w-8 text-left ${match?.awayPoints > match?.homePoints ? "text-amber-400" : ""}`}>
              {match?.awayPoints.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Away character */}
        <div className="flex flex-col justify-center items-center gap-3 w-1/3">
          <h2 className="text-3xl">{characters[match?.away]?.name || "--"}</h2>
          <img
            src={characters[match?.away]?.images?.portrait}
            alt={characters[match?.away]?.name || "Away character"}
            className="w-[500px] h-[500px]"
            onLoad={() => setImagesLoaded((prev) => [prev[0], true])}
          />
        </div>
      </div>
    </div>
  );
};