import { useEffect, useState } from "react";
import type { PreviewCharacter } from "@mytypes/Character";
import { fetchCharacters } from "@helpers/fetchCharacters";
import type { TournamentConfig } from "@mytypes/config";

export const useTournamentForm = () => {
  const [formConfig, setFormConfig] = useState<TournamentConfig>({
    name: "",
    type: "League",
    characters: [],
    categories: [],
  });

  const [characters, setCharacters] = useState<PreviewCharacter[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChangeForm = ({ target: { name, value } }: { target: { name: string; value: string } }) => {
    setFormConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCharacter = (id: string) => {
    setFormConfig((prev) => {
      const isSelected = prev.characters.findIndex((item) => item === id) !== -1;
      if (isSelected) {
        return { ...prev, characters: prev.characters.filter((item) => item !== id) };
      } else {
        return { ...prev, characters: [...prev.characters, id] };
      }
    });
  };

  const handleAddGroupCard = (id: string) => {
    if (id === "all") {
      if (formConfig.characters.length === characters.length) {
        return setFormConfig((prev) => ({ ...prev, characters: [] }));
      } else {
        setFormConfig((prev) => ({ ...prev, characters: characters.map((char) => char.id) }));
      }
    }
  };

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data);
      } catch (err) {
        console.error("Error", err);
      } finally {
        setLoading(false); // ✅ Terminó la carga
      }
    };
    loadCharacters();
  }, []);

  return { formConfig, characters, handleChangeForm, handleAddCharacter, handleAddGroupCard, loading };
};
