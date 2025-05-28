import { StatCategoryContainer } from "@modules/TournamentStats/components/StatCategoryContainer";
import { StatContainer } from "@modules/TournamentStats/components/StatContainer";
import { useTable, type TopPerformance } from "@modules/TournamentTable/hooks/useTable";

import type { CharacterStats } from "@mytypes/Tournament";
import { useState } from "react";

export type StatType = {
  id: keyof CharacterStats;
  label: string;
};

export const TournamentStats = () => {
  const { getTop5CategoryPerformances, getTop5CategoryTotals, getTop5CategoryAverages } = useTable();

  const topPerformances = (getTop5CategoryPerformances() as Record<string, TopPerformance[]>) || {};
  const topTotals = (getTop5CategoryTotals() as Record<string, TopPerformance[]>) || {};
  const topAverages = (getTop5CategoryAverages?.() as Record<string, TopPerformance[]>) || {};

  const basicStats: StatType[] = [
    { id: "wins", label: "Wins" },
    { id: "pointsF", label: "Points For" },
    { id: "pointsA", label: "Points Against" },
    { id: "diffP", label: "Point Difference" },
  ];

  const stats = [
    {
      id: "basic",
      label: "Basic Stats",
      description:
        "General performance metrics including most wins, highest points scored, lowest points conceded, and point differences.",
      type: "basic",
    },
    {
      id: "single",
      label: "Single Diff",
      description:
        "Top single-match point differences in each category. (Includes number of matches in the category)",
      labelBox: "Single DIFF: ",
      object: topPerformances,
      type: "category",
    },
    {
      id: "total",
      label: "Total Diff",
      description:
        "Highest total point differences accumulated across all matches in each category. (Includes number of matches in the category)",
      labelBox: "Total DIFF: ",
      object: topTotals,
      type: "category",
    },
    {
      id: "average",
      label: "Avg Diff",
      description:
        "Top average point differences per match in each category. (Includes number of matches in the category)",
      labelBox: "Avg DIFF: ",
      object: topAverages,
      type: "category",
    },
  ];
  

  const [selectedStatId, setSelectedStatId] = useState("basic");
  const selectedStat = stats.find((stat) => stat.id === selectedStatId);

  return (
    <div className="flex flex-col items-center justify-center gap-8 m-8 fade-in-up">
      <h3 className="text-3xl font-semibold">TOURNAMENT STATS</h3>

      {/* Toggle Buttons */}
      <div className="flex gap-4 bg-gray-700 rounded-full p-2 shadow-inner">
        {stats.map((stat) => (
          <button
            key={stat.id}
            onClick={() => setSelectedStatId(stat.id)}
            className={`px-4 py-2 rounded-full transition-all duration-300 font-medium cursor-pointer
              ${
                selectedStatId === stat.id
                  ? "bg-amber-400 text-white shadow-md"
                  : "bg-gray-700  hover:bg-gray-950"
              }
            `}
          >
            {stat.label}
          </button>
        ))}
      </div>

      {/* Description */}
      {selectedStat?.description && (
        <p className="text-center max-w-xl">{selectedStat.description}</p>
      )}

      {/* Content */}
      {selectedStat?.type === "basic" ? (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {basicStats.map((stat) => (
            <StatContainer key={stat.id} stat={stat} />
          ))}
        </div>
      ) : selectedStat?.type === "category" && selectedStat.object ? (
        <div className="flex flex-wrap items-center justify-center gap-6">
          {Object.entries(selectedStat.object).map(([category, performances]) => (
            <StatCategoryContainer
              key={category}
              category={category}
              performances={performances}
              label={selectedStat.labelBox}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
