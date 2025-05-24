import type { Character } from "@mytypes/Character";
import { create } from "zustand";

interface CharactersStore {
  charactersData: Record<string, Character>;
  selectedCharacterIndex: number;
  loading: boolean;

  setCharactersData: (characters: Character[]) => void;
  setSelectedCharacterIndex: (index: number) => void;
  setLoading: (loading: boolean) => void;
  resetCharactersData: () => void;
}

export const useCharactersStore = create<CharactersStore>((set) => ({
  charactersData: {},
  selectedCharacterIndex: 0,
  loading: false,

  setCharactersData: (characters: Character[]) => {
    const data = Object.fromEntries(characters.map((c) => [c.id, c]));
    set({ charactersData: data });
  },

  setSelectedCharacterIndex: (index: number) => set({ selectedCharacterIndex: index }),
  setLoading: (loading: boolean) => set({ loading }),
  resetCharactersData: () => set({ charactersData: {}, selectedCharacterIndex: 0 }),
}));
