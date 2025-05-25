import type { Character } from "@mytypes/Character";
import { create } from "zustand";

interface CharactersStore {
  charactersData: Record<string, Character>;
  selectedCharacterIndex: number;
  loading: boolean;
  hasLoadedCharacters: boolean;

  setCharactersData: (characters: Character[]) => void;
  setSelectedCharacterIndex: (index: number) => void;
  setLoading: (loading: boolean) => void;
  setHasLoadedCharacters: (loaded: boolean) => void;
  resetCharactersData: () => void;
}

export const useCharactersStore = create<CharactersStore>((set) => ({
  charactersData: {},
  selectedCharacterIndex: 0,
  loading: false,
  hasLoadedCharacters: false,
  setCharactersData: (characters: Character[]) => {
    const data = Object.fromEntries(characters.map((c) => [c.id, c]));
    set({ charactersData: data });
  },

  setSelectedCharacterIndex: (index: number) => set({ selectedCharacterIndex: index }),
  setLoading: (loading: boolean) => set({ loading }),
  setHasLoadedCharacters: (loaded: boolean) => set({ hasLoadedCharacters: loaded }),
  resetCharactersData: () => set({ charactersData: {}, selectedCharacterIndex: 0 }),
}));
