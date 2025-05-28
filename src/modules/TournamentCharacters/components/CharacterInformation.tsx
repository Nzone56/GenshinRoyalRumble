import { useCharacter } from "../hooks/useCharacter";
import POSITION from "@assets/images/icons/stats/position.svg?react";
import BATTLES from "@assets/images/icons/stats/battles.svg?react";
import WINS from "@assets/images/icons/stats/wins.svg?react";
import DRAWS from "@assets/images/icons/stats/draws.svg?react";
import LOOSES from "@assets/images/icons/xmark.svg?react";
import POINSF from "@assets/images/icons/stats/points-favor.svg?react";
import POINSA from "@assets/images/icons/stats/points-against.svg?react";
import DIFFP from "@assets/images/icons/stats/diff-points.svg?react";
import POINTS from "@assets/images/icons/stats/points.svg?react";
import { MatchPreview } from "./MatchPreview";
import { LoadingLogo } from "@components/ui/LoadingLogo";
import { useScheduleStore } from "@store/useScheduleStore";
import type { Match } from "@mytypes/Tournament";

export const CharacterInformation = ({ setSelectedMatch }: { setSelectedMatch: (match: Match) => void }) => {
  const { charactersStats, currentCharacter, getLastMatches, getNextMatches, getAllMatches } = useCharacter();
  const { currentRound } = useScheduleStore();

  //TODO: Fix the icons and add clarity to stats
  const icons = {
    position: POSITION,
    points: POINTS,
    battles: BATTLES,
    wins: WINS,
    draws: DRAWS,
    losses: LOOSES,
    pointsF: POINSF,
    pointsA: POINSA,
    diffP: DIFFP,
  };

  const iconKeys = Object.keys(icons) as (keyof typeof icons)[];

  return (
    <div className="flex flex-col items-center m-12 flex-grow-1 max-w-5xl">
      {currentCharacter ? (
        <>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl  text-center">{currentCharacter?.name}</h2>
              <span className="text-amber-400">{currentCharacter?.title} </span>
            </div>
            <p>{currentCharacter?.description || "No description available"}</p>
          </div>
          <div>
            <div className="flex flex-col gap-4 mt-8">
              <span className="text-lg text-amber-400">Tournament Stats</span>
              <div className="flex items-center justify-between w-full px-4 py-2 gap-4 flex-wrap bg-gray-800 rounded-lg">
                {iconKeys.map((key) => {
                  const Icon = icons[key];
                  const value = charactersStats[currentCharacter?.id][key];
                  if (value === undefined) return null;
                  return (
                    <div key={key} className="flex items-center gap-4" title={key}>
                      <Icon className="w-4 h-4 fill-gray-950" />
                      <span>{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-stretch justify-around w-full gap-4 mt-8">
              <div className="flex flex-col gap-4 mt-8">
                <span className="text-lg text-amber-400">Last 3 Matches</span>
                <div className="flex flex-col items-center justify-between w-full py-2 gap-4 bg-gray-800 rounded-lg">
                  {getLastMatches().length > 0 ? (
                    getLastMatches().map((match) => (
                      <MatchPreview
                        key={match.id}
                        match={match}
                        currentRound={currentRound}
                        setSelectedMatch={setSelectedMatch}
                      />
                    ))
                  ) : (
                    <div className="text-gray-400 italic text-sm py-4">No matches played yet.</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <span className="text-lg text-amber-400">Next 3 Matches</span>
                <div className="flex flex-col items-center justify-between w-full py-2 gap-4 bg-gray-800 rounded-lg">
                  {getNextMatches().length > 0 ? (
                    getNextMatches().map((match) => (
                      <MatchPreview
                        key={match.id}
                        match={match}
                        currentRound={currentRound}
                        setSelectedMatch={setSelectedMatch}
                      />
                    ))
                  ) : (
                    <div className="text-gray-400 italic text-sm py-4">No more matches remaining.</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-8 max-w-[160px] flex-grow-1">
                <span className="text-lg text-amber-400">All matches</span>
                <div className="flex flex-col items-center justify-between py-2 gap-4 bg-gray-800 rounded-lg max-h-[360px] overflow-y-auto custom-scrollbar">
                  {getAllMatches().map((match) => (
                    <MatchPreview
                      key={match.id}
                      match={match}
                      currentRound={currentRound}
                      setSelectedMatch={setSelectedMatch}
                    />
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
