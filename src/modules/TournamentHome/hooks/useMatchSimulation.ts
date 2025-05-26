import { useTournament } from "@hooks/useTournament";
import { useSchedule } from "@modules/TournamentMatches/hooks/useSchedule";
import type { CategoryType } from "@mytypes/config";
import { useState } from "react";

type Categories = Record<string, number>;


export const useMatchSimulation = () => {
  const { config, categories, calculateStandings } = useTournament();
  const { schedule, currentRound, updateRound, } = useSchedule();
  const [simulatingFixture, setSimulatingFixture] = useState(false);

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

  const getComparassions = (
    selected: string[],
    homeCategories: Record<string, number>,
    awayCategories: Record<string, number>,
    categoryConfigMap: Record<string, { weight?: string }>,
  ) => {
    return selected.map((category) => {
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
  };

  const generateMatchResult = ( home: string, away: string) => {
    const homeCategories = categories[home];
    const awayCategories = categories[away];

    const categoryConfigMap = mapCategoryConfig(config.categories);

    const allKeys = Object.keys(homeCategories);
    const top5Keys = getTopCategories(homeCategories, 5);
    const top3Random = getRandomItems(top5Keys, 3);
    const extra2Random = getAdditionalRandomCategories(allKeys, top5Keys, 2);
    const selected = [...top3Random, ...extra2Random];

    const comparisons = getComparassions(selected, homeCategories, awayCategories, categoryConfigMap);
    const totalHomePoints = comparisons.reduce((acc, c) => acc + (c.difference > 0 ? c.difference : 0), 0);
    const totalAwayPoints = comparisons.reduce((acc, c) => acc + (c.difference < 0 ? Math.abs(c.difference) : 0), 0);
    return {comparisons, totalHomePoints, totalAwayPoints}
  };

  const fillScheduleRound = () => {
    if(!schedule) return null
    const fullCurrentRound = schedule.rounds[currentRound - 1]

    const filledMatches = fullCurrentRound.matches.map(match => {
      const { comparisons, totalHomePoints, totalAwayPoints } = generateMatchResult(match.home, match.away)
      return {
        id: match.id,
        round: match.round,
        home: match.home,
        away: match.away,
        homePoints: totalHomePoints,
        awayPoints: totalAwayPoints,
        categoriesResults: comparisons
      }
    })
    

    updateRound({id: fullCurrentRound.id, matches: filledMatches})
  };

  const handleSimulateRound = () => {
    setSimulatingFixture(true)
    fillScheduleRound()
  }

  const handleContinueNextRound = () => {
    calculateStandings()
    setSimulatingFixture(false)
  }

  return {
    simulatingFixture,
    handleSimulateRound,
    handleContinueNextRound
  };
};
