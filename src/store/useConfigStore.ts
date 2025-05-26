import { generateId } from "@helpers/generators";
import type { PreviewCharacter } from "@mytypes/Character";
import type {
  CategoryType,
  EvaluationType,
  TournamentConfig,
  TournamentConfigManagement,
  TournamentType,
} from "@mytypes/config";
import { create } from "zustand";

interface TornamentConfigStore extends TournamentConfigManagement {
  //Setters
  setConfig: (config: TournamentConfig) => void;
  setName: (name: string) => void;
  setType: (type: TournamentType) => void;
  setCharacters: (characters: string[]) => void;
  setCategories: (categories: CategoryType[]) => void;
  setLoading: (state: boolean) => void;
  setCharactersList: (list: PreviewCharacter[]) => void;
  setEvaluationType: (evaluation: EvaluationType) => void;
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

  setConfig: (config: TournamentConfig) => set(config),
  setName: (name: string) => set({ name }),
  setType: (type: TournamentType) => set({ type }),
  setCharacters: (characters: string[]) => set({ characters }),
  setCategories: (categories: CategoryType[]) => set({ categories }),
  setLoading: (loading: boolean) => set({ loading }),
  setCharactersList: (charactersList: PreviewCharacter[]) => set({ charactersList }),
  setEvaluationType: (evaluationType: EvaluationType) => set({ evaluationType }),

  reset: () =>
    set((state) => ({
      name: "",
      type: "League",
      evaluationType: "random",
      characters: [],
      categories: [],
      loading: false,
      charactersList: state.charactersList,
    })),
}));
