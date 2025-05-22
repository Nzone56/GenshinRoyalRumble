import { generateId } from "@helpers/generators";
import type { PreviewCharacter } from "@mytypes/Character";
import type { CategoryType, TournamentConfig, TournamentType } from "@mytypes/config";
import { create } from "zustand";

interface TornamentConfigStore extends TournamentConfig {
  //Setters
  setConfig: (config: TournamentConfig) => void;
  setName: (name: string) => void;
  setType: (type: TournamentType) => void;
  setCharacters: (characters: string[]) => void;
  setCategories: (categories: CategoryType[]) => void;
  setLoading: (state: boolean) => void;
  setCharactersList: (list: PreviewCharacter[]) => void;
  reset: () => void;
}

export const useConfigStore = create<TornamentConfigStore>((set) => ({
  name: "",
  type: "League",
  characters: [],
  categories: [
    {
      id: generateId(),
      name: "",
      weight: "",
      native: false,
    },
  ],
  charactersList: [],
  loading: true,

  setConfig: (config) => set(config),
  setName: (name) => set({ name }),
  setType: (type: TournamentType) => set({ type }),
  setCharacters: (characters: string[]) => set({ characters }),
  setCategories: (categories: CategoryType[]) => set({ categories }),
  setLoading: (loading) => set({ loading }),
  setCharactersList: (charactersList) => set({ charactersList }),

  reset: () =>
    set({
      name: "",
      type: "League",
      characters: [],
      categories: [],
      loading: true,
    }),
}));
