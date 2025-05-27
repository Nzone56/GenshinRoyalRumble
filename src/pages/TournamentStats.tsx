import { StatCategoryContainer } from "@modules/TournamentStats/components/StatCategoryContainer";
import { StatContainer } from "@modules/TournamentStats/components/StatContainer";
import { useTable, type TopPerformance } from "@modules/TournamentTable/hooks/useTable";

import type { CharacterStats } from "@mytypes/Tournament";

export type StatType = {
  id: keyof CharacterStats;
  label: string;
};

export const TournamentStats = () => {
  const { getTop5CategoryPerformances, getTop5CategoryTotals } = useTable();

  const topPerformances = (getTop5CategoryPerformances() as Record<string, TopPerformance[]>) || {};
  const topTotals = (getTop5CategoryTotals() as Record<string, TopPerformance[]>) || {};

  const stats: StatType[] = [
    { id: "wins", label: "Wins",},
    { id: "pointsF", label: "Points For" },
    { id: "pointsA", label: "Points Against" },
    { id: "diffP", label: "Point Difference" },
  ];

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-8 m-8 fade-in-up`}
    >
      {stats.map((stat) => (
        <StatContainer key={stat.id} stat={stat} />
      ))}
      {Object.entries(topPerformances)?.map(([category, performances]) => (
        <StatCategoryContainer key={category} category={category} performances={performances} label={"Single DIFF: "} />
      ))}

      {Object.entries(topTotals)?.map(([category, performances]) => (
        <StatCategoryContainer key={category} category={category} performances={performances} label={"Total DIFF: "} />
      ))}
    </div>
  );
};
