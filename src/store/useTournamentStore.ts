import { generateId } from "@helpers/generators";
import type { TournamentConfig } from "@mytypes/Config";
import type { Tournament } from "@mytypes/Tournament";
import { create } from "zustand";

interface TornamentConfigStore extends Tournament {
  //Setters
  setLoading: (loading: boolean) => void;
  setTournament: (id: string, config: TournamentConfig) => void;
  setStarted: (started: boolean) => void;
  setRound: (round: number) => void;
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
  started: false,
  round: 1,
  loading: false,

  setTournament: (id: string, config: TournamentConfig) => set({ id, config }),
  setRound: (round: number) => set({ round }),
  setStarted: (started: boolean) => set({ started }),
  setLoading: (loading: boolean) => set({ loading }),
  reset: () =>
    set({
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
    }),
}));
