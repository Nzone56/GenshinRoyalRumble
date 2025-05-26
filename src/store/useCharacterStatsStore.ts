import type { Character } from "@mytypes/Character";
import type { CharacterStats } from "@mytypes/Tournament";
import { create } from "zustand";

interface CharactersStatsStore {
  stats: Record<string, CharacterStats>;
  categories: Record<string, { [key: string]: number }>;

  setStats: (id: string, stats: CharacterStats) => void;
  setCategories: (id: string, categories: { [key: string]: number }) => void;
  setInitialCharacterStatsData: (characters: Character[], allCategoryIds: string[]) => void;
  setCategoryValue: (characterId: string, categoryId: string, value: number) => void;
  resetCharactersStats: (id?: string) => void;
}

export const useCharactersStatsStore = create<CharactersStatsStore>((set) => ({
  stats: {},
  categories: {},

  setStats: (id, newStats) =>
    set((state) => ({
      stats: { ...state.stats, [id]: newStats },
    })),

  setCategories: (id, newCategories) =>
    set((state) => ({
      categories: { ...state.categories, [id]: newCategories },
    })),

  setInitialCharacterStatsData: (characters, allCategoryIds) => {
    const initialStats: Record<string, CharacterStats> = {};
    const initialCategories: Record<string, Record<string, number>> = {};

    characters.forEach((c) => {
      initialStats[c.id] = {
        position: 0,
        battles: 0,
        wins: 0,
        draws: 0,
        pointsF: 0,
        pointsA: 0,
        diffP: 0,
        losses: 0,
        points: 0,
      };
      initialCategories[c.id] = Object.fromEntries(allCategoryIds.map((catId) => [catId, 0]));
    });

    set({ stats: initialStats, categories: initialCategories });
  },

  setCategoryValue: (characterId: string, categoryId: string, value: number) =>
    set((state) => ({
      categories: {
        ...state.categories,
        [characterId]: {
          ...(state.categories[characterId] || {}),
          [categoryId]: value,
        },
      },
    })),

  resetCharactersStats: (id) =>
    set((state) => {
      if (id) {
        const restStats = { ...state.stats };
        delete restStats[id];

        const restCats = { ...state.categories };
        delete restCats[id];

        return { stats: restStats, categories: restCats };
      }
      return { stats: {}, categories: {} };
    }),
}));
