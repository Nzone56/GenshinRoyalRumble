import { roundNumber } from "@helpers/functions";
import { useTournament } from "@hooks/useTournament";
import type { TopPerformance } from "@modules/TournamentTable/hooks/useTable";
import React from "react";

type CategoryTopListProps = {
  category: string;
  performances: TopPerformance[];
  label: string;
};

export const StatCategoryContainer: React.FC<CategoryTopListProps> = ({ category, performances, label }) => {
  const { characters } = useTournament();
  return (
    <div className="flex flex-col w-full p-4 bg-white dark:bg-gray-800 rounded-xl h-[320px] flex-grow-1 max-w-[400px]">
      <h3 className="text-xl">
        {label}
        <span className="text-amber-400">{category}</span>
      </h3>
      <div className="flex flex-col items-center justify-center flex-grow-1 my-2">
        {performances.map((char, index) => {
          const { character, value } = char;
          const name = characters[character]?.name;
          const icon = characters[character]?.images.icon;

          return (
            <div
              key={index}
              className={`w-full flex items-center justify-between p-2.5 ${index === 4 ? "" : "border-b border-gray-200"} dark:border-gray-700`}
            >
              <span className={`w-6 ${index === 0 ? "text-amber-400" : "text-gray-300"}`}>{index + 1}</span>
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
              <span className={`w-10 text-right  ${index === 0 ? "text-amber-400" : "text-gray-300"}`}>
                {roundNumber(value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
