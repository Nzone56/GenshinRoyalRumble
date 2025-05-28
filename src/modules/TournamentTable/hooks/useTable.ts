import { useCallback } from "react";
import type { CharacterStats } from "@mytypes/Tournament";
import { useSchedule } from "@modules/TournamentMatches/hooks/useSchedule";
import { roundNumber } from "@helpers/functions";
import { useCharactersStatsStore } from "@store/useCharacterStatsStore";

type StatKey = keyof Omit<CharacterStats, "id">;

export type TopPerformance = {
  character: string;
  value: number;
};

export const useTable = () => {
  const { stats } = useCharactersStatsStore();
  const { schedule } = useSchedule();

  const getStandings = useCallback(
    (prop?: StatKey) => {
      const entries = Object.entries(stats).map(([id, data]) => ({
        id,
        ...data,
      }));

      const sorted = prop
        ? [...entries].sort((a, b) => {
            if (prop === "pointsA") {
              return (a[prop] ?? 0) - (b[prop] ?? 0); // Lowe to high
            }
            return (b[prop] ?? 0) - (a[prop] ?? 0); // High to low
          })
        : [...entries].sort((a, b) => (a.position ?? 999) - (b.position ?? 999));

      return sorted.map((team, index) => ({
        ...team,
        position: index + 1,
      }));
    },
    [stats],
  );
  const getTop5CategoryPerformances = () => {
    const categoryMap: Record<string, TopPerformance[]> = {};

    if (!schedule) return {};
    for (const round of schedule.rounds) {
      for (const match of round.matches) {
        for (const categoryResult of match.categoriesResults) {
          const { category, difference } = categoryResult;
          const absDiff = Math.abs(difference);
          const character = difference >= 0 ? match.home : match.away;

          if (!categoryMap[category]) {
            categoryMap[category] = [];
          }

          categoryMap[category].push({
            character,
            value: roundNumber(absDiff),
          });
        }
      }
    }

    // Get only top 5
    for (const category in categoryMap) {
      categoryMap[category] = categoryMap[category].sort((a, b) => b.value - a.value).slice(0, 5);
    }

    return categoryMap;
  };

  const getTop5CategoryTotals = () => {
    if (!schedule) return {};

    const categoryCharacterTotals: Record<string, Record<string, number>> = {};

    for (const round of schedule.rounds) {
      for (const match of round.matches) {
        for (const categoryResult of match.categoriesResults) {
          const { category, difference } = categoryResult;
  
          for (const character of [match.home, match.away]) {
            if (!categoryCharacterTotals[category]) {
              categoryCharacterTotals[category] = {};
            }
            if (!categoryCharacterTotals[category][character]) {
              categoryCharacterTotals[category][character] = 0;
            }
          }
  
          categoryCharacterTotals[category][match.home] += roundNumber(difference);
          categoryCharacterTotals[category][match.away] -= roundNumber(difference);
        }
      }
    }

    // For each category, get top 5 character with best diff
    const result: Record<string, TopPerformance[]> = {};

    for (const category in categoryCharacterTotals) {
      const charsTotals = categoryCharacterTotals[category];
      const top5 = Object.entries(charsTotals)
        .map(([character, value]) => ({ character, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      result[category] = top5;
    }

    return result;
  };

  const getTop5CategoryAverages = () => {
    if (!schedule) return {};

    // { [category]: { [character]: { total: number, matches: number } } }
    const categoryCharacterStats: Record<string, Record<string, { total: number; matches: number }>> = {};

    for (const round of schedule.rounds) {
      for (const match of round.matches) {
        for (const categoryResult of match.categoriesResults) {
          const { category, difference } = categoryResult;

          for (const character of [match.home, match.away]) {
            if (!categoryCharacterStats[category]) {
              categoryCharacterStats[category] = {};
            }

            if (!categoryCharacterStats[category][character]) {
              categoryCharacterStats[category][character] = { total: 0, matches: 0 };
            }
          }

          categoryCharacterStats[category][match.home].total += roundNumber(difference);
          categoryCharacterStats[category][match.home].matches += 1;

          categoryCharacterStats[category][match.away].total -= roundNumber(difference);
          categoryCharacterStats[category][match.away].matches += 1;
        }
      }
    }

    const result: Record<string, TopPerformance[]> = {};

    for (const category in categoryCharacterStats) {
      const charStats = categoryCharacterStats[category];
      const top5 = Object.entries(charStats)
        .map(([character, { total, matches }]) => ({
          character,
          value: matches > 0 ? +(total / matches).toFixed(2) : 0,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      result[category] = top5;
    }

    return result;
  };

  const getTotalMatchesInCategoryByCharacter = (category: string, character: string): number => {
    if (!schedule) return 0;

    let count = 0;

    for (const round of schedule.rounds) {
      for (const match of round.matches) {
        const characterInMatch = match.home === character || match.away === character;

        if (!characterInMatch) continue;

        const participatedInCategory = match.categoriesResults.some(
          (categoryResult) => categoryResult.category === category,
        );

        if (participatedInCategory) {
          count++;
        }
      }
    }

    return count;
  };

  return {
    getStandings,
    getTop5CategoryPerformances,
    getTop5CategoryTotals,
    getTop5CategoryAverages,
    getTotalMatchesInCategoryByCharacter,
  };
};
