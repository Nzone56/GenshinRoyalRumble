import { useTournament } from "@hooks/useTournament";
import type { CategoryType } from "@mytypes/Config";
import { useMemo } from "react";

type Categories = Record<string, number>;

interface CategoryComparison {
  category: string;
  homeRaw: number;
  awayRaw: number;
  weight: number;
  homeWeighted: number;
  awayWeighted: number;
  difference: number;
}

interface MatchSimulationResult {
  selectedCategories: string[];
  comparisons: CategoryComparison[];
  homeCategories: Categories;
  awayCategories: Categories;
  totalHomePoints: number;
  totalAwayPoints: number;
}

const getTopCategories = (categoriesObj: Categories, topN: number = 5): string[] => {
  return Object.entries(categoriesObj)
    .sort(([, a], [, b]) => b - a)
    .slice(0, topN)
    .map(([key]) => key);
};

const getRandomItems = <T>(arr: T[], count: number): T[] => {
  const copy = [...arr];
  const result: T[] = [];
  while (result.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(index, 1)[0]);
  }
  return result;
};

const getAdditionalRandomCategories = (allKeys: string[], excludedKeys: string[], count: number): string[] => {
  const filtered = allKeys.filter((key) => !excludedKeys.includes(key));
  return getRandomItems(filtered, count);
};

const mapCategoryConfig = (categories: CategoryType[]): Record<string, CategoryType> => {
  return categories.reduce(
    (acc, cat) => {
      acc[cat.name] = cat;
      return acc;
    },
    {} as Record<string, CategoryType>,
  );
};

export const useMatchSimulation = (homeCategories: Categories, awayCategories: Categories): MatchSimulationResult => {
  const { config } = useTournament();

  const { selectedCategories, comparisons, totalHomePoints, totalAwayPoints } = useMemo(() => {
    if (!homeCategories || !awayCategories || !config?.categories) {
      return {
        selectedCategories: [],
        comparisons: [],
        totalHomePoints: 0,
        totalAwayPoints: 0,
      };
    }

    const categoryConfigMap = mapCategoryConfig(config.categories);

    const allKeys = Object.keys(homeCategories);
    const top5Keys = getTopCategories(homeCategories, 5);
    const top3Random = getRandomItems(top5Keys, 3);
    const extra2Random = getAdditionalRandomCategories(allKeys, top5Keys, 2);
    const selected = [...top3Random, ...extra2Random];

    const comparisons: CategoryComparison[] = selected.map((category) => {
      const homeRaw = homeCategories[category] ?? 0;
      const awayRaw = awayCategories[category] ?? 0;
      const weight = parseFloat(categoryConfigMap[category]?.weight ?? "1");

      const homeWeighted = homeRaw * weight;
      const awayWeighted = awayRaw * weight;
      const difference = homeWeighted - awayWeighted;

      return {
        category,
        homeRaw,
        awayRaw,
        weight,
        homeWeighted,
        awayWeighted,
        difference,
      };
    });

    const totalHomePoints = comparisons.reduce((acc, c) => acc + (c.difference > 0 ? c.difference : 0), 0);
    const totalAwayPoints = comparisons.reduce((acc, c) => acc + (c.difference < 0 ? Math.abs(c.difference) : 0), 0);

    return { selectedCategories: selected, comparisons, totalHomePoints, totalAwayPoints };
  }, [homeCategories, awayCategories, config]);

  return {
    selectedCategories,
    comparisons,
    homeCategories,
    awayCategories,
    totalHomePoints,
    totalAwayPoints,
  };
};
