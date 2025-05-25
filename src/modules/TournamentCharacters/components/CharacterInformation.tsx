import { useCharacter } from "../hooks/useCharacter";
import POSITION from "@assets/images/icons/stats/position.svg?react";
import BATTLES from "@assets/images/icons/stats/battles.svg?react";
import WINS from "@assets/images/icons/stats/wins.svg?react";
import DRAWS from "@assets/images/icons/stats/draws.svg?react";
import LOOSES from "@assets/images/icons/xmark.svg?react";
import POINSF from "@assets/images/icons/stats/points-favor.svg?react";
import POINSA from "@assets/images/icons/stats/points-against.svg?react";
import DIFFP from "@assets/images/icons/stats/diff-points.svg?react";
import { MatchPreview } from "./MatchPreview";
import type { Match } from "@mytypes/Tournament";
import { LoadingLogo } from "@components/ui/LoadingLogo";

export const CharacterInformation = () => {
  const { CharactersStats, currentCharacter } = useCharacter();

  const icons = {
    position: POSITION,
    battles: BATTLES,
    wins: WINS,
    draws: DRAWS,
    pointsF: POINSF,
    pointsA: POINSA,
    diffP: DIFFP,
    losses: LOOSES,
  };

  const placeholderLastMatches: Match[] = [
    {
      id: "8-1",
      round: 8,
      home: "albedo",
      away: "amber",
      homePoints: 3.14,
      awayPoints: 2.5,
    },
    {
      id: "9-1",
      round: 9,
      home: "amber",
      away: "albedo",
      homePoints: 2.4,
      awayPoints: 2.1,
    },
    {
      id: "10-1",
      round: 10,
      home: "albedo",
      away: "amber",
      homePoints: 3.14,
      awayPoints: 3.5,
    },
  ];

  const placeholderNextMatches: Match[] = [
    {
      id: "11-1",
      round: 11,
      home: "albedo",
      away: "amber",
      homePoints: 0,
      awayPoints: 0,
    },
    {
      id: "12-1",
      round: 12,
      home: "amber",
      away: "albedo",
      homePoints: 0,
      awayPoints: 0,
    },
    {
      id: "13-1",
      round: 13,
      home: "albedo",
      away: "amber",
      homePoints: 0,
      awayPoints: 0,
    },
  ];

  return (
    <div className="flex flex-col items-center m-12 flex-grow-1 max-w-5xl">
      {currentCharacter ? (
        <>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold text-center">{currentCharacter?.name}</h2>
              <span className="text-amber-400">{currentCharacter?.title} </span>
            </div>
            <p>{currentCharacter?.description || "No description available"}</p>
          </div>
          <div>
            <div className="flex flex-col gap-4 mt-8">
              <span className="text-lg text-amber-400">Tournament Stats</span>
              <div className="flex items-center justify-between w-full px-4 py-2 gap-4 flex-wrap bg-gray-800 rounded-lg">
                {Object.entries(CharactersStats[currentCharacter?.id]).map(([key, value]) => {
                  const Icon = icons[key as keyof typeof icons];
                  return (
                    <div key={key} className="flex items-center gap-4">
                      <Icon className="w-4 h-4 fill-gray-950" />
                      <span>{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-around w-full gap-4 mt-8">
              <div className="flex flex-col gap-4 mt-8">
                <span className="text-lg text-amber-400">Last 3 Matches</span>
                <div className="flex flex-col items-center justify-between w-full px-4 py-2 gap-4 flex-wrap bg-gray-800 rounded-lg">
                  {placeholderLastMatches.map((match) => (
                    <MatchPreview key={match.id} match={match} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <span className="text-lg text-amber-400">Next 3 Matches</span>
                <div className="flex flex-col items-center justify-between w-full px-4 py-2 gap-4 flex-wrap bg-gray-800 rounded-lg">
                  {placeholderNextMatches.map((match) => (
                    <MatchPreview key={match.id} match={match} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoadingLogo />
      )}
    </div>
  );
};
