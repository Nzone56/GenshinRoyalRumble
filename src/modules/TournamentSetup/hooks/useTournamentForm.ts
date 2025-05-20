import { useEffect, useState } from "react";
import type { TornamentConfig } from "@store/useConfigStore";
import type { PreviewCharacter } from "@mytypes/Character";
import { fetchCharacters } from "@helpers/fetchCharacters";

export const useTournamentForm = () => {
  const [formConfig, setFormConfig] = useState<TornamentConfig>({
    name: "",
    type: "League",
    characters: [],
    categories: [],
  });

  const [characters, setCharacters] = useState<PreviewCharacter[]>([]);

  const handleChangeForm = ({ target: { name, value } }: { target: { name: string; value: string } }) => {
    setFormConfig((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const loadCharacters = async () => {
      const characters = await fetchCharacters();
      setCharacters(characters);
    };
    loadCharacters();
  }, []);

  return { formConfig, characters, handleChangeForm };
};
