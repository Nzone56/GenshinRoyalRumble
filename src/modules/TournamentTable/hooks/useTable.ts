import { useTournament } from "@hooks/useTournament";
import { useCallback } from "react";
import type { CharacterStats } from "@mytypes/Tournament";
import { useSchedule } from "@modules/TournamentMatches/hooks/useSchedule";
import { roundNumber } from "@helpers/functions";

type StatKey = keyof Omit<CharacterStats, "id">;

export type TopPerformance = {
  character: string;
  value: number;
};

export const useTable = () => {
  const { stats } = useTournament();
  const { schedule } = useSchedule();

  const getStandings = useCallback(
    (prop?: StatKey) => {
      const entries = Object.entries(stats).map(([id, data]) => ({
        id,
        ...data,
      }));

      const sorted = prop
        ? [...entries].sort((a, b) => (b[prop] ?? 0) - (a[prop] ?? 0))
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

    // Reducir a top 5 por categoría
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
          const absDiff = Math.abs(difference);
          const character = difference >= 0 ? match.home : match.away;

          if (!categoryCharacterTotals[category]) {
            categoryCharacterTotals[category] = {};
          }

          if (!categoryCharacterTotals[category][character]) {
            categoryCharacterTotals[category][character] = 0;
          }

          categoryCharacterTotals[category][character] += roundNumber(absDiff);
        }
      }
    }

    // Para cada categoría, obtener top 5 personajes con mayor suma
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

  return { getStandings, getTop5CategoryPerformances, getTop5CategoryTotals };
};
