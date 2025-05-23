import { generateId } from "@helpers/generators";
import type { TournamentConfig } from "@mytypes/Config";
import type { Tournament } from "@mytypes/Tournament";
import { create } from "zustand";

interface TornamentConfigStore extends Tournament {
  //Setters
  setLoading: (loading: boolean) => void;
  setTournament: (id: string, config: TournamentConfig) => void;
  reset: () => void;
}

export const useTournamentStore = create<TornamentConfigStore>((set) => ({
  id: "",
  config: {
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
  },
  loading: false,

  setTournament: (id: string, config: TournamentConfig) => set({id, config}),
  setLoading: (loading: boolean ) => set({ loading }),
  reset: () => set(({
    id: "",
    config: {
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
    },
    loading: false
  })),
}));
