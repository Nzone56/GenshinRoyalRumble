import type { TournamentConfig } from "@mytypes/config";
import { create } from "zustand";

interface TornamentConfigStore extends TournamentConfig {
  //Setters
  setConfig: (config: TournamentConfig) => void;
  reset: () => void;
}

export const useConfigStore = create<TornamentConfigStore>((set) => ({
  name: "",
  type: "League",
  characters: [],
  categories: [],

  setConfig: (config) => set(config),

  reset: () =>
    set({
      name: "",
      type: "League",
      characters: [],
      categories: [],
    }),
}));
