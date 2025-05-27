import type { Character } from "@mytypes/Character";
import type { CharacterStats } from "@mytypes/Tournament";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface CharactersStatsStore {
  stats: Record<string, CharacterStats>;
  categories: Record<string, { [key: string]: number }>;

  setStats: (stats: Record<string, CharacterStats>) => void;
  setCategories: (newCategories: Record<string, { [key: string]: number }>) => void;
  setInitialStats: (characters: Character[]) => void;
  setInitialCategories: (characters: Character[], allCategoryIds: string[]) => void;
  setCategoryValue: (characterId: string, categoryId: string, value: number) => void;
  resetCharactersStats: (id?: string) => void;
}

export const useCharactersStatsStore = create(
  devtools<CharactersStatsStore>((set) => ({
    stats: {},
    categories: {},

    setStats: (stats) => set({ stats }, false, "setStats"),

    setCategories: (newCategories) => set({ categories: newCategories }, false, "setCategories"),

    setInitialStats: (characters) => {
      const initialStats: Record<string, CharacterStats> = {};

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
          prevPosition: null,
        };
      });

      set({ stats: initialStats }, false, "setInitialStats");
    },

    setInitialCategories: (characters, allCategoryIds) => {
      const initialCategories: Record<string, Record<string, number>> = {};

      characters.forEach((c) => {
        initialCategories[c.id] = Object.fromEntries(allCategoryIds.map((catId) => [catId, 0]));
      });

      set({ categories: initialCategories }, false, "setInitialCategories");
    },

    setCategoryValue: (characterId, categoryId, value) =>
      set(
        (state) => ({
          categories: {
            ...state.categories,
            [characterId]: {
              ...(state.categories[characterId] || {}),
              [categoryId]: value,
            },
          },
        }),
        false,
        `setCategoryValue(${characterId}, ${categoryId})`,
      ),

    resetCharactersStats: (id) =>
      set(
        (state) => {
          if (id) {
            const restStats = { ...state.stats };
            delete restStats[id];

            const restCats = { ...state.categories };
            delete restCats[id];

            return { stats: restStats, categories: restCats };
          }
          return { stats: {}, categories: {} };
        },
        false,
        `resetCharactersStats(${id || "all"})`,
      ),
  })),
);
