import { create } from "zustand";

type TournamentType = "League" | "RoundRobin" | "Elimination" | "GroupsElimination" | "Sides";
export interface TornamentConfig {
  name: string;
  type: TournamentType;
  characters: string[];
  categories: string[];
}

interface TornamentConfigStore extends TornamentConfig {
  //Setters
  setName: (name: string) => void;
  setType: (type: TournamentType) => void;
  setCharacters: (characters: string[]) => void;
  setCategories: (categories: string[]) => void;
}

export const useConfigStore = create<TornamentConfigStore>((set) => ({
  name: "",
  type: "League",
  characters: [],
  categories: [],

  //Setters
  setName: (name: string) => set({ name }),
  setType: (type: TournamentType) => set({ type }),
  setCharacters: (characters: string[]) => set({ characters }),
  setCategories: (categories: string[]) => set({ categories }),
}));
