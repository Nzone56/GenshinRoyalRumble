import { generateId } from "@helpers/generators";
import type { PreviewCharacter } from "@mytypes/Character";
import type { CategoryType, EvaluationType, TournamentConfig, TournamentType } from "@mytypes/config";
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
  setEvaluationType: (evaluation: EvaluationType) => void,
  reset: () => void;
}

export const useConfigStore = create<TornamentConfigStore>((set) => ({
  name: "",
  type: "League",
  characters: [],
  evaluationType: "random",
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
  setEvaluationType: (evaluationType) => set({ evaluationType }),

  reset: () => set((state) => ({
    name: "",
    type: "League",
    evaluationType: "random",
    characters: [],
    categories: [],
    loading: false,
    charactersList: state.charactersList,
  })),
}));
